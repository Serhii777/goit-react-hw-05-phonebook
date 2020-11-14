import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  CSSTransition,
  // TransitionGroup,
  // SwitchTransition,
} from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import Container from "./Container";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
import Alert from "./Alert/Alert";
import styles from "./Container/Container.module.css";

class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
  };

  static defaultProps = {
    contacts: [{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" }],
    filter: "",
    name: "Annie Copeland",
    number: "227-91-26",
  };

  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
    name: "",
    number: "",
    newContactUnique: true,
    // newContactUnique: false
  };

  componentDidMount() {
    const persistedNumber = localStorage.getItem("number");

    if (persistedNumber) {
      this.setState({
        contacts: JSON.parse(persistedNumber),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("number", JSON.stringify(this.state.contacts));
    }
  }

  changeFilter = (filter) => {
    this.setState({ filter });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addContact = (data) => {
    let newContact = {
      id: uuidv4(),
      name: data.name,
      number: data.number,
    };

    const isNewContactUnique = () => {
      const { contacts } = this.state;
      return contacts.find(({ name }) => name === newContact.name);
    };

    let newContactUnique = isNewContactUnique();
    console.log(newContactUnique);
    
    this.setState((prevState) => {
      return !newContactUnique
      ? { contacts: [...prevState.contacts, newContact] }
      : // : window.alert(`${newContact.name} is already in contacts.`);
      {newContactUnique};
    });
    console.log(newContact.name);
    console.log(this.state.newContactUnique);
  };

  checkExistName = (text) => {
    console.log(text);
  };

  removeTask = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  render() {
    const { filter, newContactUnique } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <CSSTransition
          in={true}
          appear
          timeout={500}
          className={styles.title}
          unmountOnExit>
          <h1>Phonebook</h1>
        </CSSTransition>

        <ContactForm onAddContact={this.addContact} />

        <CSSTransition
          in={true}
          appear
          timeout={500}
          className={styles.title}
          unmountOnExit>
          <Alert newContactUnique={newContactUnique.name} />
        </CSSTransition>

        <h2 className={styles.containerTitle}>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.changeFilter} />

        <CSSTransition
          in={visibleContacts.length > 0}
          timeout={250}
          classNames={styles.contactListFade}
          unmountOnExit>
          {/* {visibleContacts.length > 0 && ( */}
          <ContactList
            contacts={visibleContacts}
            onRemoveTask={this.removeTask}
          />
          {/* )} */}
        </CSSTransition>
      </Container>
    );
  }
}

export default App;
