const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');

const { User } = require('../models/user');

const { ctrlWrapper, errorHandler } = require('../helpers');

const { SECRET_KEY } = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw errorHandler(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl });

  res.status(201).json({
    email: newUser.email,
    avatar: newUser.avatarUrl,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw errorHandler(404, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw errorHandler(404, 'Email or password invalid');
  }

  const payload = {
    id: user.id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({ token });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({ email, name });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: '' });

  res.json({
    message: 'You have been logged out',
  });
};

const updateSubscription = async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });

  if (!updatedUser) {
    throw errorHandler(404, 'Not found');
  }

  res.status(200).json(updatedUser);
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await fs.rename(tempUpload, resultUpload);

  const avatarUrl = path.join('avatars', fileName);
  await User.findByIdAndUpdate(_id, { avatarUrl }, { new: true });

  res.json({
    avatarUrl,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
