
import { useNavigate,useLocation } from "react-router-dom";

const Header = ({ onLogout }) => {
  const location  = useLocation();
  const userName = location.state?.userName || "Guest";
  const navigate = useNavigate(); // Import and initialize useNavigate

  const handleLogout = () => {
    onLogout(); 
    navigate("/"); 
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Feedback System</h1>
      <div className="flex items-center">
        <span className="mr-4">Welcome, {userName || "User"}!</span> {/* Show user's name or default to "User" */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
