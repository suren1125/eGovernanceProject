import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [citizenNum, setCitizenNum] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      fname,
      lname,
      citizenNum,
      address,
      phoneNo,
      email,
      password,
    };
    console.log(userData);
    Navigate("/Dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="register-container">
        <h1 className="register">Register</h1>
        <label htmlFor="fname" className="fname-label">
          First Name:
        </label>
        <input
          type="text"
          id="fname"
          className="input fname-label"
          name="fname"
          onChange={(e) => setFname(e.target.value)}
        ></input>

        <label htmlFor="lname" className="lname-label">
          Last Name:
        </label>
        <input
          type="text"
          id="lname"
          className="input lname-label"
          name="lname"
          onChange={(e) => setLname(e.target.value)}
        ></input>

        <label htmlFor="citizen-num" className="num-label">
          Citizenship Number:
        </label>
        <input
          type="text"
          id="citizen-num"
          className="input num-label"
          onChange={(e) => setCitizenNum(e.target.value)}
        ></input>

        <label htmlFor="voter-address" className="address-label">
          Address
        </label>
        <input
          type="text"
          id="voter-address"
          className="input address-label"
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label htmlFor="voter-ph" className="ph-label">
          Phone Number:
        </label>
        <input
          type="tel"
          id="voter-ph"
          className="input ph-label"
          onChange={(e) => setPhoneNo(e.target.value)}
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

        <label htmlFor="pw-confirmation" className="confirmation-label">
          Confirm Password:
        </label>
        <input
          type="password"
          id="pw-confirmation"
          className="input
          confirmation-label"
          onChange={(e) => {
            if (e.target.value !== password) {
              alert("Enter the same password!");
              return false;
            }
          }}
        ></input>

        <div>
          <label name="gender" className="voter-gender">
            Gender:
          </label>
          <label htmlFor="male" className="male">
            <input type="radio" name="gender" value="Male" />
            Male
          </label>
          <label htmlFor="female" className="female">
            <input type="radio" name="gender" value="Female" />
            Female
          </label>
        </div>
        <Link to="/Login">Already Registered? Login Here</Link>
        <button type="submit" className="btn register-btn">
          Register
        </button>
      </div>
    </form>
  );
}

export default Register;
