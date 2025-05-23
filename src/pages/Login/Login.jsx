import React from "react";
import styles from "./Login.module.scss";
import logo from "../../assets/FFC-logo.png";

const Login = () => {
  return (
    <div className={styles.LoginPage}>
      <div className={styles.headText}>
        <img src={logo} alt="logo" />
        <h4>Get Started with BETA Field Force</h4>
      </div>
      <div className={styles.inputSection}></div>
      <div classname={styles.buttonSection}></div>
    </div>
  );
};

export default Login;
