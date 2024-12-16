import "./Userstyle.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/foodiKo1.png";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    mobileno: "",
    password: ""
  })

  const { name, email, mobileno, password } = user
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validatename = () => {
    const nameregex = /^[a-zA-Z ]+$/;
    if (!nameregex.test(user.name))
      document.getElementById("screen1").innerHTML = "Only a-z A-Z";
    else
      document.getElementById("screen1").innerHTML = "";
  }
  const validateemail = () => {
    const emailregex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailregex.test(user.email))
      document.getElementById("screen2").innerHTML = "Only a-z 0-9 @ .";
    else
      document.getElementById("screen2").innerHTML = "";
  }
  const validatemobileno = () => {
    const mobilenoregex = /^[0-9]{9}$/;
    if (!mobilenoregex.test(user.mobileno))
      document.getElementById("screen3").innerHTML = "Only 0-9";
    else
      document.getElementById("screen3").innerHTML = "";
  }
  const validatepassword = () => {
    const passwordregex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (user.password.length <= 8)
      document.getElementById("screen4").innerHTML = "length is greater than 8";
    else if (!passwordregex.test(user.password))
      document.getElementById("screen4").innerHTML = "Only a-z A-Z 0-9 Symbols";
    else 
      document.getElementById("screen4").innerHTML = "";
  }

  const [typesgn1, setTypesgn1] = useState("password");
  const [iconsgn1, setIconsgn1] = useState(<VisibilityOffIcon />);

  const handleTogglesgn1 = () => {
    if (typesgn1 === "password") {
      setIconsgn1(<VisibilityIcon />);
      setTypesgn1("text");
    } else {
      setIconsgn1(<VisibilityOffIcon />);
      setTypesgn1("password");
    }
  };
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user/signup", user)
    toast.success("Account Created Successfully");
    await timeout(2000);
    navigate("/login");
  };

  return (
    <div className="user-container">
      <div className="n-nav">
        <Link className="n-link" to="/">
          <button>
            <span>
              <HomeIcon />
            </span>
            <span>Home</span>
          </button>
        </Link>
      </div>
      <ToastContainer />
      <div className="user-cont">
        <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
          <p className="u-name">Create Account</p>
          <div className="u-input">
            <span>
              <label htmlFor="name">Name</label>
            </span>
            <span className="u-icon">
              <PersonIcon />
            </span>
            <br></br>
            <input type="text" id="name" name="name" value={name} onChange={(e) => { onInputChange(e); validatename() }} required></input>
            <div className="screen1" id="screen1"></div>
          </div>
          <div className="u-input">
            <span>
              <label htmlFor="email">Email</label>
            </span>
            <span className="u-icon">
              <EmailIcon />
            </span>
            <br></br>
            <input type="email" id="email" name="email" value={email} onChange={(e) => { onInputChange(e); validateemail() }} required></input>
            <div className="screen2" id="screen2" ></div>
          </div>
          <div className="u-input">
            <span>
              <label htmlFor="mobileno">Mobile No</label>
            </span>
            <span className="u-icon">
              <PhoneIcon />
            </span>
            <br></br>
            <input type="text" id="mobileno" name="mobileno" value={mobileno} onChange={(e) => { onInputChange(e); validatemobileno() }} required></input>
            <div className="screen3" id="screen3"></div>
          </div>
          <div className="u-input">
            <span>
              <label htmlFor="password">Password</label>
            </span>
            <span className="u-icon u-eyeicon" onClick={handleTogglesgn1}>
              {iconsgn1}
            </span>
            <br></br>
            <input type={typesgn1} id="password" name="password" value={password} onChange={(e) => { onInputChange(e); validatepassword() }} required></input>
            <div className="screen4" id="screen4"></div>
          </div>
          <div className="u-btn1">
            <button type="submit" className="u-btn">
              Sign up
            </button>
          </div>
          <div className="u-link1">
            <span className="u-font2">Already have an account? </span>
            <span>
              <Link to="/login" className="u-font1">
                login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
