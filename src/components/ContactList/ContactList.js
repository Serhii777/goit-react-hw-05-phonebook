import React from "react";
import PropTypes from "prop-types";
import ContactListItem from "./ContactListItem";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./ContactList.module.css";
import contactFade from "../Animation/ContactFade.module.css";

const ContactList = ({ contacts, onRemoveTask }) => {
  return (
    <div className={styles.contactWrapper}>
      <TransitionGroup component="ul" className={styles.contactList}>
        {contacts.map(({ id, name, number }) => (
          <CSSTransition key={id} timeout={250} classNames={contactFade}>
            <ContactListItem
              key={id}
              name={name}
              number={number}
              onRemove={() => onRemoveTask(id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
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
  number: "",
};

export default ContactList;
