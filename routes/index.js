var express = require('express');
var router = express.Router();
var messageBird = require('messagebird')('WyYCmjS6b5GY3LM8K4KgUlLju')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { error: '' });
});

router.post('/step2', function(req, res, next) {
    let number = req.body.number;
    messageBird.verify.create(number, {
        template: 'Your verification code is %token'
    }, function(err, response) {
        if (err) {
            console.log(err);
            res.render('index', { error: err.errors[0].description });
        } else {
            console.log(response);
            res.render('otp', { id: response.id });
        }
    });
});

router.post('/step3', function(req, res, next) {
    let id = req.body.id;
    let token = req.body.token;
    messageBird.verify.verify(id, token, function(err, response) {
        if (err) {
            console.log(err);
            res.render('otp', { err: response.err });
        } else {
            res.render('success');
        }
    })
});



module.exports = router;