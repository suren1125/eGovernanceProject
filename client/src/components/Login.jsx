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

<div className="flex justify-center	p-5 m-5">

  <div className="flex flex-col items-center m-5 p-10">
        <h1 className="mb-10 text-3xl font-sans font-bold text-[#3e0598]">E-voting System</h1>

<div className="">
  <div className="relative">
  <form onSubmit={handleSubmit}>
  
<label htmlFor="voter-email"></label>
  <input type="number"
   name="id" 
   id="voter-id" 
    value={voterid}
     onChange={(e) => setVoterid(e.target.value)} 
     className="border border-gray-400 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-[19px]" 
     placeholder="VoterId Number"></input>
  
  
  <input type="password" 
  name="password"
   id="voter-password"
   value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-[19px]" 
    placeholder="Password"></input>
  
  
  <div className="flex flex-col items-center gap-2">
  <button type="submit" className="bg-[#3e0598] self-center text-white p-2 m-2 text-[20px] rounded-full w-[200px]">
            Login
          </button>
          <Link to="/Register" className="text-gray-400">Don't have an account? Register Here!</Link> 
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
