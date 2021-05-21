const passport = require('passport')
const googleStrategy = require('passport-google-oauth2').Strategy

passport.use( new googleStrategy({
    clientID : "1005852154120-i97vras2r6htngh6egau6lkv8k7scmha.apps.googleusercontent.com",
    clientSecret :"W_jbuNrzElA5PVJwOmP0PRNo",
    callbackURL : "https://localhost:3003/google/callback",
    passReqToCallback : true
}, function( req , accesstoken , refreshToken , profile , done){
    console.log(profile);
    return done(null , profile)
}))
