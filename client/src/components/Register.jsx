import { useState } from "react";
import { Link, useNavigate } from "react-router";
import voting from "../assets/voting.png";
import gov_nepal from "../assets/gov_nepal.png";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [citizenNum, setCitizenNum] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      username: `${fname} ${lname}`,
      voter_id: phoneNo,
      password,
      password2: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Candidates:", data);
      } else {
        console.error("Error getting candidates:", data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className="relative mt-[3rem] mx-[5rem] py-[2rem] px-[2rem]">
      <img
        src={gov_nepal}
        alt="Government of Nepal Emblem"
        className="w-[8rem] h-[8rem]"
      />
      <h1 className="text-4xl font-semibold my-[2rem]">Register</h1>
      <form onSubmit={handleSubmit} className="w-1/2 register">
        <div className=" grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              id="fname"
              placeholder="First Name"
              className="ring-1"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              id="lname"
              placeholder="Last Name"
              className="ring-1"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="citizenNum">Citizenship Number</label>
            <input
              type="text"
              id="citizenNum"
              placeholder="Citizenship Number"
              className="ring-1"
              onChange={(e) => setCitizenNum(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              className="ring-1"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phoneNo">Phone Number</label>
            <input
              type="tel"
              id="phoneNo"
              placeholder="Phone Number"
              className="ring-1"
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="ring-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="ring-1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="ring-1"
            />
          </div>
        </div>

        <div className="flex flex-col my-3">
          <label>Gender:</label>
          <div className="flex gap-4">
            <label htmlFor="male">
              <input
                className="mr-2 ring-0"
                type="radio"
                id="male"
                name="gender"
                value="Male"
              />
              Male
            </label>
            <label htmlFor="female">
              <input
                className="mr-2"
                type="radio"
                id="female"
                name="gender"
                value="Female"
              />
              Female
            </label>
            <label htmlFor="other">
              <input
                className="mr-2"
                type="radio"
                id="other"
                name="gender"
                value="Other"
              />
              Other
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <Link to="/login">Already Registered? Login Here</Link>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-900 my-3 p-2 rounded-md text-white font-semibold"
          >
            Register
          </button>
        </div>
      </form>

      <img
        className="absolute top-0 z-[-1] w-1/2 right-0"
        src={voting}
        alt=""
      />
    </section>
  );
}

export default Register;
