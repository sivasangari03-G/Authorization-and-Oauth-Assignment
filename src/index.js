require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const connect = require("./configs/db.config");
const userController = require("./controllers/user.controller");
const { register, login, newToken } = require("./controllers/auth.controller");
const passport = require("./configs/google-oauth");

const productController = require("./controllers/product.controller");

app.use("/users", userController);
app.use("/products", productController);

app.post("/register", register);
app.post("/login", login);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.get(
	"/auth/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		// successRedirect: "/auth/google/success",
		failureRedirect: "/auth/google/failure",
	}),
	(req, res) => {
		const token = newToken(req.user);
		return res.status(200).send({ user: req.user, token });
		// return res.send(req.user)
	}
);

app.listen(process.env.PORT, async () => {
	try {
		await connect();
		console.log(`App is listening on port ${process.env.PORT}`);
	} catch (e) {
		console.log(e.message);
	}
});
