import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../AuthContext";

function Login({ setShowForm }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api.php", {
        action: "login",
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.auth_id); 
        setError("");
        setSuccess("Logged in successfully!");
        navigate("/home");
    } else {
        setError(res.data.message || "Invalid login credentials");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Network or server error");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleLogin} className="card bg-base-100 w-96" id="login">
        <div className="card-body">
          <h2 className="card-title">Log In</h2>
          <div className="m-3 p-1">
            <input
              type="email"
              placeholder="Email"
              className="input mb-5 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input mb-1 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>

        <a
          onClick={() => setShowForm("signup")}
          className="link cursor-pointer text-blue-500 m-3 flex items-center justify-center"
        >
          Don't have an Account? Sign Up
        </a>
      </form>
    </div>
  );
}

export default Login;
