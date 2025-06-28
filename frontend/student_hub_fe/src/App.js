import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import { AuthForms } from "./pages/AuthForms";
import { useAuth } from "./AuthContext";
import { NavigationBar } from "./pages/components/NavigationBar";

function App() {
   const { auth_id, logout } = useAuth();
   
  return (
    <Router>
      <NavigationBar logout={logout}/>

      <Routes>
        <Route path="/" element={auth_id ? <Navigate to="/home" /> : <AuthForms />} />
        <Route path="/home" element={auth_id ? <Home /> : <Navigate to="/" />} />
        <Route path="/faq" element={auth_id ? <FAQ /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
