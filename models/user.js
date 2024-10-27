const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },

  notes: {
    type: String,

  },

  status: {
    type: String,
    enum: ['interested', 'good', 'normal', 'unsatisfing', 'bad'],
  },
});

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  pantry: [foodSchema],
});

module.exports = mongoose.model('User', userSchema);
