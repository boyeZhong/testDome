//提供前端ajax调用的接口地址，url页面渲染的路由
const express =require('express');
//引入之前的创建好的模型
const BannerModel=require('../models/bannerModels');
const path=require('path');
const fs = require('fs');
const multer=require('multer');
const upload=multer({
    dest:'D:/codeDome/tmp'
})
const async=require('async');
//创建一个路由
const router=express.Router();

//首页http://localhost:3000/banner/add
router.post('/add',upload.single('bannerImg'),(req,res)=>{
     //1.操作文件，将上传的文件移动到public文件夹的uploads里面的banners文件夹里面
     //指定文件名为 时间戳+"_"+原文件文件名
     let newFileName=new Date().getTime()+"_"+req.file.originalname;   //req.file.originalname是中间函数提供的file属性的属性值
     //指定文件保存新路径
     let newFilePath=path.resolve(__dirname,'../public/uploads/banners',newFileName);
     //2.文件移动操作
     try{
         //读上传的文件，并保存在data变量
        let data=fs.readFileSync(req.file.path);
        //将读到的data文件写入新的路径中
        fs.writeFileSync(newFilePath,data);
        //删除源文件
        fs.unlinkSync(req.file.path);
        //文件名+banner图的名字给写入数据库
        
        let banner=new BannerModel({
            name:req.body.bannerName,
            imgUrl:'http://localhost:3000/uploads/banners/'+newFileName
        });
        banner.save().then(()=>{
            res.json({
                code:0,
                msg:'ok'
            })
        }).catch(error=>{
            res.json({
                code:-1,
                msg:error.message
            })
        })

     }catch(error){
        res.json({
            code:-1,
            msg:error.message
        })
     }
    /**
     * //获取前端传递过来的参数
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
     */
    
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

//删除 - http://localhost:3000/banner/delete
router.post('/delete',(req,res)=>{
    //得到要删除的字段
    let id=req.body.id;
    //操作BannerModel 删除方法
    BannerModel.deleteOne({
        _id:id
    }).then((data)=>{
        console.log(data);
        if(data.deletedCount>0){
            res.json({
                code:0,
                msg:'ok'
            })
        }else{
            return Promise.reject(new Error('未找到相关数据'))
            //res.json({
               // code:-1,
               // msg:'未找到数据'
           // })
        }
        
    }).catch(error=>{
        res.json({
            code:-1,
            msg:error.massage
        })
    })
})
//将router暴露出去
module.exports=router;