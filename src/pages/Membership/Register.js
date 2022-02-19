import { Fragment } from "react";
import logo from "../../components/assets/Netflix-Logo.png";
import Form from "./Form";

import watch from "../../components/assets/TV.mp4";
import device from "../../components/assets/Device.mp4";

import mobile from "../../components/assets/Mobile.jpg";
import boxshot from "../../components/assets/Boxshot.png";
import kids from "../../components/assets/Kids.png";

import Device from "./Device/Device";
import Profile from "./Profile/Profile";
import Accordion from "./Accoridon/Accordion";

import classes from "./Register.module.css";
import SignButton from "../../components/UI/SignButton";

const Register = () => {
  return (
    <Fragment>
      <div className={classes.register}>
        <header className="py-4 px-5">
          <nav>
            <ul className="d-flex justify-content-between align-items-center">
              <li>
                <img src={logo} alt="Netflix Logo" />
              </li>
              <li>
                <SignButton
                  path="/login"
                  title="sign in"
                  classes="py-1 px-3 text-capitalize"
                />
              </li>
            </ul>
          </nav>
          <div
            className={`${classes.form} d-flex flex-column align-items-center text-center`}
          >
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h3>Watch anywhere. Cancel anytime.</h3>
            <p className="fs-5 mt-4">
              Ready to watch? Enter your email to create your membership.
            </p>
            <Form />
          </div>
        </header>
      </div>
      <Device
        h1="Enjoy on your TV."
        p="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
        src={watch}
      />
      <Profile
        h1="Download your shows to watch offline."
        p="Save your favorites easily and always have something to watch."
        src={mobile}
        boxshot={boxshot}
      />
      <Device
        h1="Watch everywhere."
        p="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more."
        src={device}
      />
      <Profile
        h1="Create profiles for kids."
        p="Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
        src={kids}
      />
      <Accordion />
    </Fragment>
  );
};

export default Register;
