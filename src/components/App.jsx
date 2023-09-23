import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import Form from './Form/form';
import { ContactList } from './ContactList/contactList';
import { Filter } from './Filter/filter';

class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
    addContact: PropTypes.func,
    changeFilter: PropTypes.func,
    visibleList: PropTypes.func,
    handleDelete: PropTypes.func,
  };

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Dart Weider', number: '123-45-67' },
    ],
    filter: '',
  };
  // Функція додавання контактів в state
  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  // Збереження даних в поле фільтр
  changeFilter = evt => {
    this.setState({ filter: evt.currentTarget.value });
  };
  // Отримаємо масив даних з урахуванням даних в полі фільтр
  visibleList = () => {
    const normalizedfilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };
  // Видалення збереженого контакта
  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const onVisibleList = this.visibleList();
    return (
      <>
        <h1>Phonebook</h1>
        <Form onSubmit={this.addContact} contacts={this.state.contacts} />

        <h2>Contact list</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          contacts={onVisibleList}
          onHandleDelete={this.handleDelete}
        />
      </>
    );
  }
}
export default App;
