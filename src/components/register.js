// Register.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        firstName: fname,
        lastName: lname,
        photo: "",
      });
      toast.success("Registered successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      window.location.href = "/login";
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Sign Up</h3>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label className="form-label">First name</label>
          <input
            type="text"
            className="form-input"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        {/* </div> */}
        {/* <div className="form-group"> */}
          <label className="form-label">Last name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        {/* </div> */}
        {/* <div className="form-group"> */}
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {/* </div> */}
        {/* <div className="form-group"> */}
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Sign Up
        </button>
      </form>
      <p className="form-text">
        Already registered? <a href="/login" className="form-link">Login</a>
      </p>
    </div>
  );
}

export default Register;