require("dotenv").config();
const passport = require("passport");
const { v4: uuid } = require("uuid");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/user.model");
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:8000/auth/google/callback",
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {

			let user = await User.findOne({ email: profile._json.email });

			if (!user) {
				user = await User.create({
					email: profile._json.email,
					password: uuid(),
					roles: ["customer"],
				});
			}
			/* console.log(profile._json.email, uuid()); */
			// console.log("user",user);
			return done(null, user);
		}
	)
);

module.exports = passport;
