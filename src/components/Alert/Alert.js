import React from "react";
// import moduleName from './Alert.module.css'

import "./Alert.css";

const Alert = ({ newContactUnique }) => {
  console.log(newContactUnique);
  //   console.log(newContactUnique.name);

  return (
    <div>
        <p>This {newContactUnique} is already in contacts.</p>
    </div>
  );
};

export default Alert;
