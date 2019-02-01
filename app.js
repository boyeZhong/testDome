//项目入口

//引入各模块
const express=require('express');
const cookieParser=require('cookie-parser');
const path=require('path');
//实例化express
const app=express();

//引入路由中间件
const indexRouter=require('./routes/indexRouter');//自定义的路由文件
const bannerRouter=require('./routes/bannerRouter');//引入添加banner路由
const userRouter=require('./routes/userRouter')//引入user路由

//设置静态文件托管,也是使用绝对路径
app.use(express.static(path.resolve(__dirname,'./public')));

//使用中间件函数
app.use(cookieParser());
//以下2个中间件事post请求所需
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//设置模板引擎路径和使用的什么模板引擎，先要通过npm安装你需要引擎
app.set('views',path.resolve(__dirname,'./views'))//设置文件路径，需要用到path绝对路径的方法resolve
app.set('view engine','ejs');//设置使用ejs引擎，需要安装

//使用路由中间件（路由都写在routes文件夹）
app.use('/',indexRouter);//设置好路由以后可以尝试启动，启动可以修改package.json文件。添加start：nidemon（启动方式） app.js（启动文件）
app.use('/banner',bannerRouter);//点击添加banner的路由
app.use('/user',userRouter)//用户管理的路由

//监听端口号
app.listen(3000);