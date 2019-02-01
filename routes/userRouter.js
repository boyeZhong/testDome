const express=require('express');
const UserModel=require('../models/userModel');
const router=express.Router();


//注册 /user/register
router.post('/register',(req,res)=>{
    //1.得到数据,前端传递过来的参数名，跟我这个表中的字段名相同
    //2.实例化用户对象
    let user =new UserModel(req.body)
    //let user=new UserModel({
    //    userName:req.body.userName,
    //    password:req.body.password
    //});
    //3.save方法
    user.save().then(()=>{
        res.json({
            code:0,
            msg:'注册成功'
        })
    }).catch(error=>{
        res.json({
            code:-1,
            msg:error.message
        })
    })
})
//登录 /user/login
router.post('/login',(req,res)=>{
    //1.得到数据,前端传递过来用户名密码
    let userName =req.body.userName;
    let password =req.body.password;
    //2、到数据库查询是否存在这个用户名
    UserModel.findOne({
        userName:userName,
        password:password
        //es6里面简写，key值和value值一样的话可以简写
        //userName，
        //password
    }).then(data=>{//这个data是findOne查询的结果，如果数据库里面有这个账号就会返回这个账号，没有就是返回一个null
        console.log(data);
        //判断，如果存在data有值的，不存在，data为null
        if(!data){
            res.json({
                code:-1,
                msg:'用户名或密码错误'
            })
        }else{
            //先设置cookie
            res.cookie('nickName',data.nickName,{//三个参数，第一个是key，第二个是值，第三个是cookie的过期时间
                maxAge:1000*60*10
            });
            if(data.isAdmin){
                res.cookie('admin',1,{
                    maxAge:1000*60*10
                })
            }
            res.json({
                code:0,
                msg:'登录成功',
                //将用户的昵称和管理员信息响应到前端
                data:{
                    id:data._id,
                    nickName:data.nickName,
                    isAdmin:data.isAdmin
                }
            })
        }
    }).catch(error=>{
        res.json({
            code:-1,
            msg:error.message
        })
    })
})

module.exports=router;