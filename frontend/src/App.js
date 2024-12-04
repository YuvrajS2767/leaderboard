import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar";
import RankCard from "./components/rank";
import Quiz from "./Pages/Quiz"; 
import "./App.css";

function App() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [questions, setQuestions] = useState([]); 

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

    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/questions");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/leaderboard"
          element={
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
          }
        />
        <Route
          path="/quiz"
          element={<Quiz questions={questions} />}
        />
      </Routes>
    </div>
  );
}

export default App;
