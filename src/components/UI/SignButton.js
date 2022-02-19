import { Link } from "react-router-dom";
import classes from "./SignButton.module.css";

const SignButton = (props) => {
  const styles = `${classes.card} ${props.classes}`;

  return (
    <Link to={props.path} className={styles}>
      {props.title}
    </Link>
  );
};

export default SignButton;
