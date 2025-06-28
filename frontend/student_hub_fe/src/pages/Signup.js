import { useState } from "react";

function Signup({ setShowForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [studentName, setStudentName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: basic client-side validation
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "signup",
          email,
          password,
          studentName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Account created successfully!");
        setError("");
        setShowForm("login");
      } else {
        setError(data.message || "Signup failed.");
        setSuccess("");
      }
    } catch (err) {
      console.error(err);
      setError("Network or server error.");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <form onSubmit={handleSubmit} className="card bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Sign Up</h2>

          <input
            type="email"
            placeholder="Email"
            className="input m-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="name"
            placeholder="Name"
            className="input m-2"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input m-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Retype Password"
            className="input m-2 mb-5"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </div>

        <a
          onClick={() => setShowForm("login")}
          className="link cursor-pointer text-blue-500 m-3 flex items-center justify-center"
        >
          Already have an Account? Log In
        </a>
      </form>
    </div>
  );
}

export default Signup;
