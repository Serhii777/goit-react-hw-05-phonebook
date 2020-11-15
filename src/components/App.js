import React, { Component } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import { v4 as uuidv4 } from "uuid";
import Container from "./Container";
import MainTitle from "./MainTitle/MainTitle";
import Filter from "./Filter";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Alert from "./Alert/Alert";

import styles from "./Container/Container.module.css";

import fadeAlert from "./Animation/FadeAlert.module.css";
import fadeItems from "./Animation/FadeItems.module.css";

class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    newContactUnique: PropTypes.bool,
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
    newContactUnique: false,
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

    this.setState((prevState) => {
      return !newContactUnique
        ? { contacts: [...prevState.contacts, newContact] }
        : { newContactUnique: newContactUnique };
    });
  };

  removeTask = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  resetNewContactUnique = () =>
    setTimeout(this.setState({ newContactUnique: false }), 2000);

  render() {
    const { filter, newContactUnique } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <MainTitle />

        <ContactForm onAddContact={this.addContact} />

        <CSSTransition
          in={newContactUnique}
          appear
          timeout={300}
          classNames={fadeAlert}
          unmountOnExit>
          <Alert
            newContactUnique={newContactUnique.name}
            timeout={this.resetNewContactUnique}
          />
        </CSSTransition>

        <h2 className={styles.containerTitle}>Contacts</h2>

        <Filter value={filter} onChangeFilter={this.changeFilter} />

        <CSSTransition
          in={visibleContacts.length >= 1}
          timeout={300}
          classNames={fadeItems}
          unmountOnExit>
          <ContactList
            contacts={visibleContacts}
            onRemoveTask={this.removeTask}
          />
        </CSSTransition>
      </Container>
    );
  }
}

export default App;
