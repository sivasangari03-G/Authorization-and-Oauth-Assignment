const express = require('express');

const router = express.Router();

const User = require('../models/user.model')

router.get('', async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).send({ user })
    } catch(e) {
        return res.status(500).send(e.message);

    }
})




module.exports = router;