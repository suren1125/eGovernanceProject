import { Link } from "react-router";

function NavSideBar() {
  return (
    <div className="nav-container">
      <h1 className="title">Voting System</h1>
      <div className="voter-account">Voter Account</div>
      <section className="reports">
        <h1>REPORTS</h1>
        <Link to="/dashboard">
          <li className="dashboard">Dashboard</li>
        </Link>
      </section>

      <section className="manage">
        <h1>MANAGE</h1>
        <Link to="/voterlist">
          <li className="voters">Voters</li>
        </Link>
        <Link to="/position">
          <li className="positions">Positions</li>
        </Link>
        <Link to="/candidatelist">
          <li className="candidates">Candidates</li>
        </Link>
      </section>

      <section className="settings">
        <h1>SETTINGS</h1>
        <li className="ballot-position">Ballot Position</li>
        <li className="election-title">Election Title</li>
      </section>
    </div>
  );
}

export default NavSideBar;
