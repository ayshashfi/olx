import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';

import Logo from '../../olx-logo.png';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(() => {
      navigate("/")
    }).catch((error) =>
    alert(error))
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
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
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup' >Signup</Link>
      </div>
    </div>
  );
}

export default Login;
