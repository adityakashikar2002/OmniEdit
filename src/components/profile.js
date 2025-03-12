// Profile.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
        }
      });
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="profile-container">
      {userDetails ? (
        <>
          <div className="profile-image-container">
            <img
              src={userDetails.photo}
              alt="Profile"
              className="profile-image"
            />
          </div>
          <h3 className="profile-title">Welcome, {userDetails.firstName}</h3>
          <div className="profile-details">
            <p>Email: {userDetails.email}</p>
            {/* <p>First Name: {userDetails.firstName}</p> */}
          </div>
          <button className="profile-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p className="profile-loading">Loading...</p>
      )}
    </div>
  );
}

export default Profile;