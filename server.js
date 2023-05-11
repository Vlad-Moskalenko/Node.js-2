const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();

const DB_HOST = `mongodb+srv://vlad:${process.env.PASSWORD}@cluster0.jznjmq3.mongodb.net/contacts_reader?retryWrites=true&w=majority`;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running. Use our API on port: 3000');
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
