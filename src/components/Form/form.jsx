import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './form.module.css';
class Form extends Component {
  static propTypes = {
    addContact: PropTypes.func,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  state = {
    name: '',
    number: '',
  };
  // Перевірка валідності введених значень в поля вводу, pattern в input react виникає помилка
  isValidName = data => {
    const patternName =
      /^([a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;
    return patternName.test(data);
  };
  isValidNumber = data => {
    const patternNumber =
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
    return patternNumber.test(data);
  };
  // Функція обробки відправки форми
  handleSubmit = evt => {
    // Відміняємо дії браузера за замовчуванням
    evt.preventDefault();
    // Диструктуризуємо state
    const { name, number } = this.state;
    // Перевіряємо валідність введених значень
    if (!this.isValidName(name) || !this.isValidNumber(number)) {
      alert('Fields must by filled corectly!!!');
      return;
    }
    // Перевіряємо повторне введення імені контакту
    if (this.contactIsPresent(name)) {
      alert(`Contact with name "${name}" already exists.`);
      return;
    }
    // Виклик функції додавання контакта в state app
    this.props.onSubmit(name, number);
    // Очищаємо поля вводу
    this.reset();
  };
  // Функція перевірки повторного вводу імені контакту в записник
  contactIsPresent = name => {
    return this.props.contacts.some(contact => contact.name === name);
  };
  // Функція контролю введених значень в поля імені та номеру телефону
  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };
  // Функція очистки полів вводу
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={css.formData} onSubmit={this.handleSubmit}>
        <label>
          {'Name  '}
          <input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            className={css.inputData}
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          {'Phone  '}
          <input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            className={css.inputNumber}
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit" className={css.submitButton}>
          Add contact
        </button>
      </form>
    );
  }
}
export default Form;
