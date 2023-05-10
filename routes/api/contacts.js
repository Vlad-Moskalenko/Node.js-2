const express = require('express');
const router = express.Router();

const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contacts = require('../../models/contacts');
const errorHandler = require('../../helpers/errorHandler');

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    res.status(200).json(contactsList);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const contactById = await contacts.getContactById(req.params.id);
    if (!contactById) {
      throw errorHandler(404, 'Not found');
    }
    res.status(200).json(contactById);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = schema.validate(req.body);

    if (error) {
      throw errorHandler(400, error.message);
    }

    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const removedContact = await contacts.removeContact(req.params.id);

    if (!removedContact) {
      throw errorHandler(404, 'Not found');
    }

    res.status(200).json({ message: 'contact deleted' });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      throw errorHandler(400, error.message);
    }

    const updatedContact = await contacts.updateContact(req.params.id, req.body);

    if (!updatedContact) {
      throw errorHandler(404, 'Not found');
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
