import { useState } from "react";
import { Link, useNavigate } from "react-router";
import gov_nepal from "../assets/gov_nepal.png";

function Login() {
  const [voterid, setVoterid] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { voterid, password };
    console.log(userData);
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center	p-5 m-5">
        <img
          src={gov_nepal}
          alt="Government of Nepal Emblem"
          className="w-[10rem] h-[10rem]"
        />
        <div className="flex flex-col items-center m-5 p-10">
          <h1 className="mb-10 text-5xl font-sans font-bold text-[#3e0598]">
            E-voting System
          </h1>
          <h1 className="text-4xl text-[#3e0598] font-semibold my-[2rem]">
            Login
          </h1>
          <div className="">
            <div className="relative">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="id"
                  id="voter-id"
                  value={voterid}
                  onChange={(e) => setVoterid(e.target.value)}
                  className="border border-gray-400 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-[19px]"
                  placeholder="Voter ID "
                ></input>

                <input
                  type="password"
                  name="password"
                  id="voter-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-[19px]"
                  placeholder="Password"
                ></input>

                <div className="flex flex-col items-center gap-2">
                  <button
                    type="submit"
                    className="bg-[#3e0598] self-center text-white p-2 m-2 text-[20px] rounded-full w-[200px]"
                  >
                    Login
                  </button>
                  <Link to="/register" className="text-gray-400">
                    Don&apos;t have an account? Register Here!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
