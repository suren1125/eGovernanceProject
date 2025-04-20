import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthUserContext } from "../Context/AuthUserContext";
import voting from '../assets/voting.png'

function Login() {
  const {setUser} = useContext(AuthUserContext);
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
    localStorage.setItem("access-token",data.access);
    setUser(data.user);
    navigate('/')
  }catch(error){
    console.log(error);
  }
  }

  return (
 <section className="relative bg-[#f7f8fa] pt-[1rem] px-[3rem]">
       <Link to="/" ><p className="text-xl font-bold mb-[2rem]">eBallot</p></Link>
       <div className="card">
       <h1 className="text-3xl font-bold mb-[2rem]">Login</h1>
       <section className="grid grid-flow-row sm:grid-cols-2">
       <form onSubmit={handleSubmit} className="z-10 bg-white ">

         <div className="flex flex-col mb-[1rem]">
          <label htmlFor="voter-id">Enter Voter ID:</label>
           <input
             type="text"
             id="voter-id"
             placeholder="Voter Id"
             className="ring-1 px-2 py-[0.2rem] mt-2"
             onChange={(e) => setVoterid(e.target.value)}
           />
         </div>

         <div className="flex flex-col">
         <label htmlFor="voter-id">Enter Password:</label>
           <input
             type="password"
             placeholder="Password"
             className="ring-1 px-2 py-[0.2rem] mt-2"
             onChange={(e) => setPassword(e.target.value)}
           />
         </div>
         <div className="flex flex-col mt-4">
          <Link to="/register">No account? Register here.</Link>
        </div>

        <div className="col-span-2">
          <button type="submit" className="button w-full mt-[1rem]">
            Login
          </button>
        </div>
       </form>
 
       <img className="mt-[2rem] max-w-[30rem] " src={voting} alt="" />
       </section>
       </div>
     </section>
  );
}

export default Login;
