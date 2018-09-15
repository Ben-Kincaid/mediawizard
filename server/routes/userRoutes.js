require('dotenv').load();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var UserSchema = require('../models/UserSchema');
var verifyToken = require('./middleware/verifyToken');
var cors = require('cors');
mongoose.connect(`mongodb://${process.env.MONGO_UN}:${process.env.MONGO_PASS}@ds119702.mlab.com:19702/dirango-mediawizard`, { useNewUrlParser: true } )

router.get('/', (req, res) => {
    
})






router.use(cors());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use((req, res, next) => {
    console.log('REQUEST MADE');
    next();
})



router.post('/register', (req, res) => {
    
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    UserSchema.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    }, (err, user) => {
        console.log(user);
        if (err) {
            if(err.code == 11000) {
                return res.send({
                    message: `The user ${req.body.email} has already registered.`
                });
            }
                return res.send({
                    auth: false,
                    message: `The user ${req.body.email} has already registered.`
                });
            
        }

        var token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET, {
            expiresIn: 86400
        })
        res.status(200).send({ 
            auth: true, 
            message: "Sucessfully registered.",
            token: token 
        })
    })
})


router.post('/login', (req, res) => {
    if(req.body.name.includes('@')) {
        var query = {email: req.body.name}
    } else {
        var query = {username: req.body.name}
    }
    UserSchema.findOne(query, (err, user) => {
        if(err) return res.status(500).send('Could not contact users in database.')
        if(!user) return res.status(404).send('Could not find specified user.');

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if(!passwordIsValid) {
            return res.status(401).send({auth: false, message: "Invalid credentials.", token: null})
        } else {
            var token = jwt.sign({id: user._id}, process.env.AUTH_SECRET, {
                expiresIn: 86400
            });

            res.status(200).send({auth: true, message: "Succesfully logged-in.", user, token: token})
        }
    })
})


router.get('/my-profile', verifyToken, (req, res) => {
   UserSchema.findById(req.userId, {password: 0}, (err, user) => {
       if(err) return res.status(500).send("There was an issue finding the user.")
       if(!user) return res.status(404).send("No User Found.");

       res.status(200).send(user);
   })
    
})

router.get('/validate/:id', verifyToken, (req, res) => {
    UserSchema.findById(req.params.id, {password: 0}, (err, user) => {
        
        if(err) res.status(500).send('There was an issue finding the user.');
        if(!user) res.status(404).send('No user found');

        res.status(200).send(user);
    })
})
module.exports = router;



