import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import FeedbackForm from "./FeedbackForm";
import AdminPage from "./AdminPage";
import Header from "./Header"; // Import the Header component

const App = () => {
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    setRole(null); // Clear the user role
  };

  return (
    <Router>
      <div>
        {role && <Header onLogout={handleLogout} />} {/* Render Header if logged in */}
        <Routes>
          <Route path="/" element={<Login setRole={setRole} />} />
          <Route path="/feedback" element={role === "student" ? <FeedbackForm /> : <Navigate to="/" />} />
          <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;