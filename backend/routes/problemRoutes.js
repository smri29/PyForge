// backend/routes/problemRoutes.js
const express = require('express');
const router = express.Router();
const { getProblems, getProblemById, createProblem } = require('../controllers/problemController');

// Route to get all problems or create one
router.route('/').get(getProblems).post(createProblem);

// Route to get a specific problem
router.route('/:id').get(getProblemById);

module.exports = router;