const contacts = require('../models/contacts');
const errorHandler = require('../helpers/errorHandler');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getContactsList = async (req, res) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json(contactsList);
};

const getContactById = async (req, res) => {
  const contactById = await contacts.getContactById(req.params.id);
  if (!contactById) {
    throw errorHandler(404, 'Not found');
  }
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const removedContact = await contacts.removeContact(req.params.id);

  if (!removedContact) {
    throw errorHandler(404, 'Not found');
  }

  res.status(200).json({ message: 'contact deleted' });
};

const updateContact = async (req, res) => {
  const updatedContact = await contacts.updateContact(req.params.id, req.body);

  if (!updatedContact) {
    throw errorHandler(404, 'Not found');
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  getContactsList: ctrlWrapper(getContactsList),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
