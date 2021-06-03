var express = require('express');
var router = express.Router();
var lzma = require('lzma-native');
const fs = require('fs');


router.post('/', function(req, res, next) {
  var file;

  if(!req.files)
  {
      res.send("File was not found");
      return;
  }
  file = req.files.toCompressfile;

  lzma.compress(file.data, function(result) {
    res.send(result)
  });
});

module.exports = router;
