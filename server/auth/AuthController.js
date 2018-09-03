require('dotenv').load();

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use((req, res, next) => {
    console.log('REQUEST MADE');
    next();
})
var UserSchema = require('../models/User.js');


router.post('/register', (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log(req.token);
    UserSchema.create({
        username: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }, (err, user) => {
        if(err) {
            
            return res.status(500).send(err);
        }
        var token = jwt.sign({id: user._id}, process.env.AUTH_SECRET, {
            expiresIn: 86400
        })
        res.status(200).send({auth: true, token: token})
    })
})