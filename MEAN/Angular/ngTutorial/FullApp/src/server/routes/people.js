var router = require('express').Router();
var data = require('./data');



router.get('/people', getPeople);
router.get('/person/:id', getPerson);

router.get('/*', goToNextRouter);

module.exports = router;

// since we have multiple routers
function goToNextRouter(req, res, next) {
  next();
}

//////////////

function getPeople(req, res, next) {
    res.status(200).send(data.people);
}

function getPerson(req, res, next) {
    var id = +req.params.id;
    var person = data.people.filter(function(p) {
        return p.id === id;
    })[0];

    if (person) {
        res.status(200).send(person);
    } else {
        four0four.send404(req, res, 'person ' + id + ' not found');
    }
}
