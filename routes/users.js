var express = require('express');
var router = express.Router();
var model = require('../model/users/user');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('create',{title: "Spotify - Criar Conta", createError: req.query.createError});
});

/* GET users login. */
router.get('/login', function(req, res, next) {
    if(req.session && req.session.login){
        res.redirect('/users/profile');
    }
    res.render('login',{title: "Spotify - Login", loginError: req.query.error, createSuccess: req.query.createSuccess});
});

/* Save users - POST */
router.post('/save', function(req, res, next) {
    model.insertUsers(req).then((result) => {
        if(result.insertedCount === 1){
            res.redirect("/users/login?createSuccess=1");
        }else{
            res.redirect("/users/create?createError=1");
        }
    });
});

/* Login users - POST */
router.post('/auth', function(req, res, next){
    let email = req.body.email;
    let password = req.body.password;

    model.getUser(email).then((result) => {
        if(result.length > 0){
            let userData = result[0];

            if(password === userData.password){
                req.session.login = email;
                res.redirect('/users/profile');
            }
        }
        res.redirect('/users/login?error=1');
    });
});

router.get('/profile', function(req, res, next){
    let user = model.getUser(req.session.login);

    if(req.session && req.session.login){
        user.then((result) => {
            let userData = result[0];
            res.render('profile',{
                title: 'Spotify - profile',
                name: userData.name,
                user_adm: userData.is_adm
            });
        });
    }else{
        res.redirect('/users/login');
    }
});

router.get('/logoff', function(req, res, next){
    req.session.destroy();
    res.redirect('/users/login');
});

module.exports = router;
