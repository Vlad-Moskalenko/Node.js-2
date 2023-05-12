const { isValidObjectId } = require('mongoose');
const errorHandler = require('../helpers/errorHandler');

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    next(errorHandler(400, `${id} is not a valid`));
  }
  next();
};

module.exports = isValidId;
