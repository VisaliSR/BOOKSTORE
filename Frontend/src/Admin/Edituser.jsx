import "./Userstyle.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Logo from "../assets/foodiKo1.png";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from '@mui/icons-material/Phone';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Edituser = () => {

  const { id } = useParams();

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

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/profile/${id}`);
    setUser(result.data);
  }

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/user/update/" + user.id, user);
    toast.success("Successfully Edited");
    await timeout(1500);
    navigate("/admin");
  };
  return (
    <div className="user-container">
      <div className="n-nav">
        <div className="n-foodikologo">
          <img src={Logo} alt="foodiko" />
        </div>
        <Link className="n-link" to="/admin">
          <button>
            <span>
              <HomeIcon />
            </span>
            <span>Admin</span>
          </button>
        </Link>
      </div>
      <ToastContainer />
      <div className="user-cont">
        <form className="user-form" onSubmit={(e) => handleSubmit(e)}>
          <p className="u-name">Edit User</p>
          <div className="u-input">
            <span>
              <label htmlFor="name">Name</label>
            </span>
            <span className="u-icon">
              <PersonIcon />
            </span>
            <br></br>
            <input type="text" id="name" name="name" value={name} onChange={(e) => { onInputChange(e); }} required></input>
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
            <input type="email" id="email" name="email" value={email} onChange={(e) => { onInputChange(e); }} required></input>
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
            <input type="text" id="mobileno" name="mobileno" value={mobileno} onChange={(e) => { onInputChange(e); }} required></input>
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
            <input type={typesgn1} id="password" name="password" value={password} onChange={(e) => { onInputChange(e); }} required></input>
            <div className="screen4" id="screen4"></div>
          </div>
          <div className="u-btn1">
            <button type="submit" className="u-btn">
              Edit User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edituser;
