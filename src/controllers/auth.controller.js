require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const newToken = (user) => {
	return jwt.sign({ user }, process.env.JWT_SECRET_TOKEN);
};

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user)
            return res
                .status(400)
                .send({ message: "email already exists try another email" });

        user = await User.create(req.body);

        const token = newToken(user);

        return res.send({ user, token });
    } catch (err) {
        return res.send(err.message);

    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user)
            return res
                .status(400)
                .send({ message: "email already exists try another email" });
    
        const match = user.checkPassword(req.body.password);
        if (!match)
            return res
                .status(400)
                .send({ message: "Please try another email or Password" });
    
        const token = newToken(user);

        return res.status(200).send({ user, token });
    } catch (err) {
        return res.status(500).send(err.message);

    }
};

module.exports = { register, login, newToken };

