var express = require('express');
var router = express.Router();
var musicModel = require("../model/musics/music");
var userModel = require("../model/users/user");

/* GET create music form. */
router.get('/add', function(req, res, next) {
    let user = userModel.getUser(req.session.login);

    user.then((result) => {
        if((result.length > 0 || !result.length) && !(req.session && req.session.login) && !result.is_adm){
            res.redirect('/users/login');
        }
    });

    res.render('music-form',{title: "Spotify - Adicionar Música"});
});

/* POST save music. */
router.post('/save', function(req, res, next) {
    if(!(req.session && req.session.login)){
        res.redirect('/users/login');
    }

    musicModel.insertMusic(req).then((result) => {
        if(result.insertedCount === 1){
            console.log("Music added successfully");
        }else{
            console.log("Error trying to add music");
        }
    });

    res.redirect('/users/profile');
    res.end();
});

module.exports = router;
