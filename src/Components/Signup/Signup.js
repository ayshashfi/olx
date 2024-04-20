import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../../firebase/config';
import { collection, addDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth } from '../../firebase/config';

export default function Signup() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      alert("The username cannot be empty.");
      return;
    }
    if (password.length < 6) {
      alert("The password must be atleast 6 character long")
      return;
    }
    if (phone.length < 10) {
      alert("Invalid phone number")
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName: username })
        addDoc(collection(db, "users"), {
          id: user.uid,
          username: username,
          phone: phone
        });
      }).then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert(error)
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=""></img>
        <form  onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            id="fname"
            name="name"
            value={username}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value = {email}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to='/login' >LogIn</Link>
      </div>
    </div>
  );
}
