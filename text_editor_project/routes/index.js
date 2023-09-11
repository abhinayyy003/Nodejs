var express = require('express');
var router = express.Router();
var fs = require('fs')


/* GET home page. */
router.get('/', function(req, res) {
  fs.readdir(`./uploads`,{withFileTypes: true}, function(err,files){
    res.render('index', {files: files}); //synchronous we put this inside coz 1st we want files to get read first and the reder if its outside it renders and then shows filrs coz it's synchronus and fs.mkdir is asynchronus
  })
});

router.get('/file/:filename', function(req, res) {
  fs.readdir(`./uploads`,{withFileTypes: true}, function(err,files){
    fs.readFile(`./uploads/${req.params.filename}`,"utf-8", function(err,data){ //if we have not mentiond it as utf-8 then the value or the contents of the file will be shown in hexadecimal format
      res.render('opened', {files: files, filename: req.params.filename, filedata: data}); //synchronous we put this inside coz 1st we want files to get read first and the reder if its outside it renders and then shows filrs coz it's synchronus and fs.mkdir is asynchronus
    })
  })
});

router.get('/filedelete/:filename', function(req, res) {
  fs.unlink(`./uploads/${req.params.filename}`,function(err){ //if we have not mentiond it as utf-8 then the value or the contents of the file will be shown in hexadecimal format
    if(err) console.log('cannot delete')
    res.redirect("/")
  })
});

router.get('/folderdelete/:filename', function(req, res) {
  fs.rmdir(`./uploads/${req.params.filename}`,function(err){ //if we have not mentiond it as utf-8 then the value or the contents of the file will be shown in hexadecimal format
    res.redirect('back');
  })
});

router.post('/filechange/:filename', function(req, res) {
  fs.writeFile(`./uploads/${req.params.filename}`,req.body.filedata, function(err){
    if(err) console.log(err)
    else res.redirect("back")
  })
  //console.log(req.query) /* to get the file name given to the user you have to use req.query*/
});

router.get('/filecreate', function(req, res) {
  fs.writeFile(`./uploads/${req.query.filename}`,"", function(err){
    if(err) console.log(err)
    else res.redirect("back")
  })
  //console.log(req.query) /* to get the file name given to the user you have to use req.query*/
});

router.get('/foldercreate', function(req, res) {
  fs.mkdir(`./uploads/${req.query.foldername}`,function(err){
    if(err) console.log(err)
    else res.redirect("back")
  })
  //console.log(req.query) /* to get the file name given to the user you have to use req.query*/
});


module.exports = router;
