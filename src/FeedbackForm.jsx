import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./context/firebase"; 
import { useLocation } from "react-router-dom";

const FeedbackForm = () => {
  const location = useLocation();
  const userName = location.state?.userName || "Guest";
  const [name, setName] = useState(userName); // Set the default name to userName
  const [teacherName, setTeacherName] = useState(""); // Teacher name state
  const [email, setEmail] = useState(""); // Email state
  const [feedback, setFeedback] = useState(""); // Feedback state
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const feedbacksCollection = collection(db, "feedbacks");

    // Data to be sent
    const feedbackData = {
      name: name === "Anonymous User" ? "Anonymous User" : userName, // If name is anonymous, send "Anonymous User"
      teacherName,
      email,
      feedback,
      timestamp: Date.now(),
    };

    try {
      // Add the feedback document to Firestore
      await addDoc(feedbacksCollection, feedbackData);
      alert("Thank you for your feedback!");
      setName(userName); 
      setTeacherName(""); // Reset teacher name
      setEmail(""); // Reset email
      setFeedback(""); // Reset feedback
    } catch (error) {
      alert("Failed to submit feedback. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Feedback Form
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Love to hear your thoughts!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Dropdown */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Choose your display name
            </label>
            <select
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option value={userName}>{userName}</option>
              <option value="Anonymous User">Anonymous User</option>
            </select>
          </div>

          {/* Teacher Name Input */}
          <div>
            <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700" required>
              Teacher Name
            </label>
            <input
              id="teacherName"
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Enter teacher's name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Feedback Textarea */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your feedback"
              rows="4"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
