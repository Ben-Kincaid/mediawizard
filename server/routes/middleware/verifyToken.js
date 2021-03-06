require('dotenv').load();
var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
 
    if(!token) {
        return res.status(403).send({
            auth: false,
            message: 'No Token Provided'
        })
    } else {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
            if(err) {
                return res.status(500).send({auth: false, message: 'Failed to authenticate token.'})
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

module.exports = verifyToken;