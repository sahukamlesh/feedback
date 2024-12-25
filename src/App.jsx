import { useFirebase } from './context/firebase';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route ,useNavigate} from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
const Login = () => {
    const Firebase = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = () => {
        Firebase.signInUserWithEmailPassword(email, password)
            .then(() => {
                navigate('/feedback');
            })
            .catch((error) => alert('Login failed', error));
    };

    const handleSignUp = () => {
        Firebase.signUpUserWithEmailPassword(email, password)
            .then(() => {
                alert('User Created Successfully');
            })
            .catch((error) => alert('User not created Successfully', error));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Student-Teacher Feedback
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your account or create a new one
                    </p>
                </div>
                <div className="mt-8 space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                    <div className="flex items-center justify-between">
                        <button onClick={handleSignUp} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign Up</button>
                        <button onClick={handleSignIn} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ml-3">Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/feedback" element={<FeedbackForm />} />
            </Routes>
        </Router>
    );
};

export default App;

