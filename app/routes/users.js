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
			res.send(err)
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
//小说录入
router.post('/entering',(req,res) => {
	var json = req.body
	console.log(json);
	pool.conn({
		arr:[json.xs_name],
		sql:'select xs_name from fiction_type where xs_name=?',
		success(data){
			if(data.length){
				res.send('账号已存在');
			}else{
				// res.send('可以录入')
				pool.conn({
					arr:[json.xs_name,json.xs_author,json.xs_cover,json.xs_content,json.xs_uid,json.xs_zj],
					sql:'insert into fiction_type(xs_name,xs_author,xs_cover,xs_content,xs_uid,xs_zj)values(?,?,?,?,?,?)',
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
			res.send(err)
		}
	})
	// res.send('ok')
});
//自己录入的小说
router.get('/zl',(req,res)=>{
	var a = req.query.xs_uid
	console.log(a);
	pool.conn({
		arr:[a],
		sql:'select * from fiction_type where xs_uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ool')
})
//搜索
router.get('/search',(req,res)=>{
	var json = req.query
	console.log(json);
	pool.conn({
		arr:[json.xs_name],
		sql:'select * from fiction_type where xs_name like "%"?"%"',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//六本书
router.get('/sex',(req,res)=>{
	pool.conn({
		arr:[],
		sql:'select * from fiction_type limit 0,6',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//加入书架
router.post('/bookrack',(req,res)=>{
	var json = req.body;
	console.log(json);
	pool.conn({
		arr:[json.xsname],
		sql:'select xsname from bookrack where xsname=?',
		success(data){
			if(data.length){
				res.send('已经加入书架了');
			}else{
				
				pool.conn({
					arr:[json.xsimg,json.xsname,json.xsauthor,json.xstext,json.loginid],
					sql:'insert into bookrack(xsimg,xsname,xsauthor,xstext,loginid)values(?,?,?,?,?)',
					success(data){
						res.send('ok')
					},
					error(err){
						res.send(err)
					}
				})
				// res.send('可以录入')
			}
		},
		error(err){
			res.send(err)
		}
	})
	// pool.conn()
	// res.send('ok')
})
//书架列表
router.get('/bookrack_list',(req,res)=>{
	//
	pool.conn({
		arr:[],
		sql:'select * from bookrack',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//删除
router.get('/delete',(req,res)=>{
	 var json = req.query
	console.log(json);
	pool.conn({
		arr:[json.uid],
		sql:'delete from bookrack where uid=?',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
//评论
router.post('/comment',(req,res)=>{
	var json = req.body;
	console.log(json)
	pool.conn({
		arr:[json.img,json.mz,json.nr,json.loginuid],
		sql:'insert into comm(img,mz,nr,loginuid)values(?,?,?,?)',
		success(data){
			res.send('ok')
		},
		error(err){
			res.send(err)
		}
	})
	// res.send('ok')
})
//评论大厅
router.get('/pldt',(req,res)=>{
	var json = req.query
	console.log(json)
	pool.conn({
		arr:[],
		sql:' select * from comm',
		success(data){
			res.send(data)
		},
		error(err){
			res.send(err)
		}
	})
})
module.exports = router;
