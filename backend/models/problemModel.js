// backend/models/problemModel.js
const mongoose = require('mongoose');

const problemSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // We will support Markdown here so you can add math equations (LaTeX)
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true,
    },
    category: {
      type: String,
      required: true, // e.g., 'Neural Networks', 'Arrays', 'System Design'
    },
    type: {
      type: String,
      enum: ['coding', 'mcq'],
      default: 'coding',
    },
    
    // --- CODING SPECIFIC FIELDS ---
    
    // The starter code the user sees (e.g., "def solve(x): ...")
    solutionTemplate: {
      type: String,
    },
    // The hidden tests used to grade the user
    testCases: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        isHidden: { type: Boolean, default: false }, // If true, user won't see this case
      },
    ],

    // --- METADATA ---
    
    // To filter by company (e.g., "TigerIT", "Enosis")
    companyTags: [
      { type: String }
    ],
  },
  {
    timestamps: true,
  }
);

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;