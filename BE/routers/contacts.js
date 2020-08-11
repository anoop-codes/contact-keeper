const express = require('express');
const router = express.Router();

/**
 * @post : POST api/contacts
 * @description : to get the contacts of user
 * @access : private
 */
router.get('/', (req, res) => {
    res.send('get all contact')
});


/**
 * @post : POST api/users
 * @description : Add new contact
 * @access : private 
 */
router.post('/', (req, res) => {
    res.send('Add new contact')
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