const Router = require('express').Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const jwtSecret = 'qh2WA3soUCClwrKjXUX7PWXOU1UkeeSw'

Router.post('/create', [
        body('email', 'Incorrect email').isEmail(),
        body('password', 'Incorrect password').isLength({min: 4}),
        body('name', 'Incorrect name').isLength({min: 5})
    ], 
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const salt = await bcrypt.genSalt(10)
        let securedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
            location: req.body.location
        })
        console.log(newUser);
        res.json({success: true})
    } catch(e) {
        console.log(e)
        res.json({success: false})
    }
})

Router.post('/login', async (req, res) => {
try {
    const user = await User.findOne({email: req.body.email})
    console.log(user);
    if(!user) {
        return res.status(400).json({error: 'No User Found'})
    }
    const pwdCompare = await bcrypt.compare(req.body.password, user.password)
    if(!pwdCompare) {
        return res.status(400).json({error: 'Incorrect Password'})
    }
    const data = {
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, jwtSecret);
    res.json({success: true, authToken})
} catch(e) {
    console.log(e)
    res.json({success: false})
}
})

module.exports = Router;