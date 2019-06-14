var express = require('express');
var multer = require('multer');
var path = require('path');
// var pool = require('./pool.js');
var querystring = require('querystring');
var fs = require('fs');
var router = express.Router();
router.use(multer({dest:'./public/file'}).any())
//图片上传
router.post('/img',(req,res)=>{
	var f = req.files[0]
	console.log(f)
    var oldname = f.filename
    var newname= oldname+path.parse(f.originalname).ext
    fs.renameSync('./public/file/'+oldname,'./public/file/'+newname)
    res.send('/file/'+newname)
})




module.exports = router;