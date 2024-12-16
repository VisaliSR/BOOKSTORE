import { useContext } from "react";
import { Cart } from "../Context";
import Cartlist from "./Cartlist";
import "./Cartpage.css";
import Navbar from "../Navbar/Navbar";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";

const Cartpage = () => {
  const { cart } = useContext(Cart);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/invoice");
  };

  return (
    <>
      <div className="cart-parent">
        <Navbar />
        <div className="cart-cont1">
          <br></br>
          <p>Cart</p>
          <br></br>
          <div className="cart-cont">
            {
              cart.map((books, cartindex) => (<Cartlist books={books} cartindex={cartindex} key={books.id} />))
            }
          </div>
        </div>
        <div className="cart-foot">
          <div className="cart-foot1">
            <div>
              <button className="porder" onClick={(e) => {
                if (cart.length === 0) { alert("Cart is Empty"); } else { handleSubmit(e); }
              }}>Place Order</button>
            </div>
            <div className="cart-tot">
              <h5>Total</h5><span>₹ <p>
                {
                  cart && cart.map(books => books.price * books.quantity).reduce((total, value) => total + value, 0)
                }
              </p></span>
            </div>
          </div>
        </div>
      </div>
      <div className="c-home-icon1">
        <div className="c-home-icon">
          <Link to="/">
            <HomeIcon className="c-home" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Cartpage;
