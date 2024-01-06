import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    });
  };

  const handleInputChange = (e) => {
    const newValue = {
      ...values,
      [e.target.name]: e.target.value,
    };
    setValues(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiEndpoint = "http://localhost:4000/login";
      const { data } = await axios.post(
        apiEndpoint,
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      //   console.log(data);
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) {
            generateError(email);
          } else if (password) {
            generateError(password);
          }
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Login Account</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>

        <div>
          <label htmlFor="passord">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              handleInputChange(e);
            }}
          />
        </div>

        <button type="submit">Login</button>
        <span>
          Create Account : <Link to="/register">Register</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
}
