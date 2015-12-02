var express = require('express');
var router = express.Router();
var appdata = require('../data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  var artistArtwork = [];
  var allSpeakers = [];

  allSpeakers = appdata.speakers;

  appdata.speakers.forEach(function (item) {
    artistArtwork = artistArtwork.concat(item.artwork);
  });

  res.render('index', {
    title: 'Express',
    artwork: artistArtwork,
    speakers: allSpeakers,
    page: 'home'
  });
});

/* GET artist list page. */
router.get('/speakers', function(req, res, next) {
  var artistArtwork = [];
  var allSpeakers = [];

  allSpeakers = appdata.speakers;

  appdata.speakers.forEach(function (item) {
    artistArtwork = artistArtwork.concat(item.artwork);
  });

  res.render('speakers', {
    title: 'Speakers',
    artwork: artistArtwork,
    speakers: allSpeakers,
    page: 'artistList'
  });
});

/* GET artist detail page. */
router.get('/speakers/:speakerid', function(req, res, next) {
  var artistArtwork = [];
  var individualSpeaker = [];

  appdata.speakers.forEach(function (item) {
    if (item.shortname == req.params.speakerid) {
      individualSpeaker.push(item);
      artistArtwork = artistArtwork.concat(item.artwork);
    }
  });

  res.render('speakers', {
    title: individualSpeaker.name,
    artwork: artistArtwork,
    speakers: individualSpeaker,
    page: 'artistDetail'
  });
});

module.exports = router;
