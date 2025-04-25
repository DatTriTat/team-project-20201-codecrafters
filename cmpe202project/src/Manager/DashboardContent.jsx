import React, { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import { fetchRestaurants } from "../utils/fetchRestaurants";
import ReservationTable from "./ReservationTable";

function DashboardContent() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        const token =
          localStorage.getItem("authToken") ||
          sessionStorage.getItem("authToken");
        const data = await fetchRestaurants(token);
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;
  if (error) return <div style={{ color: "red" }}>Error: {error}</div>;

  return (
    <section className={styles.column2}>
      <div className={styles.div6}>

        {!selectedRestaurantId ? (
          <div>
            <h3 className={styles.restaurantPrompt}>Click a Restaurant to View Reservations:</h3>
            <div className={styles.restaurantList}>
              {restaurants.map((res) => (
                <div
                  key={res.id}
                  onClick={() => setSelectedRestaurantId(res.id)}
                  className={styles.restaurantItem}
                >
                  <div className={styles.restaurantName}>{res.name}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <button 
              onClick={() => setSelectedRestaurantId(null)}
              className={styles.backButton}
            >
              ← Back to Restaurant List
            </button>
            <ReservationTable restaurantId={selectedRestaurantId} />
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardContent;

