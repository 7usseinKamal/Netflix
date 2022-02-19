import classes from "./Lost.module.css";
import logo from "../../components/assets/Netflix-Logo.png";
import { useNavigate } from "react-router-dom";

const Lost = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const transportHandler = () => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/register");
    }
  };

  return (
    <div
      className={`${classes.lost} d-flex flex-column justify-content-center`}
    >
      <nav className="d-flex align-items-center ps-5">
        <img src={logo} alt="Netflix Logo" />
      </nav>
      <div className={`${classes.container} text-center`}>
        <h1>Lost your way?</h1>
        <p className="fs-4 my-4">
          Sorry, we can't find that page. You'll find lots of explore on the
          home page.
        </p>
        <button
          className="py-2 px-3 text-capitalize"
          type="button"
          onClick={transportHandler}
        >
          netflix home
        </button>
        <div className={`${classes.code} mt-4 fs-4`}>
          <span className="text-capitalize me-2">error code</span>
          <code>NSES-404</code>
        </div>
      </div>
    </div>
  );
};

export default Lost;
