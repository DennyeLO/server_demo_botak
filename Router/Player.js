const express = require('express');
const router = express.Router();
const player_Controller = require('../Controller/Player');
const { check } = require('express-validator');

router.post('/register_user',[
    check('username')
        .notEmpty()
        .custom(async username => {
            const value = await player_Controller.isUsernameInUse(username);
            if (value) {
                throw new Error('Username is already exists!!!');
            }
        }),

    check('player_name', 'Player name is required')
        .notEmpty(),

    check('phone', 'Player name is required')
        .notEmpty(),

    check('email', 'Email is required')
        .notEmpty()
        .isEmail()
        .normalizeEmail(),

    check('password')
        .notEmpty()
        .isLength({ min: 6, max: 16 }),

    check('confirm_password')
        .notEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('The passwords is not same!!!');
            }    
            return true;
        })
],player_Controller.register);

router.post('/login_user',[
    check('username', 'Username is required')
        .notEmpty(),
    check('password', 'Password is required')
        .notEmpty()
],player_Controller.login);

module.exports = router;