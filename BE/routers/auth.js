const express = require('express');
const router = express.Router();

/**
 * @post : GET api/auth
 * @description : get loggined users
 * @access : private 
 */
router.get('/', (req, res) => {
    res.send('get loggined users')
})


/**
 * @post : POST api/auth
 * @description : auth user and get token
 * @access : public 
 */
router.post('/', (req, res) => {
    res.send('loggin users')
})

module.exports = router;