var express = require('express');
var router = express.Router();
var model = require('../model/users/user');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('create',{title: "Spotify - Criar Conta"});
});

/* GET users login. */
router.get('/login', function(req, res, next) {
    if(req.session && req.session.login){
        res.redirect('/users/dashboard');
    }
    res.render('login',{title: "Spotify - Login"});
});

/* Save users - POST */
router.post('/save', function(req, res, next) {
    model.insertUsers(req).then((result) => {
        if(result.insertedCount === 1){
            console.log("User added successfully");
        }else{
            console.log("Error trying to add user");
        }
    });

    res.redirect('/');
    res.end();
});

/* Login users - POST */
router.post('/auth', function(req, res, next){
    let username = req.body.username;
    let password = req.body.password;

    model.getUser(username).then((result) => {
        if(result.length > 0){
            let userData = result[0];

            if(password === userData.password){
                req.session.login = username;
                res.redirect('/users/profile');
            }
        }else{
            res.redirect('/');
        }
    });
});

router.get('/profile', function(req, res, next){
    let user = model.getUser(req.session.login);

    if(req.session && req.session.login){
        user.then((result) => {
            let userData = result[0];
            res.render('profile',{
                title: 'Spotify - profile',
                name: userData.name
            });
        });
    }else{
        res.redirect('/users/login');
    }

})

module.exports = router;
