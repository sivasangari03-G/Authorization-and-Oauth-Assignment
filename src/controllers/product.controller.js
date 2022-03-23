const express = require("express");
const Product = require("../models/product.model");
const authenticate = require("../middlewares/authenticate.middleware");
const authorise = require("../middlewares/authorise.middleware");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
	try {
		const product = await Product.create(req.body);
		return res.status(201).send(product);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.patch("/:id", authenticate, authorise(["seller", "admin"]), async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		return res.status(200).json(product);
	} catch (err) {
		return res.status(500).send({ message: err.message });
	}
});

router.delete(
	"/:id",
	authenticate,
	authorise(["seller", "admin"]),
	async (req, res) => {
		try {
			const product = await Product.findByIdAndDelete(req.params.id);
			return res.status(200).json(product);
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	}
);


module.exports = router;
