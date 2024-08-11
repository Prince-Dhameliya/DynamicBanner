import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ShowPasswordIcon from '../../assets/visibility_black_24dp.svg';
import "./Registration.css"
import { useAuth } from "../../hooks/useAuth.jsx";
import axios from "../../api/axios.js";


export const Registration = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
  });

  if(user) {
    return <Navigate to={from} replace />
  }

  const {email, password, remember} = formData;

  const handleChange = (event) => {
    const {name, value, type, checked} = event.target
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('/register',
          JSON.stringify({ email, pwd: password }),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          }
    ).then(res => {
      setFormData({
        email: "",
        password: "",
        remember: false
      });
    })
    .catch(err => {
      if (!err?.response) {
          alert('No Server Response');
      } else if (err.response?.status === 400) {
          alert('Missing Username or Password');
      } else if (err.response?.status === 401) {
          alert('Unauthorized');
      } else if(err.response?.status === 500) {
          alert('Internal Server Error');
      } else {
          alert('Login Failed');
      }
    });
  };
  return (
    <div className="login-page-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="title">Registration</div>

        <div className="text-field-container">
            <input 
              className="text-field"
              type="text"
              name="email" 
              value={email} 
              onChange={handleChange} 
              placeholder="Email ID*" 
            />
            <div className="forgot-link">FORGOT EMAIL ID?</div>
        </div>

        <div className="text-field-container text-field-container-margin">
            <input 
              className="text-field"
              type="password" 
              name="password"
              value={password} 
              onChange={handleChange} 
              placeholder="Password*" 
            />
            <img 
              className="text-field-icon" 
              src={ShowPasswordIcon} 
              alt="Show Password Icon" />
            <div className="forgot-link">FORGOT PASSWORD?</div>
        </div>

        <div className="remember-me-container">
            <input 
              type="checkbox" 
              name="remember"
              checked={remember}
              onChange={handleChange}
            />
            <label htmlFor="remember">Remember Me</label>
        </div>

        <button className="login-button" type="submit">Register</button>

        <div className="create-new-account-container">
          <div className="create-new-account-text">Already Registered?</div>
          <div className="forgot-link" onClick={() => navigate("/login", {replace : true})}>Log in</div>
        </div>
      </form>
    </div>
  );
};