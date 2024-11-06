import React, { useEffect, useState } from "react";
import "./App.css";
import RankCard from "./components/rank";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        setLeaders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <div className="container">
        <div className="left-side">
          <h2>Leaderboard</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <RankCard leaders={leaders} />
          )}
        </div>
        <Sidebar />
        </div>
    </div>
  );
}

export default App;
