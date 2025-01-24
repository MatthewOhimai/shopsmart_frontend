import React, { useState } from "react";
import "../CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_BASE_URL;

const LoginSignup = ({ setIsLoggedIn }) => {
  const [loginState, setLogin] = useState("Login");
  const navigate = useNavigate();
  const [btn, setBtn] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignUp = () => {
    setLogin("Sign Up");
    navigate("/register");
    handleBtnLogin();
  };

  const handleLogin = () => {
    setLogin("Login");
    navigate("/login");
    handleBtnLogin();
  };
  const handleBtnLogin = () => {
    if (loginState === "Login") {
      setBtn("Register");
    } else {
      setBtn("Login");
    }
  };

  const submitForm = async (e) => {
    // console.log(formData);
    setBtn(loginState);
    if (btn === "Register") {
      const res = await fetch(`${baseUrl}/api/v1/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const payload = await res.json();
      if (payload.status_code === 201) {
        Swal.fire("Success", "User Registered successfully.", "success");
        navigate("/");
        // setLogin("Login");
        localStorage.setItem("token", payload.token);
        setIsLoggedIn(true);
        // console.log(payload);
      } else if (payload.status_code === 409) {
        Swal.fire("Error!", payload.error, "error");
      } else if (payload.status_code === 400) {
        const password = payload.errors.password;
        const username = payload.errors.username;
        const email = payload.errors.email;
        let errors = [];
        if (password) {
          errors = [...errors, "\n", ...password];
        }
        if (username) {
          errors = [...errors, "\n", ...username];
        }
        if (email) {
          errors = [...errors, "\n", ...email];
        }
        Swal.fire("Error!", errors, "error");
      }
    } else {
      const { email, password } = formData;
      const url = `${baseUrl}/api/v1/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const payload = await res.json();
      if (payload.status_code === 200) {
        localStorage.setItem("token", payload.token);
        setIsLoggedIn(true);
        // console.log(payload);
        // alert(payload.message);
        Swal.fire("Success", "User Logged in successfully.", "success");
        if (payload.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        Swal.fire("Error!", payload.message, "error");
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{loginState}</h1>
        <div className="loginsignup-fields">
          {loginState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleFormChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </div>
        <button onClick={submitForm}>{loginState}</button>
        <p className="loginsignup-login">
          {loginState === "Sign Up" ? (
            <>
              {/* {navigate("/register")} */}
              Already have an Account?
              <span onClick={handleLogin}>Login here.</span>
            </>
          ) : (
            <>
              Dont't Have an Account?
              <span onClick={handleSignUp}> Sign Up</span>
            </>
          )}
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, i agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
