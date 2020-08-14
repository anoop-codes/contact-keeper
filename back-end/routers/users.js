const express = require('express');
const { validateUser, User } = require('../models/User');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const router = express.Router();

/**
 * @post : POST api/users
 * @description : to register a user
 * @access : public 
 */
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const isExist = await User.findOne({ email: req.body.email });
    if (isExist) return res.status(400).send('User already Exist!');

    const salt = await bcrypt.genSalt(10);

    const _hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: _hashedPassword
    })

    await user.save();

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(token)
})

module.exports = router;