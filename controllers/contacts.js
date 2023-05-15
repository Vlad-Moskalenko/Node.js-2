const { Contact } = require('../models/contact');
const errorHandler = require('../helpers/errorHandler');
const ctrlWrapper = require('../helpers/ctrlWrapper');

const getContactsList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;

  const contactsList = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip: (page - 1) * limit,
    limit: limit,
  }).populate('owner', 'name email');

  res.status(200).json(contactsList);
};

const getContactById = async (req, res) => {
  const contactById = await Contact.findById(req.params.id);

  if (!contactById) {
    throw errorHandler(404, 'Not found');
  }
  res.status(200).json(contactById);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

const removeContact = async (req, res) => {
  const removedContact = await Contact.findByIdAndRemove(req.params.id);

  if (!removedContact) {
    throw errorHandler(404, 'Not found');
  }

  res.status(200).json({ message: 'contact deleted' });
};

const updateContact = async (req, res) => {
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (!updatedContact) {
    throw errorHandler(404, 'Not found');
  }

  res.status(200).json(updatedContact);
};

const updateFavorite = async (req, res) => {
  if (req.body?.favorite === undefined) {
    throw errorHandler(400, 'missing field favorite');
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });

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
  updateFavorite: ctrlWrapper(updateFavorite),
};
