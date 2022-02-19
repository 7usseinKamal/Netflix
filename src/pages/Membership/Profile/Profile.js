import React from "react";
import downloadGif from "../../../components/assets/download-icon.gif";

import classes from "./Profile.module.css";

const Profile = ({ h1, p, src, boxshot }) => {
  return (
    <div className={`${classes.profile} container-fluid px-5`}>
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-5">
          <img className={classes.image} src={src} alt={src} />
          {boxshot && (
            <div className={`${classes.box} py-1 px-2 d-flex align-items-center`}>
              <img src={boxshot} alt="Box-shot" />
              <div
                className={`${classes.download} d-flex flex-column justify-content-center ms-3`}
              >
                <h6>Stranger Things</h6>
                <p>Downloading...</p>
              </div>
              <img className={classes.gif} src={downloadGif} alt="Download" />
            </div>
          )}
        </div>
        <div className="col-lg-6 col-md-12">
          <h1 className="fw-bold">{h1}</h1>
          <p>{p}</p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
