function Header() {
  return (
    <div className="header-container flex ">
      {/* <div className="header-name">e-Voting System</div> */}
      <div className="toggle-sidebar">TOGGLE</div>
      <div className="voter-account">
        <div>Voter Account</div>
        <button>Log Out</button>
      </div>
    </div>
  );
}

export default Header;
