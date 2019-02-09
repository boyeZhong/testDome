 const express=require('express');
 const multer=require('multer');
 const path=require('path');
 const fs=require('fs');
 //调用multer得到一个upload的对象
 //upload对象有很多方法
 //upload.single() 单个文件上传，这个方法返回的是一个中间件函数
 //upload.array()多个文件上传，也是返回一个中间件函数
//upload.fields([{name：input-name-value，maxCount：n}，{name：input-name-value，maxCount：n}]，)多个input框上传多个文件
 const upload = multer({
     dest:'D:/codeDome/tmp',//设置文件的存放目录
 })

 const app=express();

 //单个文件的上传操作
 app.post('/upload',upload.single('avatar'),(req,res)=>{
     res.send(req.file);
        //为了要将图片生产一个url地址给客户端页面进行访问
        //1.将文件移动到当前目录的public文件夹下。
        //2.对文件名做一个修改
        //3.命名规则：当前时间戳+“_”+源文件名
        let newFileName=new Date().getTime()+'_'+req.file.originalname;
        //新的存放路径
        let newFilePath=path.resolve(__dirname,'./public/uploads/'+newFileName);
        try{
            //读取上传文件的数据用data保存
            let data=fs.readFileSync(req.file.path);
            //将读取到的数据data保存到，新存放的路径中去
            fs.writeFileSync(newFilePath,data);
            //删除原来上传得到的源文件
            fs.unlinkSync(req.file.path);
            //接下来我们将图片的路径存放到数据库中就好了。
        }catch(error){
            res.json({
                code:-1,
                msg:error.message
            })
        }
        
 })

 /**
  * 此时可以通过postman软件测试这个能否运行
  * 请求选择post 在body里面选择form-data格式，key选择files格式并填入avatar，value选择你要上传的文件
  * 得到一个对象
  * {
    "fieldname": "avatar",这个就是input-name-value 
    "originalname": "20161204_IMG_5939.JPG"，上传的原始文件名字
    "encoding": "7bit",文件encode格式
    "mimetype": "image/jpeg",文件类型格式
    "destination": "D:/codeDome/tmp",文件存放目录
    "filename": "f4d1434d90409620c9b1799654021b43",文件上传之后的名字
    "path": "D:\\codeDome\\tmp\\f4d1434d90409620c9b1799654021b43",上传之后的完整路径
    "size": 117012文件大小字节单位
}
  */


 app.listen(3000);