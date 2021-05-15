var express = require('express');
var router = express.Router();
var model = require('../model/users/user');

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('create',{title: "Spotify - Criar Conta"});
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

module.exports = router;
