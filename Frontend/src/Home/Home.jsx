import { Suspense, lazy } from "react";
import Loader from "./Loader/Loader";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Home = () => {
  const Bookpage = lazy(() => import("./Bookpage"));

  return (
    <div className="home-container1">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Bookpage />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
