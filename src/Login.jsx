import { useState } from "react";
import { useFirebase } from "./context/firebase";
import { useNavigate } from "react-router-dom";

const Login = ({ setRole }) => {
  const Firebase = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Add name state for sign-up
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setUserRole] = useState("student"); // Corrected state name for role
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Email and password cannot be empty!");
      return;
    }

    try {
      const { user, role } = await Firebase.signInUserWithEmailPassword(trimmedEmail, trimmedPassword);

      // Check if user and role are defined
      if (!user) {
        throw new Error("User not found");
      }

      // Provide a fallback value for role if undefined
      const userRole = role || "student"; // Default to "student" if no role is found
      setRole(userRole);

      const displayName = user.displayName || "Anonymous User";
      navigate(userRole === "student" ? "/feedback" : "/admin", { state: { userName: displayName } });
    } catch (error) {
      console.log("Error during login:", error);

      if (error.code === "auth/user-not-found" || error.code === "auth/invalid-credential") {
        alert("User does not exist or your password is wrong ");
        setIsSignUp(true); // Switch to sign-up view if the user doesn't exist
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        alert("Login failed: " + error.message);
      }
    }
  };

  const handleSignUp = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      alert("Email cannot be empty!");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (isSignUp && !name) {
      alert("Please enter your name!");
      return;
    }

    try {
      await Firebase.signUpUserWithEmailPassword(trimmedEmail, trimmedPassword, role, name);
      alert("User created successfully!");
      setIsSignUp(false); // Switch to login view after successful sign-up
    } catch (error) {
      console.log("Error during sign-up:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("Email is already in use. Please try a different email.");
      } else {
        alert("User creation failed: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        background: "linear-gradient(to right, #a1c4fd, #c2e9fb)", // Soft gradient
      }}
    >
      {/* SVG Background */}
      <svg className="absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="white"
          d="M0,128L30,133.3C60,139,120,149,180,144C240,139,300,117,360,112C420,107,480,117,540,144C600,171,660,213,720,213.3C780,213,840,171,900,138.7C960,107,1020,83,1080,80C1140,77,1200,95,1260,133.3C1320,171,1380,229,1410,258.7L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-1"></div>

      {/* Form */}
      <div className="bg-white bg-opacity-80 rounded-lg shadow-2xl p-8 max-w-md w-full space-y-6 z-10 relative">
        <h2 className="text-center text-4xl font-bold text-gray-800 mb-6">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {isSignUp && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        {isSignUp && (
          <select
            value={role}
            onChange={(e) => setUserRole(e.target.value)} // Corrected role state setter
            className="block w-full px-4 py-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button
          onClick={isSignUp ? handleSignUp : handleSignIn}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p
          className="text-center text-sm text-blue-500 cursor-pointer mt-4"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
