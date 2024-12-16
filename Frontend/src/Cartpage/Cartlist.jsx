import { useContext } from "react";
import { Cart } from "../Context";
import "./Cartlist.css";
import DeleteIcon from "@mui/icons-material/Delete";

const Cartlist = ({ books, cartindex }) => {
  const { cart, setCart } = useContext(Cart);

  return (
    <div className="clist-cont">
      <div className="clist-img">
        <img src={books.imgsrc} alt={books.name} loading="lazy"></img>
      </div>
      <div className="clist-body">
        <div className="clist-name">{books.name}</div>
        <div className="clist-price">
          <span>₹</span>
          {books.price}
        </div>
        <div className="clist-count">

          <button className="c-minus" onClick={() => {
            if (Number(books.quantity) > 1) {
              const _cart = cart.map((books, index) => {
                return cartindex === index ? { ...books, quantity: Number(books.quantity) - 1 } : books
              })
              setCart(_cart)
            }
          }}
          >-</button>
          <p>{books.quantity}</p>
          <button className="c-plus" onClick={() => {
            const _cart = cart.map((books, index) => {
              return cartindex === index ? { ...books, quantity: Number(books.quantity) + 1 } : books
            })
            setCart(_cart)
          }}>+</button>

        </div>
      </div>
      <div className="clist-body1">
        <div title="Remove">
          <DeleteIcon className="i-cart1" sx={{ fontSize: 30 }} onClick={() => { setCart(cart.filter((c) => c.id !== books.id)); }} />
        </div>
        <div className="clist-tprice">
          <span>₹</span>{books.price * books.quantity}
        </div>
      </div>
    </div>
  );
};

export default Cartlist;
