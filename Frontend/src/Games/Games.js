import React from "react";
import { Routes, Route } from 'react-router-dom';
import Sidebar from "./Sidebar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import MathPuzzles from "../Games/MathPuzzles";
import TicTacToe from "../Games/TicTacToe";

const Games = () => {
  return (
    <section>
      <Navbar darkTheme={true} />
      <div className="games-container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/TicTacToe" element={<TicTacToe />} />
            <Route path="/MathPuzzles" element={<MathPuzzles />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Games;
