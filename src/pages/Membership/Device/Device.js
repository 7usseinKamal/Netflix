import React from "react";

import classes from "./Device.module.css";

const Device = ({ h1, p, src }) => {
  return (
    <div className={`${classes.device} container-fluid px-5`}>
      <div className="row">
        <div className="col-lg-6 col-md-12">
          <h1 className="fw-bold">{h1}</h1>
          <p>{p}</p>
        </div>
        <div className="col-lg-6 col-md-12 mb-5">
          <video
            className={classes.video}
            autoPlay={true}
            muted={true}
            loop={true}
          >
            <source src={src} />
          </video>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Device);
