import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [voter_id, setVoterid] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      voter_id, 
      password 
    };
    console.log(userData);
    try{
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      return
    }
    console.log("successful");
    console.log(data)
  }catch(error){
    console.log(error);
  }
  }

  return (
    <>

<div className="flex justify-center	p-5 m-5">

  <div className="flex flex-col items-center m-5 p-10">
        <h1 className="mb-10 text-3xl font-sans font-bold text-[#3e0598]">E-voting System</h1>

<div className="">
  <div className="relative">
  <form onSubmit={handleSubmit}>
  
  <input type="number"
   name="id" 
   id="voter-id" 
     onChange={(e) => setVoterid(e.target.value)} 
     className="border border-gray-400 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-[19px]" 
     placeholder="VoterId Number" />
  
  
  <input type="password" 
  name="password"
   id="voter-password"

    onChange={(e) => setPassword(e.target.value)}
    className="border border-gray-400 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-[19px]" 
    placeholder="Password" />
  
  
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
