import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Menu, X, Bell } from 'lucide-react';

const Header = ({ onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setUserName(location.state?.userName || "Guest");

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.state]);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white text-gray-800 shadow-lg' : 'bg-blue-600 text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
              Feedback System
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <span className="text-sm font-medium">Welcome, {userName}!</span>
            <button
              className={`p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 ${isScrolled ? 'text-gray-600' : 'text-white'}`}
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ease-in-out transform hover:scale-105 ${
                isScrolled
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              }`}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-200 ${isScrolled ? 'text-gray-600 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40`}>
          <div className={`px-6 pt-8 pb-6 space-y-6 bg-white rounded-lg shadow-md absolute top-0 left-0 right-0 sm:w-80 w-full mx-auto`}>
            <span className={`block text-lg font-semibold text-gray-800`}>
              Welcome, {userName}!
            </span>
            <button
              onClick={handleLogout}
              className={`flex items-center w-full px-4 py-2 rounded-md text-lg font-medium text-gray-800 hover:bg-gray-200 transition duration-200`}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
