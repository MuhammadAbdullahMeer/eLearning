const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  username:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  birthdate: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  accounts: [
    
  ]

});

module.exports = mongoose.model('customers', customerSchema);