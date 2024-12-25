import React, { useEffect, useState } from "react";
import { db } from "./context/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Star, User, BookOpen, MessageSquare } from 'lucide-react';

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const feedbackCollection = collection(db, "feedbacks");
        const feedbackSnapshot = await getDocs(feedbackCollection);
        const feedbackList = feedbackSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbacks(feedbackList);
      } catch (error) {
        console.error("Error fetching feedbacks:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const getRandomColor = () => {
    const colors = ['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-red-100', 'bg-indigo-100', 'bg-purple-100', 'bg-pink-100'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">Admin Feedbacks</h1>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-center text-gray-500 text-xl">No feedback available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className={`${getRandomColor()} rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1`}>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <User className="h-6 w-6 text-gray-600 mr-2" />
                      <h3 className="text-lg font-semibold text-gray-800">{feedback.name || 'Anonymous'}</h3>
                    </div>
                    <div className="flex items-center mb-4">
                      <BookOpen className="h-6 w-6 text-gray-600 mr-2" />
                      <p className="text-gray-600">{feedback.teacherName || 'N/A'}</p>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-start">
                        <MessageSquare className="h-6 w-6 text-gray-600 mr-2 mt-1" />
                        <p className="text-gray-700">{feedback.feedback}</p>
                      </div>
                    </div>
                    {feedback.rating && (
                      <div className="flex items-center">
                        <Star className="h-6 w-6 text-yellow-400 mr-1" />
                        <span className="text-gray-600">{feedback.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

