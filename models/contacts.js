const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

const getContactById = async contactId => {
  const contactsList = await listContacts();
  return contactsList.find(contact => contact.id === contactId);
};

const removeContact = async contactId => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return removedContact;
};

const addContact = async body => {
  const contactsList = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  contactsList.unshift(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contactsList[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
