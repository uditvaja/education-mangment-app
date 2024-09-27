const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model (assuming teacher is a user)
      required: true
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  });
  

module.exports = mongoose.model('Course', courseSchema);
