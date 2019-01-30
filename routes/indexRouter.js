//页面渲染的路由
const express =require('express');
//创建一个路由
const router=express.Router();

//首页http://localhost:3000/
router.get('/',(req,res)=>{
    //在这里渲染一个页面出去
    res.render('index');//他会自己去views文件夹里去找index文件
});
//banner页
router.get('/banner.html',(req,res)=>{
    res.render('banner');
})

//将router暴露出去
module.exports=router;