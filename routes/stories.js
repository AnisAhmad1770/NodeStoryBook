// Import the Express module
const express = require("express")
// Initialize the router object
const router = express.Router()

const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

// @desc    Show add page
// @route   GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add',) 
})

// Export the router to be used in other parts of the application
module.exports = router
