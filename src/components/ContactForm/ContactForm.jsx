
import { useState } from 'react';

export const ContactForm = ({ handleAddContact }) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    /*     const value = evt.target.value;
        
          const name = evt.target.name; */

    if (evt.target.name === 'name') {
      setName(evt.target.value);
    } else if (evt.target.name === 'number') {
      setNumber(evt.target.value);
    }
  };
 
  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    handleAddContact(name, number, resetForm);
  
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        required
        value={name}
        onChange={handleChange}
        pattern="^[A-Za-zА-Яа-яЇїІі\s]+$"
        title="You can enter only letters of the Latin and Cyrillic alphabets, as well as spaces."
      />
      <input
        type="tel"
        name="number"
        placeholder="Enter number"
        required
        value={number}
        onChange={handleChange}
        pattern="^(\+?\d+){5,12}$"
        title="Phone number must start with '+' (optional) and contain only digits. Length: 5-12 characters."
      />
      <button type="submit">
        Add contact
      </button>
    </form>
  );
};