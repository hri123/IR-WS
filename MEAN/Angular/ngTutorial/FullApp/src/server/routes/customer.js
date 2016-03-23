var router = require('express').Router();


router.post('/customer', createCustomer);
router.delete('/customer', deleteCustomer);
router.get('/customers', getCustomers);

router.post('/sendmail', sendmail);

router.get('/*', goToNextRouter);

module.exports = router;

// since we have multiple routers
function goToNextRouter(req, res, next) {
  next();
}


//////////////

var async = require('async'),
    Cloudant = require('cloudant'),
    cloudant = Cloudant({
        url: 'https://ed35dc56-a8b5-409b-938f-f7b1675d3863-bluemix:538716f291af9784858619f4f3d6e3d7257aeb06546237ebe5b01a311ab7e064@ed35dc56-a8b5-409b-938f-f7b1675d3863-bluemix.cloudant.com'
    }),
    dbname = 'customers';

var db = cloudant.db.use(dbname);

function getCustomers(req, res, next) {

    db.find({
        selector: {
            "_id": {
                "$gt": 0
            },
            "type": {
                "$eq": "customer"
            }
        }
    }, function(er, result) {

        if (er) {
            throw er;
        }

        console.log('Found %d documents with type Customer', result.docs.length);
        for (var i = 0; i < result.docs.length; i++) {
            console.log('  Doc id: %s', result.docs[i]._id);
        }

        res.status(200).send(result.docs);
    });
}

function createCustomer(req, res, next) {

    var cust = {
        id: req.query.id || req.body.id,
        type: 'customer',
        firstname: req.query.firstname || req.body.firstname,
        lastname: req.query.lastname || req.body.lastname,
        company: req.query.company || req.body.company,
        email: req.query.email || req.body.email
    };
    db.insert(cust, function(err, data) {
        console.log("Error:", err);
        console.log("Data:", data);

        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(400).send(err);
        }
        // callback(err, data);
    });
}

function deleteCustomer(req, res, next) {

    var id = req.query.id;
    var rev = req.query.rev;

    console.log("id: ", id);
    console.log("rev", rev);

    db.destroy(id, rev, function(err, data) {
        console.log("Error:", err);
        console.log("Data:", data);

        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(400).send(err);
        }
        // callback(err, data);
    });

}

function sendmail(req, res, next) {

    var api_key = 'key-876cad22770d7a28c3dea5aa4f66a65c';
    var domain = 'sandboxafd7105185944186a43d41331516e345.mailgun.org';
    var mailgun = require('mailgun-js')({
        apiKey: api_key,
        domain: domain
    });

    var data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: req.body.recipients,
        subject: req.body.subject || 'Hello',
        text: req.body.body || 'Testing some Mailgun awesomness!'
    };

    mailgun.messages().send(data, function(err, data) {
        if (!err) {
            res.status(200).send(data);
        } else {
            res.status(400).send(err);
        }
        console.log(data);
    });

}



///////////////////////////////////
