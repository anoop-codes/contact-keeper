const express = require('express');
const { validateUser, User } = require('../models/User');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @post : GET api/auth
 * @description : get loggined users
 * @access : private 
 */
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send({ msg: 'something went wrong..' })
    }
})




/**
 * @post : POST api/auth
 * @description : auth user and get token
 * @access : public 
 */
router.post('/', async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const isRegistered = await User.findOne({ email: req.body.email });
        if (!isRegistered) return res.status(400).send('User Donot exist,Register First..');

        const isValid = await bcrypt.compare(req.body.password, isRegistered.password);
        if (!isValid) return res.status(400).send('Please provide the right password...');

        const token = isRegistered.generateAuthToken();

        res.header('x-auth-token', token).send(token)

    } catch (error) {
        res.status(500).send('something went wrong..')
    }
})

module.exports = router;