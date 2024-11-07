// Import the Express module
const express = require("express")
// Initialize the router object
const router = express.Router()

// @desc    Login/Landing Page
// @route   GET /
router.get('/', (req, res) => {
    res.render('login') // Render the 'login' view template
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard') // Render the 'dashboard' view template
})

// Export the router to be used in other parts of the application
module.exports = router
