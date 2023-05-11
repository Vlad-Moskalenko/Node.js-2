const app = require('./app');
const mongoose = require('mongoose');

const DB_HOST =
  'mongodb+srv://vlad:vlad414851@cluster0.jznjmq3.mongodb.net/contacts_reader?retryWrites=true&w=majority';

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
