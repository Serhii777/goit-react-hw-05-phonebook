import React from "react";
import PropTypes from "prop-types";

const ContactListItem = ({ name, number, onRemove }) => {
  return (
    <li className="contact-item">
      <p className="contact-name">{name}:</p>
      <span className="contact-number">{number}</span>
      <button
        type="button"
        className="contact-button"
        onClick={onRemove}
      >
        Delete
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
  number: '',
};

export default ContactListItem;
