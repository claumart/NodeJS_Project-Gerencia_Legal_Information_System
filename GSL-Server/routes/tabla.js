var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/tabla', function(req, res, next) {
  res.render('tabla', { title: 'Expresso' });
});

module.exports = router;
