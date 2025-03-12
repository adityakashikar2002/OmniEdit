import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeReducer';

const store = configureStore({
  reducer: recipeReducer,
});

export default store;