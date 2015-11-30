var express = require('express');
var router = express.Router();
var appdata = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  var artistArtwork = [];

  appdata.speakers.forEach(function (item) {
    artistArtwork = artistArtwork.concat(item.artwork);
  });

  res.render('index', {
    title: 'Express',
    artwork: artistArtwork
  });
});

/* GET speakers page. */
router.get('/speakers', function(req, res, next) {
  var artistArtwork = [];

  appdata.speakers.forEach(function (item) {
    artistArtwork = artistArtwork.concat(item.artwork);
  });

  res.render('speakers', {
    title: 'Speakers',
    artwork: artistArtwork
  });
});

/* GET speaker page. */
router.get('/speakers/:speakerid', function(req, res, next) {
  var artistArtwork = [];

  appdata.speakers.forEach(function (item) {
    if (item.shortname == req.params.speakerid) {
      artistArtwork = artistArtwork.concat(item.artwork);
    }
  });

  res.render('speakers', {
    title: 'Speakers',
    artwork: artistArtwork
  });
});
module.exports = router;
