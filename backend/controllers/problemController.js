// backend/controllers/problemController.js
const Problem = require('../models/problemModel');

// @desc    Fetch all problems
// @route   GET /api/problems
// @access  Public
const getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({});
    res.json(problems);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single problem by ID
// @route   GET /api/problems/:id
// @access  Public
const getProblemById = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (problem) {
      res.json(problem);
    } else {
      res.status(404).json({ message: 'Problem not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a problem (Admin only - for now public for testing)
// @route   POST /api/problems
// @access  Public
const createProblem = async (req, res) => {
  try {
    const { title, description, difficulty, category, testCases, solutionTemplate } = req.body;

    const problem = new Problem({
      title,
      description,
      difficulty,
      category,
      testCases,
      solutionTemplate
    });

    const createdProblem = await problem.save();
    res.status(201).json(createdProblem);
  } catch (error) {
    res.status(400).json({ message: 'Invalid problem data', error: error.message });
  }
};

module.exports = {
  getProblems,
  getProblemById,
  createProblem,
};