
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require("mongoose")
const User = require("../models/User")

module.exports = function(passport){
    passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Find the user by Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            console.log('User found:', user);
            return done(null, user);
        } else {
            // Create a new user if not found
            user = await User.create({
                googleId: profile.id,
                displayName: profile.displayName,
                firstName: profile.givenName,
                lastName: profile.familyName,
                image: profile.photos[0].value
            });
            console.log('New user created:', user);
            return done(null, user);
        }
    } catch (err) {
        console.error('Error in Google strategy callback:', err);
        return done(err, null);
    }
}));




   passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, {
            id: user.id,
            displayName: user.displayName,
            image: user.image
        });
    });
});

passport.deserializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, user);
        console.log("user is shoenjngjngjfngjfng",user)
    });
});
/*passport.serializeUser(function(user, done) {
    process.nextTick(function() {
        done(null, user.id);  // Store only the user ID
    });
});

passport.deserializeUser(function(id, done) {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});*/


}

/*
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require("mongoose")
const User = require("../models/User")

module.exports = function(passport){
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:'/auth/google/callback'
    },
    async (accessToken,refreshToken,profile,done)=>{
       //getting the new user in here
        const newUser={
            googleId:profile.id,
            displayName:profile.displayName,
            firstName:profile.name.givenName,
            lastName:profile.name.familyName,
            image:profile.photos[0].value
        }
        try{
            let user= await User.find({googleId:profile.id})

            if(user){
                done(null,user)
            }
            else{
                user=await User.create(newUser)
                done(null,user)
            }
        } catch(err){
            console.err(err)
        }
    }
    ))

passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
  })
}
*/

