/**
 *  mongoose：
#           第三方模块、能够对我们mongoDB数据库便捷操作的对象模型工具

#   0.npm init -y

#   1.安装： npm install mongoose --save

#   2.创建一个连接数据库的文件：config/db.js这个文件是做连接数据库的操作
#     2.1  引入mongoose模块
#     2.2  定义一个url地址const url='mongdb://localhost:27017/text';
#     2.2.1  test代表数据库的名字'

#     回调函数的方式：
#     mongoose.connect(url,{useNewUrlParser:true},function(err,db){
#      if(err){
#        连接失败
#      }else{
#        连接成功
#      }
#     })

#     promise的方式
#     mongoose.connect(url,{useNewUrlParser:true})
#     .then(()=>{"成功"})
#     .catch(err=>{"失败"，err.message})

#     将mongoose暴露出去：modlue.exports=mongoose；
 */
//第一步引入mongoose模块
const mongoose=require('mongoose');
//定义一个url地址，末尾以你数据库命名
const url='mongodb://localhost:27017/mz'
//使用promise方式连接数据库
mongoose
.connect(url,{useNewUrlParser:true})
.then(()=>{
    console.log('连接成功');
})
.catch((err)=>{
    console.log('连接失败',err.massge);
})
//将mongoose暴露出去
module.exports=mongoose;