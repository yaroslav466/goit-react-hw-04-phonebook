import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useEffect } from 'react';
import { useState } from 'react';

const exampleConact = [
  { id: 'id-1', name: 'Example Contact', number: '123-456-789' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    const parsedContacts =
      JSON.parse(localStorage.getItem('contacts')) ?? exampleConact;
    return parsedContacts;
  });



  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);



  const handleAddContact = (name, number, resetForm) => {

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert(`A contact with the name "${name}" already exists.`);
      return;
    }

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };

    setContacts([...contacts, newContact]);
    resetForm(); 
  };

  const handleDeleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const handleFilterChange = evt => {
    setFilter(evt.target.value.toLowerCase());
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };


    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm handleAddContact={handleAddContact} />

        <h2>Contacts</h2>
        <Filter
          filter={filter}
          handleFilterChange={handleFilterChange}
        />
        <ContactList
          contacts={getFilteredContacts()}
          handleDeleteContact={handleDeleteContact}
        />
      </div>
    );
}