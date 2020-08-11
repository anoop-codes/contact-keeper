const express = require('express');
const router = express.Router();

/**
 * @post : POST api/users
 * @description : to register a user
 * @access : public 
 */
router.post('/', (req, res) => {
    res.send('regiseter a user')
})

module.exports = router;