import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.scss";

import Container from "./components/Container";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import contactsList from "./contacts.json";
import Filter from "./components/Filter";

const App = () => {
  const [contacts, setContacts] = useState(contactsList);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parcedContacts = JSON.parse(contacts);

    if (parcedContacts) {
      setContacts(parcedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const alreadyFind = contacts.find((contact) => contact.name === name);

    alreadyFind
      ? alert(`${name} is already in contacts.`)
      : setContacts((prevState) => [contact, ...prevState]);
  };

  const findContact = (event) => {
    setFilter(event.target.value);
  };

  const getFilterContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));
  };

  return (
    <Container>
      <h1 className={styles.Title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={styles.Title}>Contacts</h2>
      <Filter value={filter} onFindContact={findContact} />
      <ContactList
        onFilteredContacts={getFilterContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};

export default App;
