//提供前端ajax调用的接口地址，url页面渲染的路由
const express =require('express');
//引入之前的创建好的模型
const BannerModel=require('../models/bannerModels');
const async=require('async');
//创建一个路由
const router=express.Router();

//首页http://localhost:3000/banner/add
router.post('/add',(req,res)=>{
    //获取前端传递过来的参数
    let banner=new BannerModel({
        name:req.body.bannerName,
        imgUrl:req.body.bannerUrl
    });
    //连接数据库
    banner.save((err)=>{
        if(err){
            //返回前端信息
            //失败
            res.json({
                code:-1,
                msg:err.massage
            })

        }else{
            //成功
            res.json({
                code:0,
                msg:'ok'
            })
        }
    })
});

//搜索or查询banner-http://localhost:3000/banner/search
router.get('/search',(req,res)=>{
    //需要做分页，前端需要传数据过来
    //1、得到前端传递过来的参数
    let pageNum=parseInt(req.query.pageNum ) || 1;//当前的页
    let pageSize=parseInt(req.query.pageSize) || 2;//每页显示的条数
   // let totalSize=0;//总的条数
    //使用并行无关联，在最终的回调函数做处理
    async.parallel([
        function(cb){
            BannerModel.find().count().then(num=>{
                //totalSize=num;
                cb(null,num);
            }).catch(err=>{
                cb(err);
            })
        },
        function(cb){
            BannerModel.find().skip(pageNum*pageSize-pageSize).limit(pageSize)
            .then(data=>{//promise方式
                cb(null,data);
            }).catch(err=>{
               cb(err);
            })
        }
    ],
    function(err,result){
        // console.log(result);
        if(err){
            res.json({
                code:-1,
                msg:err.massage
            })
        }else{
            res.json({
                code:0,
                msg:'ok',
                data:result[1],
                totalPage:Math.ceil(result[0]/pageSize),//可以分为几页
                totalSize:result[0]//一共多少条数据
            })
        }
    });
    //获取有多少条数据，才能判断分页数量
    // BannerModel
    // .find()
    // .count()
    // .then(num=>{
    //     totalSize=num;
    //     console.log(num);
    //     res.json({
    //         code:0,
    //         msg:'ok',
    //         data:num//result是前端传来的数据
    //     })
    // })
    // .catch(err=>{
    //     console.log(err.massage);
    //     res.json({
    //         code:-1,
    //         msg:err.massage
    //     })
    // })
    // //分页
    // BannerModel
    // .find()
    // .skip(pageNum*pageSize-pageSize)//跳过多少
    // .limit(pageSize)
    // .then(result=>{//promise方式
    //     console.log(result);
    //     res.json({
    //         code:0,
    //         msg:'ok',
    //         data:result,//result是前端传来的数据
    //         totalSize:totalSize//将上面获取到总条数返回给前端
    //     })
    // })
    // .catch(err=>{
    //     console.log(err.massage);
    //     res.json({
    //         code:-1,
    //         msg:err.massage
    //     })
    // })
    // BannerModel.find(function(err,data){
    //     if(err){
    //         console.log('查询失败');
    //         res.json({
    //             code:-1,
    //             msg:err.massage
    //         })
    //     }else{
    //         console.log('查询成功');
    //         res.json({
    //             code:0,
    //             msg:'ok',
    //             data:data
    //         })
    //     }
    // })
});
//将router暴露出去
module.exports=router;