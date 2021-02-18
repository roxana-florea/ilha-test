const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation')

router.get('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    const emailExists = await User.findOne({
        email: req.body.email
    });

    if (error) return res.status(400).json({
        error: error.details[0].message
    });

    if (emailExists) return res.status(400).json({
        error: 'This e-mail has already been registered to an account.'
    })

    const password = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password,
    });

    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            userId: savedUser._id
        })
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.get('/login', async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({
        error: `Incorrect e-mail`
    });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({ error: 'Invalid Password' });

    const token = jwt.sign(
        { name: user.firstname, id: user._id },
        process.env.SECRET_TOKE
    );

    res.header('Authorization', token).json({
        error: null,
        data: {
            token
        }
    });
});

module.exports = router;