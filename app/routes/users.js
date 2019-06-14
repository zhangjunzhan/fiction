var express = require('express');
var pool = require('./pool')
var router = express.Router();
//注册
router.post('/up',(req,res) => {
	var json = req.body
	console.log(json);
	pool.conn({
		arr:[json.user],
		sql:'select user from login where user=?',
		success(data){
			if(data.length){
				res.send('账号已存在');
			}else{
				pool.conn({
					arr:[json.img,json.names,json.user,json.pass],
					sql:'insert into login(img,names,user,pass)values(?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
			}
		},
		error(err){
			res.send(arr)
		}
	})
	// res.send('ok')
});
//登录
router.post('/ins',(req,res)=>{
	var json = req.body;
	console.log(json)
	pool.conn({
		arr:[json.user,json.pass],
		// console.log(arr)
		sql:'select * from login where user=? and pass=?',
		success(data){
			if(data.length){
				data[0].pass = '';
				res.send(data[0])
					

			}else{
				res.send('ok')

			}
		},
		error(err){
			res.send(err)
		}
	})
})
module.exports = router;
