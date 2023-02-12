const mongoose = require('mongoose');

const accountsSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
    unique: true
  },
  limit:{
    type: Number,
    required: true,
  },
  products:[

  ],
});

module.exports = mongoose.model('accounts', accountsSchema);