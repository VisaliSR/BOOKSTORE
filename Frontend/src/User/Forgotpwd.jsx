import "./Userstyle.css";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/foodiKo1.png";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import DialpadIcon from "@mui/icons-material/Dialpad";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Forgotpwd = () => {

  const [user, setUser] = useState({
    email: "",
    otp: "",
    password: ""
  })

  const { email, otp, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [msg, setMsg] = useState("");
  const [otp1, setOtp1] = useState("");
  const [typerpwd1, setTyperpwd1] = useState("password");
  const [iconrpwd1, setIconrpwd1] = useState(<VisibilityOffIcon />);

  const handleTogglerpwd1 = () => {
    if (typerpwd1 === "password") {
      setIconrpwd1(<VisibilityIcon />);
      setTyperpwd1("text");
    } else {
      setIconrpwd1(<VisibilityOffIcon />);
      setTyperpwd1("password");
    }
  };

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const sendOtp = async () => {
    const result = await axios.post("http://localhost:8080/user/send_otp", user);
    setOtp1(result.data);
    //eslint-disable-next-line
    if (otp1 == "-1") {
      toast.error("Enter Valid Email");
      setMsg("Enter Valid Email");
    }
    else {
      setMsg("Email Sent Successfully");
      toast.success("Email Sent Successfully");
    }
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    //eslint-disable-next-line
    if (otp1 == otp) {
      await axios.post("http://localhost:8080/user/change_password", user);
      toast.success("Password Reset done Successfully");
      await timeout(2000);
      navigate("/login");
    }
    else {
      toast.error("Enter Valid OTP");
      setMsg("Enter Valid OTP");
    }
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
          <p className="u-name">Forgot Password</p>
          <div className="screen">{(msg === "") ? (<p>{msg}</p>) : msg}</div>
          <div className="u-input">
            <span>
              <label htmlFor="email">Email</label>
            </span>
            <span className="u-icon">
              <EmailIcon />
            </span>
            <br></br>
            <input type="email" id="email" name="email" value={email} onChange={(e) => onInputChange(e)} required></input>
            <div className="screen1"></div>
          </div>
          <div className="mailsend">
            <button type="button" className="u-send" onClick={() => sendOtp()}>
              Send
            </button>
          </div>
          <div className="u-input">
            <span>
              <label htmlFor="otp">OTP</label>
            </span>
            <span className="u-icon">
              <DialpadIcon />
            </span>
            <br></br>
            <input type="text" id="otp" name="otp" value={otp} onChange={(e) => onInputChange(e)} required></input>
            <div className="screen2"></div>
          </div>
          <div className="u-input">
            <span>
              <label htmlFor="password">Password</label>
            </span>
            <span className="u-icon u-eyeicon" onClick={handleTogglerpwd1}>
              {iconrpwd1}
            </span>
            <br></br>
            <input type={typerpwd1} id="password" name="password" value={password} onChange={(e) => onInputChange(e)} required></input>
            <div className="screen3"></div>
          </div>
          <div className="u-btn1">
            <button type="submit" className="u-btn">
              Reset
            </button>
          </div>
          <div className="u-link1">
            <span className="u-font2">Don't receive an OTP? </span>
            <span className="u-font1" onClick={() => sendOtp()} >Resend</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Forgotpwd;
