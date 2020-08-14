const express = require('express');
const auth = require('../middleware/auth');
const { Contact, validateContact } = require('../models/Contacts');
const router = express.Router();

/**
 * @post : POST api/contacts
 * @description : to get the contacts of user
 * @access : private
 */
router.get('/', auth, async (req, res) => {
    try {
        const contact = await Contact.find({ user: req.user._id }).sort({ data: -1 });
        res.json(contact);
    } catch (error) {
        res.status(500).send('something went wrong')
    }
});


/**
 * @post : POST api/users
 * @description : Add new contact
 * @access : private 
 */
router.post('/', auth, async (req, res) => {
    const { error } = validateContact(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { name, email, phone, type } = req.body;


        const contact = new Contact({
            name, email, phone, type, user: req.user._id
        });

        const result = await contact.save();

        res.json(result);

    } catch (error) {
        res.status(500).send('something wentwrong')
    }
});


/**
 * @post : put api/users
 * @description : Edit contact
 * @access : private 
 */
router.put('/:id', (req, res) => {
    res.send('update contact')
});

/**
 * @post : put api/users
 * @description : Delete contact
 * @access : private 
 */
router.delete('/:id', (req, res) => {
    res.send('Delete contact')
})




module.exports = router;