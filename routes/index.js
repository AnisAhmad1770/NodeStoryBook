// Import the Express module
const express = require("express")
// Initialize the router object
const router = express.Router()

const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Story = require('../models/Story')

// @desc    Login/Landing Page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: "login"
    }) // Render the 'login' view template
})

// @desc    Dashboard
// @route   GET /dashboard
router.get('/dashboard', ensureAuth, async(req, res) => {
    try {
        const stories=await Story.find({user:req.user.id}).lean()
        res.render('dashboard', {
            name: req.user.displayName,
            stories
        })   // Render the 'dashboard' view template
    } catch (error) {
        console.error(err)
        res.render('error/500')

    }
    


})

// Export the router to be used in other parts of the application
module.exports = router
