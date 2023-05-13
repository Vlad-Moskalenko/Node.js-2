const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const { isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contacts');

router.get('/', controllers.getContactsList);

router.get('/:id', isValidId, controllers.getContactById);

router.post('/', validateBody(schemas.schema), controllers.addContact);

router.delete('/:id', isValidId, controllers.removeContact);

router.put('/:id', isValidId, validateBody(schemas.schema), controllers.updateContact);

router.patch('/:id/favorite', validateBody(schemas.updateFavorite), controllers.updateFavorite);

module.exports = router;
