import React, { Component } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import Container from "./Container";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

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
  };

  componentDidMount() {
    const persistedNumber = localStorage.getItem("number");

    if(persistedNumber){
      this.setState({
        contacts: JSON.parse(persistedNumber)
      })
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

    return contacts.filter(({name}) =>
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
      return contacts.find(({name}) => name === newContact.name);
    };

    let newContactUnique = isNewContactUnique();

    this.setState((prevState) => {
      return !newContactUnique
        ? { contacts: [...prevState.contacts, newContact] }
        : window.alert(`${newContact.name} is already in contacts.`);
    });
  };

  checkExistName = (text) => {
    console.log(text);
  };

  removeTask = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(
          ({id}) => id !== contactId
        ),
      };
    });
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <h1 className="container-title">Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />

        <h2 className="container-title">Contacts</h2>
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        {visibleContacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onRemoveTask={this.removeTask}
          />
        )}
      </Container>
    );
  }
}

export default App;
