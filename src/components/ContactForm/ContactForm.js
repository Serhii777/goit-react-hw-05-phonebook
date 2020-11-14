import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ContactForm.css";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value  } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAddContact(this.state);

    this.setState({ name: "", number: "" });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label className="form-label">
          Name
          <input
            className="form-input"
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Annie Copeland"
            required
          />
        </label>
        <label className="form-label">
          Number
          <input
            className="form-input"
            type="text"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            placeholder="227-91-26"
            required
          />
        </label>

        <button type="submit" className="form-button">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
};

ContactForm.defaultProps = {
  name: "",
  number: '',
};

export default ContactForm;
