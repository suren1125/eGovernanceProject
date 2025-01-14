import { useState } from "react";

function Dashboard() {
  const [positionNum] = useState(0);
  const [candidateNum] = useState(0);
  const [voterNum] = useState(0);

  return (
    <div className="dashboard-container">
      <div className="voting-statistics">
        <div className="num-positions">
          <p>{positionNum}</p>
          <p>No. of Positions</p>
        </div>

        <div className="num-candidates">
          <p>{candidateNum}</p>
          <p>No. of Candidates</p>
        </div>

        <div className="num-voters">
          <p>{voterNum}</p>
          <p>Total Voters</p>
        </div>
      </div>

      <div className="votes-tally">
        <p>Voting Tally</p>
      </div>
    </div>
  );
}

export default Dashboard;
