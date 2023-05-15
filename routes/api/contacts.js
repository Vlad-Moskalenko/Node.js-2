const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares');
const { isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, controllers.getContactsList);

router.get('/:id', authenticate, isValidId, controllers.getContactById);

router.post('/', authenticate, validateBody(schemas.schema), controllers.addContact);

router.delete('/:id', authenticate, isValidId, controllers.removeContact);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.schema),
  controllers.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  controllers.updateFavorite
);

module.exports = router;
