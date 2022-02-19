import intro from "../../components/assets/Netflix Intro.mp4";
import BackArrow from "../../components/UI/BackArrow";

import classes from "./Watch.module.css";

const Watch = () => {
  return (
    <div className={classes.watch}>
      <BackArrow />
      <video src={intro} controls />
    </div>
  );
};

export default Watch;
