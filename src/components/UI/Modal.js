import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { movieActions } from "../store/movie-slice";
import logo from "../assets/Netflix-Logo.png";

import { FaPlay } from "react-icons/fa";
import { BiCheck } from "react-icons/bi";
import { MdOutlineAdd } from "react-icons/md";
import { CgFileRemove } from "react-icons/cg";
import { RiArrowGoBackFill } from "react-icons/ri";

import classes from "./Modal.module.css";

const Modal = ({ index, setModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // get item details
  const items = useSelector((state) => state.movies.objectsDetails);
  const singleItem = items[index];

  // navigate to watch page
  const watchHandler = () => {
    document.body.style.overflowY = "scroll";
    navigate("/watch");
  };

  // add item to list
  const addToListHandler = (id) => {
    dispatch(movieActions.setListHandler({ id, index }));
  };

  // remove item from list
  const removeListHandler = (id) => {
    if (location.pathname.slice(1) === "my-list") {
      setModal(false);
    }
    dispatch(movieActions.removeItemfromList({ id, index }));
  };

  // close modal
  const closeModalHandler = () => {
    setModal(false);
    document.body.style.overflowY = "scroll";
  };

  // classes
  const dStyles = "d-flex align-items-center";

  // text capitalize class
  const txtCapitalize = "text-capitalize";

  return (
    <div className={classes.modal}>
      <nav className={`${dStyles} justify-content-center`}>
        <img src={logo} alt="Netflix logo" />
      </nav>
      <div className={classes["modal-item"]}>
        <img src={singleItem.image} alt={singleItem.title} />
        <div
          className={`${classes.container} ${dStyles} ${txtCapitalize} flex-column`}
        >
          <h2 className="text-center">{singleItem.title}</h2>
          <div className="d-flex m-auto">
            <p>{singleItem.release}</p>
            <p className={`${classes.type} mx-3 px-1`}>{singleItem.type}</p>
            <p>{singleItem.time}</p>
          </div>
        </div>
        <div className={`${classes.watch} my-3 mx-5 d-flex`}>
          <button
            type="button"
            className={`${txtCapitalize} py-3`}
            onClick={watchHandler}
          >
            <FaPlay className="me-2" /> play
          </button>
          <button
            type="button"
            onClick={addToListHandler.bind(null, singleItem.id)}
            disabled={singleItem.inList}
            className={`${
              singleItem.inList ? classes.check : ""
            } ${txtCapitalize}`}
          >
            {!singleItem.inList ? (
              <MdOutlineAdd className="me-2" />
            ) : (
              <BiCheck className="me-2" />
            )}{" "}
            my list
          </button>
          {singleItem.inList && (
            <button
              type="button"
              onClick={removeListHandler.bind(null, singleItem.id)}
            >
              <abbr title="Remove from list">
                <CgFileRemove />
              </abbr>
            </button>
          )}
        </div>
        <button
          type="button"
          className={`${classes.back} ${txtCapitalize} py-4`}
          onClick={closeModalHandler}
        >
          <RiArrowGoBackFill /> back to browse
        </button>
      </div>
    </div>
  );
};

export default Modal;
