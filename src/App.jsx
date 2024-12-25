import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";
import FeedbackForm from "./FeedbackForm";
import AdminPage from "./AdminPage";

const App = () => {
  const [role, setRole] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setRole={setRole} />} />
        <Route path="/feedback" element={role === "student" ? <FeedbackForm /> : <Navigate to="/" />} />
        <Route path="/admin" element={role === "admin" ? <AdminPage /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
