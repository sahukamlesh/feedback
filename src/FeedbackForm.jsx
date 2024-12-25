import { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "./context/firebase"; // Import Firebase app instance

const FeedbackForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get Firestore instance
    // const db = getFirestore(app);  // Ensure you use the correct Firebase instance

    // Reference to the feedbacks collection in Firestore
    const feedbacksCollection = collection(db, "feedbacks");

    // Data to be sent
    const feedbackData = {
      name,
      email,
      feedback,
      timestamp: Date.now(),
    };

    try {
      // Add the feedback document to Firestore
      await addDoc(feedbacksCollection, feedbackData);
      alert("Thank you for your feedback!");
      setName("");
      setEmail("");
      setFeedback("");
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
          love to hear your thoughts!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Teacher Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
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
