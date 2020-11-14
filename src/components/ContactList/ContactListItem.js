import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactListItem = ({ name, number, onRemove }) => {
  return (
        <li className={styles.contactItem}>
        <p className={styles.contactName}>{name}:</p>
        <span className={styles.contactNumber}>{number}</span>
        <button
          type="button"
          className={styles.contactButton}
          onClick={onRemove}>
          &#10006;
        </button>
      </li>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

ContactListItem.defaultProps = {
  name: "",
  number: "",
};

export default ContactListItem;
