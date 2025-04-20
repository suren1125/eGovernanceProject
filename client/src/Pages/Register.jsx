import { useState } from "react";
import { Link, useNavigate } from "react-router";
import voting from '../assets/voting.png'

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [citizenNum, setCitizenNum] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [gender , setGender]  = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    const userData = {
      username: `${fname} ${lname}`,
      citizenship_number:citizenNum,
      first_name:fname,
      last_name:lname,
      email,
      address,
      phone,
      gender,
      password,
      password2,
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
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
        navigate('/login')
 
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="relative bg-[#f7f8fa] pt-[1rem] px-[3rem]">
      <Link to="/" ><p className="text-xl font-bold mb-[2rem]">eBallot</p></Link>
      <div className=" card">
      <h1 className="text-3xl font-bold mb-[2rem]">Register</h1>
      <section className="grid grid-flow-row sm:grid-cols-2">
      <form onSubmit={handleSubmit} className="z-10 bg-white  register">
      <div className=" grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <input
            type="text"
            id="fname"
            placeholder="First Name"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            id="lname"
            placeholder="Last Name"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            id="citizenNum"
            placeholder="Citizenship Number"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setCitizenNum(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="tel"
            id="phoneNo"
            placeholder="Phone Number"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            className="ring-1 px-2 py-[0.2rem]"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        </div>


      <h1 className="my-3 font-semibold">Gender</h1>
      <div className="flex gap-3 mb-3">
      
      <label>
        <input
          type="radio"
          value="Male"
          checked={gender === 'Male'}
          onChange={(e) => setGender(e.target.value)}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          value="Female"
          checked={gender === 'Female'}
          onChange={(e) => setGender(e.target.value)}
        />
        Female
      </label>
      <label>
        <input
          type="radio"
          value="Other"
          checked={gender === 'Other'}
          onChange={(e) => setGender(e.target.value)}
        />
        Other
      </label>
    </div>

        <div className="flex flex-col">
          <Link to="/Login">Already Registered? Login Here</Link>
        </div>

        <div className="col-span-2">
          <button type="submit" className="button w-full mt-[1rem]">
            Register
          </button>
        </div>
      </form>

      <img className="mt-[2rem] sm:mt-0 sm:absolute right-0 top-0 max-w-[30rem] " src={voting} alt="" />
      </section>
      </div>
    </section>
  );
}

export default Register;
