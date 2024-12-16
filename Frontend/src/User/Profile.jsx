import "./Profile.css";
import userLogo from "../assets/user-logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {

  const [user, setUser] = useState({});
  let userId = localStorage.getItem("userId");

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const navigate = useNavigate();
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/profile/${userId}`);
    setUser(result.data);
  };
  return (
    <div className="p-body">
      <Navbar />
      <ToastContainer />
      <div className="p-cont">
        <div className="p-txt"><span>Hello</span ><span>{user.name}</span> </div>
        <div className="p-cont1">
          <div className="p-userlogo">
            <img src={userLogo} alt="user-logo" />
          </div>
          <table className="p-table">
            <tbody>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Mobile No</td>
                <td>{user.mobileno}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-logout">
          <button className="p-lgbtn" onClick={async () => {
            localStorage.clear();
            sessionStorage.clear();
            toast.success("Logout Successfully");
            await timeout(2000);
            navigate("/login");
          }}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;