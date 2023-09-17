import React, { useState } from 'react';
import './App.css';
import contactsData from './contacts.json';

function App() {
  const [contactList, setContactList] = useState(contactsData.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contactsData.slice(5));

  const addRandomContact = () => {
    if (remainingContacts.length === 0) {
      alert('No hay más contactos disponibles.');
      return;
    }

    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    setContactList((prevContacts) => [...prevContacts, randomContact]);
    setRemainingContacts((prevRemainingContacts) =>
      prevRemainingContacts.filter((contact) => contact !== randomContact)
    );
  };

  const sortByName = () => {
    const sortedContacts = [...contactList].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setContactList(sortedContacts);
  };

  const sortByPopularity = () => {
    const sortedContacts = [...contactList].sort(
      (a, b) => b.popularity - a.popularity
    );
    setContactList(sortedContacts);
  };

  const removeContact = (name) => {
    const updatedContacts = contactList.filter((contact) => contact.name !== name);
    setContactList(updatedContacts);
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={addRandomContact}>Add Random Contact</button>
      <button onClick={sortByName}>Sort by Name</button>
      <button onClick={sortByPopularity}>Sort by Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact, index) => (
            <tr key={index}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{contact.wonOscar ? '🏆' : ''}</td>
              <td>{contact.wonEmmy ? '🏆' : ''}</td>
              <td>
                <button onClick={() => removeContact(contact.name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;