const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', controllers.getContactsList);

router.get('/:id', controllers.getContactById);

router.post('/', validateBody(schemas.schema), controllers.addContact);

router.delete('/:id', controllers.removeContact);

router.put('/:id', validateBody(schemas.schema), controllers.updateContact);

module.exports = router;
