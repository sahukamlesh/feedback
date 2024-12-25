import React, { useEffect, useState } from "react";
import { db } from "./context/firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);

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
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <ul className="list-disc pl-4">
          {feedbacks.map((feedback) => (
            <li key={feedback.id} className="mb-2">
                {feedback.name}
              {feedback.feedback}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPage;
