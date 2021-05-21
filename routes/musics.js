var express = require('express');
var multer = require('multer');
var path = require('path');
var musicModel = require("../model/musics/music");
var userModel = require("../model/users/user");
var router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null,"public/images/covers/");
    },
    filename: function(req, file, callback){
        callback(null, file.originalname + Date.now() +path.extname(file.originalname));
    }
});

const upload = multer({storage: storage});

/* GET create music form. */
router.get('/add', function(req, res, next) {
    let user = userModel.getUser(req.session.login);

    user.then((result) => {
        if((result.length > 0 || !result.length) && !(req.session && req.session.login) && !result.is_adm){
            res.redirect('/users/login');
        }
    });

    res.render('music-form',{title: "Spotify - Adicionar Música", errorMusic:req.query.errorMusic});
});

/* GET Get music from database */
router.post('/get-musics', function(req, res, next) {
    let musicName = req.body.music;

    musicModel.getMusic(musicName).then((result) =>{
        res.json(result);
    });
});

/* GET Get all musics from database */
router.get('/get-admin-musics', function(req, res, next) {
    musicModel.getAdminMusics(req.session.login).then((result) =>{
        res.json(result);
    });
});

/* POST save music. */
router.post('/save', upload.single("album_cover"),function(req, res, next) {

    req.body.album_cover = "/public/images/covers/"+res.req.file.filename;

    if(!(req.session && req.session.login)){
        res.redirect('/users/login');
    }

    musicModel.insertMusic(req).then((result) => {
        if(result.insertedCount === 1){
            res.redirect('/users/profile');
        }else{
            res.redirect('/musics/add?errorMusic=1');
        }
    });
});

module.exports = router;
