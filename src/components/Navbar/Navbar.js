import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

import { GiHamburgerMenu } from "react-icons/gi";
import { ImSearch } from "react-icons/im";
import { IoMdNotifications, IoMdArrowDropdown } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";

import logo from "../assets/Netflix-Logo.png";
import Hlogo from "../assets/H.jpg";

import classes from "./Navbar.module.css";
import Input from "./Input";

// navbar routes data
let navbarList = [
  { title: "Home", path: "home" },
  { title: "TV Shows", path: "tv-shows" },
  { title: "Movies", path: "movies" },
  { title: "My List", path: "my-list" },
];

const Navbar = () => {
  // state to toggle options menu
  const [showOptions, setShowOptions] = useState(false);

  // toggle nav links
  const [showNav, setShowNav] = useState(false);

  // state to toggle search input
  const [toggleInput, setToggleInput] = useState();

  // state to change background when scroll
  const [isScroll, setIsScroll] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get email response
  const email = useSelector((state) => state.auth.email);

  // logout function
  const logoutHandler = () => {
    dispatch(authActions.logoutHandler());
    navigate("/logout", { replace: true });
  };

  // render nav lists
  const setNavList = navbarList.map((item, index) => {
    return (
      <li key={index}>
        <NavLink
          className={(navData) => (navData.isActive ? classes.active : "")}
          to={`/${item.path}`}
        >
          {item.title}
        </NavLink>
      </li>
    );
  });

  // function to show nav links
  const toggleNavHandler = () => {
    setShowNav((prevShow) => !prevShow);
  };

  // function to toggle options menu
  const toggleMenu = () => {
    setShowOptions((prevClick) => !prevClick);
  };

  // const show search input
  const showInputHandler = () => {
    setToggleInput((prevClick) => !prevClick);
  };

  // change background when scroll
  useEffect(() => {
    const changePosition = () => {
      if (window.scrollY > 80) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    };

    // trigger function
    window.addEventListener("scroll", changePosition);

    return () => window.removeEventListener("srcoll", changePosition);
  }, []);

  const changeNavClass = isScroll ? classes.scroll : "";

  // flex collection styles
  const styles =
    "d-flex align-items-center justify-content-between text-capitalize";

  // flex redundnt styles
  const dFlexStyles = "d-flex align-items-center";

  return (
    <nav className={`${classes.nav} ${changeNavClass} pt-3`}>
      <ul className="d-flex justify-content-between">
        <div className={`${classes.right} ${dFlexStyles}`}>
          <GiHamburgerMenu
            className={classes.icon}
            onClick={toggleNavHandler}
          />
          <li>
            <Link to="/home" className="mx-3">
              <img src={logo} alt="Netflix Logo" />
            </Link>
          </li>
          <div
            className={`${classes.links} ${
              showNav ? classes["show-links"] : ""
            } d-flex`}
          >
            <div className={`${classes.block} d-flex flex-column`}>
              <span className={`${classes["user-info"]}`}>
                <img src={Hlogo} alt="H" />
                <small className="ms-2">{email}</small>
              </span>
              <button
                type="button"
                className="my-2 text-capitalize"
                onClick={logoutHandler}
              >
                logout of netflix
              </button>
            </div>
            {setNavList}
          </div>
        </div>
        <div className={`${classes.left} ${dFlexStyles} me-5`}>
          {/* search input */}
          <Input toggle={toggleInput} />
          {/* end search input */}
          <ImSearch className={classes.search} onClick={showInputHandler} />
          <IoMdNotifications className={classes.not} />
          <span
            className={`${classes["user-info"]} ${classes.blockTwo} ${dFlexStyles} ms-3`}
            onClick={toggleMenu}
          >
            <img src={Hlogo} alt="H" />
            <IoMdArrowDropdown />
          </span>
        </div>
      </ul>
      {/*logout menu*/}
      {showOptions && (
        <div className={`${classes.options} d-flex flex-column p-1`}>
          <abbr className={`${styles} mb-1`} title={email}>
            email <MdAlternateEmail />
          </abbr>
          <button type="button" className={styles} onClick={logoutHandler}>
            logout
            <FiLogOut />
          </button>
        </div>
      )}
      {/*end menu*/}
    </nav>
  );
};

export default Navbar;
