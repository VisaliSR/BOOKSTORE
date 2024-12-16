import { useContext, useEffect, useState } from "react";
import "./Bookpage.css";
import SearchIcon from "@mui/icons-material/Search";
import Singlebook from "./Singlebook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { Cart } from "../Context";
import axios from "axios";

const Bookpage = () => {

  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      setActiveBtn(e);
    });
  });
  function setActiveBtn(e) {
    buttons.forEach((button) => {
      button.classList.remove("clicked");
    });
    e.target.classList.add("clicked");
  }

  // const buttons1 = document.querySelectorAll(".btn1");
  // buttons1.forEach((button) => {
  //   button.addEventListener("click", (e) => {
  //     setActiveBtn1(e);
  //   });
  // });
  // function setActiveBtn1(e) {
  //   buttons1.forEach((button) => {
  //     button.classList.remove("clicked");
  //   });
  //   e.target.classList.add("clicked");
  // }

  const pagebtns = document.querySelectorAll(".h-page");
  pagebtns.forEach((pagebtn) => {
    pagebtn.addEventListener("click", (e) => {
      setActivepagebtn(e);
    });
  });
  function setActivepagebtn(e) {
    pagebtns.forEach((pagebtn) => {
      pagebtn.classList.remove("clicked");
    });
    e.target.classList.add("clicked");
  }

  const paging = "http://localhost:8080/paging/12/"
  const asc = "http://localhost:8080/pagingAndSorting/price/12/";
  const desc = "http://localhost:8080/pagingAndreverseSorting/price/12/";

  const [books, setBooks] = useState([]);
  const { cart } = useContext(Cart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [agecategory, setAgeCategory] = useState("");
  const [pageno, setPageno] = useState("0");
  const [url, setUrl] = useState(paging);

  useEffect(() => {
    booksList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const booksList = async () => {
    const link = url + pageno;
    const result = await axios.get(link);
    setBooks(result.data);
  };


  function sortfunction(e) {
    var option = e.target.value;
    if (option === "paging") {
      setUrl(paging);
      booksList();
    }
    else if (option === "desc") {
      setUrl(desc);
      booksList();
    }
    else if (option === "asc") {
      setUrl(asc);
      booksList();
    }
  }
  console.table(books);
  

  return (
    <>
      <div className="cont1">
        <div className="search1">
          <span className="search-icon">
            <SearchIcon sx={{ fontSize: 30 }} />
          </span>
          <input type="text" placeholder="Search" className="search" onChange={(e) => setSearch(e.target.value)}></input>
        </div>
        <div className="options">
          <div className="filter1">
            <button className="btn clicked" onClick={() => setCategory("")}>All</button>
            <button className="btn " onClick={() => setCategory("Fiction")}>Fiction</button>
            <button className="btn " onClick={() => setCategory("Non")}>Non Fiction</button>
            <button className="btn " onClick={() => setCategory("Reference")}>Reference</button>
            <button className="btn " onClick={() => setCategory("Activities")}>Activities</button>
          </div>

          <div className="filter2">
            <button className="btn clicked" onClick={() => setAgeCategory("")}>All</button>
            <button className="btn " onClick={() => setAgeCategory("Kids")}>Kids</button>
            <button className="btn " onClick={() => setAgeCategory("Teens")}>Teens</button>
          </div>
          
          <div className="filter3">
            <select className="btn3 clicked" id="option-sort" onClick={(e) => sortfunction(e)} onChange={(e) => sortfunction(e)}>
              <option value="paging">Sort by</option>
              <option value="desc">Price: High to Low</option>
              <option value="asc">Price: Low to High</option>
            </select>
          </div>
        </div>
        <div className="cont">
          <div className="book-cont">
            {
              books && books.filter((books) =>
                books.name.toLowerCase().includes(search.toLowerCase().trim()) &&
                books.category.toLowerCase().includes(category.toLowerCase().trim()) &&
                books.agecategory.toLowerCase().includes(agecategory.toLowerCase().trim())
              ).map((books) => <Singlebook books={books} key={books.id} />)
            }
          </div>
        </div>
        <div className="h-pagecont">
          <div className="h-page clicked" onClick={() => { setPageno("0"); booksList(); }}>1</div>
          <div className="h-page" onClick={() => { setPageno("1"); booksList(); }} >2</div>
          <div className="h-page" onClick={() => { setPageno("2"); booksList(); }} >3</div>
          {/* <div className="h-page" onClick={() => { setPageno("3"); booksList(); }} >4</div>
          <div className="h-page" onClick={() => { setPageno("4"); booksList(); }} >5</div> */}
        </div>
      </div>
      <div className="h-cparent">
        <div className="livecount">{cart.length}</div>
        <div className="h-cart-count1">
          <div className="h-cart-count">
            <Link to="/cart">
              <ShoppingCartIcon className="h-ccount" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookpage;
