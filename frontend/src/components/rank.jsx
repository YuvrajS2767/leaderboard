const RankCard = ({ leaders }) => {
    return (
      <div className="main">
        <div className="leaderboard">
          <ul>
            {leaders && leaders.length > 0 ? (
              leaders.map((leader, index) => (
                <li key={leader._id}>
                  <div className="rank">{index + 1}</div>
                  <div className="user-info">
                    <span>
                      <img src={leader.avatar} alt="User Avatar" />
                    </span>
                    <div className="details">
                      <span className="username">{leader.name}</span>
                      <span className="score">{leader.xp} XP</span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>No leaderboard data available</li>
            )}
          </ul>
        </div>
      </div>
    );
  };
  
  export default RankCard;
  
