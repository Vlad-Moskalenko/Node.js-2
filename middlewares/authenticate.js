const jwt = require('jsonwebtoken');

const { User } = require('../models/user');
const { errorHandler } = require('../helpers');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(errorHandler(401));
  }

  try {
    if (token) {
      const { id } = jwt.verify(token, SECRET_KEY);

      const user = await User.findById(id);

      if (!user) {
        next(errorHandler(401));
      }
      req.user = user;
      next();
    }
  } catch {
    next(errorHandler(401));
  }
};

module.exports = authenticate;
