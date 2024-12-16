import "./Singlebook.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { Cart } from "../Context";
import { useContext } from "react";

const Singlebook = ({ books }) => {

  const { cart, setCart } = useContext(Cart);

  return (
    <div className="book">
      <div className="img-cont">
        <img src={books.imgsrc} alt={books.name} loading="lazy"></img>
      </div>
      <div className="i-namerating">
        <div className="i-name">
          {books.name}
        </div>
        <div className="i-rating">
          <div>{books.rating}</div>
          <div>
            <StarRateRoundedIcon sx={{ color: "white", fontSize: 16, marginTop: "1px" }} />
          </div>
        </div>
      </div>
      <div className="i-time">
        <span></span>
      </div>
      <hr></hr>
      <div className="i-pricecart">
        <div className="i-price">
          <span>₹</span>
          {books.price}
        </div>
        <div className="i-cart" title="Add/Remove">
          {
            cart.includes(books) ? (
              <DeleteIcon className="i-cart1 i-cartdel" sx={{ fontSize: 30 }} onClick={() => { setCart(cart.filter((c) => c.id !== books.id)); }} />
            ) : (
              <AddBoxRoundedIcon className="i-cart1" sx={{ fontSize: 30 }} onClick={() => { setCart([...cart, books]); }} />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Singlebook;
