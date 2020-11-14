import React from "react";
import PropTypes from "prop-types";
import ContactListItem from "./ContactListItem";
import "./ContactList.css";

const ContactList = ({contacts, onRemoveTask}) => {
  return (
    <div className="contact-wrapper">
      <ul className="contact-list">
        {contacts.map(({id, name, number}) => (
          <ContactListItem
          key={id}
          name={name}
          number={number}
          onRemove={()=> onRemoveTask(id)}
          />
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  props: PropTypes.exact({
    contacts: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};

ContactList.defaultProps = {
  id: "",
  name: "",
  number: '',
};

export default ContactList;
