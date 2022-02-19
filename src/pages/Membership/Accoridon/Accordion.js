import { AiOutlinePlus } from "react-icons/ai";
import { accordionData } from "./accordion-data";

import classes from "./Accordion.module.css";

const Accordion = () => {
  const showAccordion = (e) => {
    const allDesc = [...document.getElementsByClassName(classes.desc)];
    const pluses = [...document.getElementsByClassName("plus")];

    // ** to close accordion **
    if (e.target.closest("button").nextElementSibling.style.maxHeight) {
      e.target.closest("button").nextElementSibling.style.maxHeight = null;
      e.currentTarget.children[0].classList.remove(classes.rotate);
      return;
    }

    // set height to null for all to add for current
    allDesc.forEach((elm) => {
      elm.style.maxHeight = null;
    });
    // remove all classes for all to add for current
    pluses.forEach((elm) => {
      elm.classList.remove(classes.rotate);
    });

    e.target.closest("button").nextElementSibling.style.maxHeight =
      e.target.closest("button").nextElementSibling.scrollHeight + "px";

    e.currentTarget.children[0].classList.add(classes.rotate);
  };

  const setAccData = accordionData.map((item) => {
    return (
      <li key={item.id} className={`${classes.list} mb-2`}>
        <button
          onClick={showAccordion}
          className="d-flex justify-content-between align-items-center py-3 px-5"
        >
          {item.head} <AiOutlinePlus className="plus" />
        </button>
        <div className={classes.desc}>
          <p className="py-4 px-5">{item.des}</p>
        </div>
      </li>
    );
  });

  return (
    <div className={`${classes.accordion} container-fluid py-5`}>
      <div className="row">
        <div className={`${classes.wrapper} col-lg-9 col-md-10 col-sm-12`}>
          <h1 className="text-center mb-5 text-capitalize">
            frequently asked questions
          </h1>
          <ul>{setAccData}</ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
