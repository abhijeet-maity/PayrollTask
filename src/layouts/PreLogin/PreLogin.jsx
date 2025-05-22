import React from "react";
import styles from "./PreLogin.module.scss";
import { Outlet } from "react-router-dom";

const PreLogin = () => {
  return (
    <section className={styles.PreLogin}>
      <div className={styles.leftSection}>
        <div className={styles.textSection}>
            <h2>Daily Employee attendance tracking</h2>
            <p>Application allows you to monitor your employee’s Check-In, Check-Out time and attendance from anywhere and at any time.</p>
        </div>
      </div>
      <div className={styles.rightSection}>
        <Outlet/>
      </div>
    </section>
  );
};

export default PreLogin;
