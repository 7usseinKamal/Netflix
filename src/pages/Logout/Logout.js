import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Logout.module.css";

import logo from "../../components/assets/Netflix-Logo.png";
import SignButton from "../../components/UI/SignButton";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let timeOut = setTimeout(() => {
      navigate("/register", { replace: true });
    }, 30000);

    return () => clearTimeout(timeOut);
  }, [navigate]);

  const redirectHandler = () => {
    navigate("/register", { replace: true });
  };

  return (
    <div className={classes.logout}>
      <nav className="py-4 px-5">
        <ul className="d-flex justify-content-between align-items-center">
          <li>
            <Link to="/register">
              <img src={logo} alt="Netflix Logo" />
            </Link>
          </li>
          <li>
            <SignButton
              path="/login"
              title="sign in"
              classes="py-1 px-3 text-capitalize"
            />
          </li>
        </ul>
        <div className={classes.card}>
          <h2 className="mb-4">Leaving So Soon?</h2>
          <p>
            Just so you know, you don't always need to sign out of Netflix. It's
            only necessary if you're on a shared or public computer.
          </p>
          <p>You'll be redirected to Netflix.com in 30 seconds.</p>
          <button
            type="button"
            className="py-2 text-capitalize"
            onClick={redirectHandler}
          >
            go now
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Logout;

/**Leaving So Soon?
Just so you know, you don’t always need to sign out of Netflix. It’s only necessary if you’re on a shared or public computer.

You’ll be redirected to Netflix.com in 30 seconds. */
