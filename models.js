const mongoose = require('mongoose');

const validator = val => typeof val == 'number'

const accountSchema = mongoose.Schema({
  name: {
    type: String, required: true, trim: true
  },
  balance: {
    type: Number, default: 0, validate: [validator, 'balance param must be a number']
  }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
