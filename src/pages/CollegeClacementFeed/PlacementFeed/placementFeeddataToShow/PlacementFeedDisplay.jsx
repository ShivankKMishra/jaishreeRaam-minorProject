import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

function PlacementFeedDisplay() {
  const db = getFirestore();
  const [placementFeeds, setPlacementFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlacementFeeds = async () => {
      try {
        // Fetch placement feeds from Firestore
        const querySnapshot = await getDocs(collection(db, "Placement-feed"));
        const feedsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlacementFeeds(feedsData);
        setLoading(false);
      } catch (err) {
        // Handle error
        console.error("Error fetching placement feeds:", err);
      }
    };

    fetchPlacementFeeds();
  }, [db]);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Placement Feeds</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {placementFeeds.map((feed) => (
            <li key={feed.id} className="bg-gray-100 p-4 rounded-md">
              <p className="text-lg">{feed.content}</p>
              <p className="text-gray-500 mt-2">
                Posted on  {feed.createdAt ? `at ${feed.createdAt.toDate().toLocaleString()}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
     
    </div>
  );
}

export default PlacementFeedDisplay;
