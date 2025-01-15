import { VOTER_DATA } from "./Data";
import { CANDIDATE_DATA } from "./Data";
import { POSITION_DATA } from "./Data";

function Dashboard() {
  const voterNum = VOTER_DATA.length;
  const candidateNum = CANDIDATE_DATA.length;
  const positionNum = POSITION_DATA.length;

  return (
    <div>
      <div className="dashboard-container">
        <div className="page-title">Dashboard</div>
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
    </div>
  );
}

export default Dashboard;
