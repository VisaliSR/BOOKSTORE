import { useContext, useEffect, useState } from "react";
import { Cart } from "../Context";
import './Invoice.css';
import Logo from "../assets/foodiKo.png";
import { Link } from "react-router-dom";
import ReactToPrint from "react-to-print";
import axios from "axios";

const Invoice = () => {

  var chars = "0123456789qwertyuiopasdfghjklzxcvbnm";
  var idlength = 8;
  var order_id = "";
  for (var j = 0; j <= idlength; j++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    order_id += chars.substring(randomNumber, randomNumber + 1);
  }

  const { cart } = useContext(Cart);
  let i = 1;
  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  var hours = new Date().getHours();
  var min = new Date().getMinutes();
  var sec = new Date().getSeconds();
  var componentRef;
  
  const [user, setUser] = useState({});
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/profile/${userId}`);
    setUser(result.data);
  };

  return (
    <>
      <div className="inv-cont1">
        <div className="inv-cont" id="inv-download" ref={el => (componentRef = el)}>
          <div className="inv-header1">
            <div className="inv-homeimg">
              <h1 className="inv-homelogo" >BookSociety</h1>
            </div>
            <h2 style={{ color: "var(--pri-col)" }}>Invoice</h2>
          </div>
          <div className="inv-header2">
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p>Date : {date} / {month} / {year}</p>
              <p>Time : {hours} : {min} : {sec}</p>
            </div>
          </div>
          <hr />
          <div className="inv-oid">Order id : {order_id}</div>
          <table className="inv-books">
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {
              cart.length ? cart.map((books) => {
                return (
                  <tr key={books.id}>
                    <td>{i++}</td>
                    <td>{books.name}</td>
                    <td>{books.price}</td>
                    <td>{books.quantity}</td>
                    <td>{books.price * books.quantity}</td>
                  </tr>
                )
              }) : (<div style={{ minHeight: "200px" }}></div>)
            }
          </table>
          <hr />
          <div className="inv-cost1">
            <table className="inv-cost">
              <tr>
                <td>Sub Total<span style={{ fontFamily: "sans-serif" }}>₹</span></td>
                <td className="inv-cvalue">
                  {
                    cart && cart.map(books => books.price * books.quantity).reduce((total, value) => total + value, 0)
                  }
                </td>
              </tr>
              <tr>
                <td>Discount<span style={{ fontFamily: "sans-serif" }}>₹</span></td>
                <td className="inv-cvalue">0</td>
              </tr>
              <tr>
                <td>GST<span style={{ fontFamily: "sans-serif" }}>₹</span></td>
                <td className="inv-cvalue">0</td>
              </tr>
              <tr>
                <td>Total<span style={{ fontFamily: "sans-serif" }}>₹</span></td>
                <td className="inv-cvalue">
                  {
                    cart && cart.map(books => books.price * books.quantity).reduce((total, value) => total + value, 0)
                  }
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="inv-navbar">
          <Link className="link" to="/"><button className="inv-navbtn">Home</button></Link>
          <ReactToPrint trigger={() => { return <button className="inv-navbtn">Print</button> }} content={() => componentRef} documentTitle={order_id} pageStyle="print" />
        </div>
      </div>
    </>
  )
}

export default Invoice;