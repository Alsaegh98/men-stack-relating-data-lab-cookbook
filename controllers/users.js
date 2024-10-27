const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const users = await User.find(); 
        res.render('users/index', { users });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.get('/items', async (req, res) => {

try {
    const user = await User.findById(req.params.id).populate('pantryItems');
    if (!user) {
        return res.status(404).send("User not found");
    }
    res.render('users/show.ejs', { user });
} catch (error) {
    res.status(500).send("Server Error");
}
});
module.exports = router;