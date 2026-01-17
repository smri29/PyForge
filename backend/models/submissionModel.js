// backend/models/submissionModel.js
const mongoose = require('mongoose');

const submissionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Points to the User model
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Problem', // Points to the Problem model
    },
    code: {
      type: String,
      required: true, // The actual Python code they wrote
    },
    language: {
      type: String,
      default: 'python',
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error'],
      default: 'Pending',
    },
    // Performance metrics (Great for ranking candidates)
    executionTime: { 
      type: Number, // in milliseconds
      default: 0 
    }, 
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;