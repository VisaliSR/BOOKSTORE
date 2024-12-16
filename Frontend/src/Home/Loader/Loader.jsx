import "./Loader.css";

const Loader = () => {
  return (
    <div className="load-cont">
      <div className="load-spin">
        <div className="l-spin"></div>
        <div className="l-para">loading...</div>
      </div>
    </div>
  );
};

export default Loader;