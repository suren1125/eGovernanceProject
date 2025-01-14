import { Link } from "react-router";

function NavSideBar() {
  return (
    <div className="nav-container">
      <h1 className="title">Voting System</h1>
      <div className="voter-account">Voter Account</div>
      <section className="reports">
        <h1>REPORTS</h1>
        <Link to="/Dashboard">
          <heading className="dashboard">Dashboard</heading>
        </Link>
        <heading className="Votes">Votes</heading>
      </section>

      <section className="manage">
        <h1>MANAGE</h1>
        <heading className="voters">Voters</heading>
        <heading className="positions">Positions</heading>
        <Link to="/CandidateList">
          <heading className="candidates">Candidates</heading>
        </Link>
      </section>

      <section className="settings">
        <h1>SETTINGS</h1>
        <heading className="ballot-position">Ballot Position</heading>
        <heading className="election-title">Election Title</heading>
      </section>
    </div>
  );
}

export default NavSideBar;
