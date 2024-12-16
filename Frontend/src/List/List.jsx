import "./List.css";
import Navbar from "../Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";

const Menu = () => {

  const [Books, setbooks] = useState([]);

  useEffect(() => {
    bookList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bookList = async () => {
    const result = await axios.get("http://localhost:8080/getAllbooks");
    setbooks(result.data);
  }

  let i1=1;

  return (
    <>
      <div className="m-body">
        <Navbar />
        
        <div className="m-table1">
          <div className="m-table">
            <table>
              <thead>
                <tr>
                  <th colSpan="5">Books</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>S.No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Age Category</th>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
                {Books && Books.map((book) => {
                    return (
                      <tr key={i1}>
                        <td>{i1++}</td>
                        <td><img className="t-img" src={book.imgsrc} alt={book.name} /></td>
                        <td>{book.name}</td>
                        <td>{book.agecategory}</td>
                        <td>{book.category}</td>
                        <td>{book.price}</td>
                      </tr>
                    );
                  })}
              </tbody>

              
            </table>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Menu;