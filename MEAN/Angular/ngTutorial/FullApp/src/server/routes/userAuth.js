var router = require('express').Router();
var jwt = require('jsonwebtoken');
var superSecret = 'superSecret';


// https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens
// We won’t want to protect the /api/authenticate a.k.a. /api/login route so what we’ll do is place our middleware beneath that route. Order is important here.
router.post('/login', login);
// TODO: need to logut too, but for now, just remove the token from the client
// http://stackoverflow.com/questions/21978658/invalidating-json-web-tokens

router.use(authenticateRequest);

// TODO : check if using loopback helps
// TODO: http://stackoverflow.com/a/25446206

router.get('/*', goToNextRouter);

module.exports = router;

// since we have multiple routers
function goToNextRouter(req, res, next) {
    next();
}


function userAuthentication(username, password) {

    // TODO: Authenticate based on proper values stored in cloudant
    if (username && username != '') {
        if (username == "db2onc" && password == "db2onc") {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

function login(req, res) {

    var username = '';
    var password = '';
    if (req.body.username) {
        username = req.body.username;
    }
    if (req.body.password) {
        password = req.body.password;
    }

    if (userAuthentication(username, password)) {
        // if user is found and password is right
        // create a token
        var token = jwt.sign(username, superSecret, {
            expiresIn: "1h" // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).json({
            success: true,
            message: 'Enjoy your token!',
            token: token
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'Authentication failed. Invalid Username or Password.'
        });
    }

}

function authenticateRequest(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, superSecret, function(err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error

        // return res.status(403).send({
        //     success: false,
        //     message: 'No token provided.'
        // });

        // Uncomment this to bypass authentication
        next();

    }
}
