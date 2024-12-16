import "./Adminlogin.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const { email, password } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const [msg, setMsg] = useState("");
  const [typelgn, setTypelgn] = useState("password");
  const [iconlgn, setIconlgn] = useState(<VisibilityOffIcon />);

  const handleTogglelgn = () => {
    if (typelgn === "password") {
      setIconlgn(<VisibilityIcon />);
      setTypelgn("text");
    } else {
      setIconlgn(<VisibilityOffIcon />);
      setTypelgn("password");
    }
  };

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8080/user/login", user);
    setMsg(result.data);
    if (result.data === "Login Successful") {
      const userdata = await axios.post("http://localhost:8080/user/loginauth", user);
      localStorage.setItem('userId', userdata.data.id);
      sessionStorage.setItem("userId", userdata.data.id);
      toast.success(result.data);
      await timeout(2000);
      navigate("/");
    }
    else if (result.data === "Email not found") 
      toast.error(result.data);
    else
      toast.error(result.data);
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
          <p className="u-name">Login</p>
          <div className="screen">{(msg === "Login Successful") ? (<p>{msg}</p>) : msg}</div>
          <div className="u-input">
            <span>
              <label htmlFor="name">Email</label>
            </span>
            <span className="u-icon">
              <EmailIcon />
            </span>
            <br></br>
            <input type="email" id="email" name="email" value={email} onChange={(e) => onInputChange(e)} required></input>
            <div className="screen1" id="screen1"></div>
          </div>
          <div className="u-input">
            <span>
              <label htmlFor="password">Password</label>
            </span>
            <span className="u-icon u-eyeicon" onClick={handleTogglelgn}>
              {iconlgn}
            </span>
            <br></br>
            <input type={typelgn} id="password" name="password" value={password} onChange={(e) => onInputChange(e)} required></input>
            <div className="screen2"></div>
            <div className="u-link2">
              <Link to="/forgotpassword" className="u-font1">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="u-btn1">
            <button type="submit" className="u-btn" ><Link to="/admin">
              login</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
