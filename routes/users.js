var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('create',{title: "Spotify - Criar Conta"});
});

/* Save users - POST */
router.post('/save', function(req, res, next) {
    res.write(res);
});

module.exports = router;
