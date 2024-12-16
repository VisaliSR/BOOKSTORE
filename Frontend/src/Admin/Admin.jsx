import { useEffect, useState } from "react";
import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";

const Admin = () => {

  const [userdetails, setUserdetails] = useState([]);

  useEffect(() => {
    loadUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadUserDetails = async () => {
    const result = await axios.get("http://localhost:8080/user/getall");
    setUserdetails(result.data);
  }

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/delete/${id}`);
    toast.success("Deleted Successfully")
    loadUserDetails();
  }

  return (
    <>
      <Navbar />
      <div className="adm-bdy">
        <div className="adm-nav">
          <Link className="n-link" to="/adduser">
            <button>Add User</button>
          </Link>
        </div>
        <ToastContainer />
        <div className="adm-table1">
          <div className="adm-table">
            <table>
              <tbody>
                <tr>
                  <td className="m-head" colSpan="7">User Details</td>
                </tr>
                <tr>
                  <th>S No.</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Password</th>
                  <th>CRUD</th>
                </tr>
                {
                  userdetails && userdetails.map((userdetail, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{userdetail.id}</td>
                      <td>{userdetail.name}</td>
                      <td>{userdetail.email}</td>
                      <td>{userdetail.mobileno}</td>
                      <td>{userdetail.password}</td>
                      <td>
                        <Link to={`/viewuser/${userdetail.id}`}><button value={userdetail.id} className="adm-btn" title="view">View</button></Link>
                        <Link to={`/edituser/${userdetail.id}`}><button value={userdetail.id} className="adm-btn btn" title="Edit">Edit</button></Link>
                        <button onClick={(e) => deleteUser(userdetail.id)} className="adm-btn" title="Delete">Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin;