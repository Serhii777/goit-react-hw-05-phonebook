import React from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./MainTitle.module.css";
import appearTitle from "../Animation/AppearTitle.module.css";

const MainTitle = () => {
  return (
    <CSSTransition
      in={true}
      appear
      timeout={500}
      classNames={appearTitle}
      unmountOnExit>
      <h1 className={styles.mainTitle}>Phonebook</h1>
    </CSSTransition>
  );
};

export default MainTitle;
