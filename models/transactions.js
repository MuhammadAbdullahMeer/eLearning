const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  account_id: {
    type: Number,
    required: true,
    unique: true
  },
  transaction_count:{
    type: Number,
    required: true,
  },
  bucket_start_date:{
    type:Date,
  },
  bucket_end_date:{
    type:Date,
  },
  transactions:[

  ]
});

module.exports = mongoose.model('transactions', transactionSchema);