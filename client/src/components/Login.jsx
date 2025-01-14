import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [voterid, setVoterid] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const userData = { email, voterid, password };
    console.log(userData);
    navigate("/");
  }

  return (
    <>
      <div className="voting-system">Voting System</div>
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <h1 className="login">Login</h1>
          {/* <label htmlFor="voter-name" className="name-label">
          Voter Name:
        </label>
        <input
          type="text"
          id="voter-name"
          className="input name-label"
          name="name"
        ></input> */}

          <label htmlFor="voter-id" className="id-label">
            Voter ID:
          </label>
          <input
            type="text"
            id="voter-id"
            className="input id-label"
            required
            onChange={(e) => setVoterid(e.target.value)}
          ></input>

          <label htmlFor="voter-email" className="email-label">
            Email:
          </label>
          <input
            type="email"
            id="voter-email"
            className="input email-label"
            onChange={(e) => setEmail(e.target.value)}
          ></input>

          <label htmlFor="voter-pw" className="pw-label">
            Password:
          </label>
          <input
            type="password"
            id="voter-pw"
            className="input pw-label"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button type="submit" className="btn login-btn">
            Login
          </button>
          <Link to="/Register">Register</Link>
        </div>
      </form>
    </>
  );
}

export default Login;
