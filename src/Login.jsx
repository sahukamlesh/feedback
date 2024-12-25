import { useState } from "react";
import { useFirebase } from "./context/firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
  const Firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Add name state for sign-up
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setUserRole] = useState("student"); // Default role is student
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { role } = await Firebase.signInUserWithEmailPassword(email, password);
      setRole(role);
      navigate(role === "student" ? "/feedback" : "/admin");
    } catch (error) {
        console.log("hello error",error)
      // Check if the error is "user not found" (Firebase-specific error)
      if (error.code === "auth/invalid-credential") {
        alert("Your ID does not exist. Please sign up.");
        setIsSignUp(true); // Redirect to the sign-up page (can be the same as login page)
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };

  const handleSignUp = async () => {
    try {
      // Trim the email and password inputs
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
  
      // Validate email format
      if (!trimmedEmail) {
        alert("Email cannot be empty!");
        return;
      }
  
      // Simple regex for email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmedEmail)) {
        alert("Please enter a valid email address!");
        return;
      }
  
      if (isSignUp && !name) {
        alert("Please enter your name!");
        return;
      }
  
      await Firebase.signUpUserWithEmailPassword(trimmedEmail, trimmedPassword, role, name); // Pass name to the signUp function
      alert("User  created successfully!");
      setIsSignUp(false);
    } catch (error) {
      alert("User  creation failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-center text-2xl font-bold">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        
        {/* Name input (only for sign-up) */}
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 mb-4 border rounded"
          />
        )}

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border rounded"
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 mb-4 border rounded"
        />

        {/* Role selection (only for sign-up) */}
        {isSignUp && (
          <select
            value={role}
            onChange={(e) => setUserRole(e.target.value)}
            className="block w-full px-4 py-2 mb-4 border rounded"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button
          onClick={isSignUp ? handleSignUp : handleSignIn}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
        
        <p
          className="text-center text-sm text-blue-500 cursor-pointer"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
