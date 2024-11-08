// Import the Express module
const express = require("express")
// Initialize the router object
const router = express.Router()
const passport = require('passport')


// @desc    Auth with google
// @route   GET /auth/
//can be find in googleoauth documentation
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
// router.get('/path', passport.authenticate('strategyname',{object on failure}))
router.get('/google/callback', passport.authenticate('google', { failureRedirect:'/' }),
(req,res)=>{
    res.redirect('/dashboard')
})
// @desc    Logout User
// @route   /auth/logout
router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
})

// Export the router to be used in other parts of the application
module.exports = router
