const passport = require('passport')
const localStrategy = require('passport').Strategy
const user = require('../models/user_shema')

// saving user object in the session

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err, user) {
      done(err, user);
    });
  });
//login strategy

passport.use('local', new localStrategy({
    usernameField : 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req,username,password, done)=> {

    //find user
    user.findOne({email: username}, (err,user)=> {

        if (err) {
            return done(null, false, req.flash('error', 'Something wrong happened'))
        } 
        if(!user) {
            return done(null, false, req.flash('error', 'user was not found'))
        }
        if (user) {
            if (user.comparePasswords(password, user.password)) {

                return done(null,user, req.flash('success', ' welcome back'))

            } else {
                return done(null,false, req.flash('error', ' password is wrong'))

            }
        }
    })
}))
