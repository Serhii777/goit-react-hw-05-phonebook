import React from "react";
import stylesAlert from "./Alert.module.css";

const Alert = ({ newContactUnique, timeout }) => {
  setTimeout(timeout, 2500);

  return (
    <div className={stylesAlert.alertWrapper}>
      <p className={stylesAlert.alertText}>
        This {newContactUnique} is already exist!
      </p>
    </div>
  );
};

export default Alert;
