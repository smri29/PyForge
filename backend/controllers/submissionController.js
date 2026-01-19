// backend/controllers/submissionController.js
const Submission = require('../models/submissionModel');
const axios = require('axios'); // <--- Import Axios

// @desc    Submit code for evaluation
// @route   POST /api/submissions
// @access  Private
const submitCode = async (req, res) => {
  try {
    const { problemId, code, language } = req.body;

    // 1. Call the Python AI Service
    let executionResult;
    try {
      // connecting to the port 8000 where FastAPI is running
      const pythonResponse = await axios.post('http://localhost:8000/execute', {
        code: code,
        problem_id: problemId
      });
      executionResult = pythonResponse.data;
      
    } catch (pyError) {
      console.error("Python Service Error:", pyError.message);
      // Fallback if Python is down
      executionResult = { 
        status: 'error', 
        output: 'Error: AI Service unreachable. Please ensure the Python server is running.' 
      };
    }

    // 2. Create the Submission Record
    const submission = await Submission.create({
      user: req.user._id,
      problem: problemId,
      code,
      language,
      status: 'Pending', // We will update this with real logic later
    });

    // 3. Send back the saved submission + The Python Output
    res.status(201).json({
      ...submission._doc,
      output: executionResult.output // <--- The simulated output from Python
    });

  } catch (error) {
    res.status(400).json({ message: 'Submission failed', error: error.message });
  }
};

// @desc    Get user's history
// @route   GET /api/submissions/my
// @access  Private
const getMySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user._id })
      .populate('problem', 'title difficulty')
      .sort({ createdAt: -1 });
      
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { submitCode, getMySubmissions };