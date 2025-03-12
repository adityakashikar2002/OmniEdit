import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
const API_URL = `https://api.spoonacular.com/recipes`;

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (searchTerm, { rejectWithValue }) => {
    if (!searchTerm.trim()) return rejectWithValue([]);
    try {
      const searchResponse = await axios.get(
        `${API_URL}/complexSearch?apiKey=${API_KEY}&query=${searchTerm}`
      );
      if (searchResponse.data.results) {
        return searchResponse.data.results;
      }
      return [];
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id) => {
    const response = await axios.get(
      `${API_URL}/${id}/information?apiKey=${API_KEY}&includeNutrition=false`
    );
    return response.data;
  }
);

export const fetchTrendingRecipes = createAsyncThunk(
  'recipes/fetchTrendingRecipes',
  async () => {
    const allSearches = [
      'pasta',
      'chicken',
      'salad',
      'dessert',
      'soup',
      'pizza',
      'steak',
      'vegetarian',
      'vegan',
      'seafood',
      'breakfast',
      'lunch',
      'dinner',
      'smoothie',
      'curry',
      'tacos',
      'sandwich',
      'cake',
      'cookies'
    ];
    const randomSearches = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * allSearches.length);
      randomSearches.push(allSearches[randomIndex]);
      allSearches.splice(randomIndex, 1); // Prevent duplicates
    }

    const trendingRecipes = [];

    for (const searchTerm of randomSearches) {
      const searchResponse = await axios.get(
        `${API_URL}/complexSearch?apiKey=${API_KEY}&query=${searchTerm}`
      );
      if (searchResponse.data.results) {
        trendingRecipes.push(...searchResponse.data.results);
      }
    }

    // Shuffle the result array to add more randomness.
    for (let i = trendingRecipes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [trendingRecipes[i], trendingRecipes[j]] = [
        trendingRecipes[j],
        trendingRecipes[i],
      ];
    }

    return trendingRecipes;
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    searchResults: [],
    selectedRecipe: null,
    favorites: [],
    trending: [],
    loading: false,
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (recipe) => recipe.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrendingRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
        state.items = action.payload;
      })
      .addCase(fetchTrendingRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = recipeSlice.actions;
export default recipeSlice.reducer;