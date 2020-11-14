import React from "react";
import PropTypes from "prop-types";
// import { CSSTransition, TransitionGroup, SwitchTransition} from "react-transition-group";
import styles from "./ContactList/ContactList.module.css";

const Filter = ({ value, onChangeFilter }) => {
  return (
    <div className={styles.filterWrapper}>
      <label className={styles.filterLabel}>
        Find contacts by name
        <input
          type="text"
          className={styles.filterInput}
          value={value}
          onChange={(e) => onChangeFilter(e.target.value)}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
};

Filter.defaultProps = {
  value: "",
};

export default Filter;
