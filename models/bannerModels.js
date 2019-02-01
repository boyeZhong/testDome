// 3.创建一个模型文件，（就是对数据库中某个集合做操作的文件）
// #     3.1 schema 描述某个集合的数据结构的。（如：用户名密码id一类的信息）
// #     3.2 基于schema  创建    model 并暴露出去
// #     创建一个models文件夹，创建user.js文件。（对应集合user）
// #     引入config/db.js文件
// #     定义schema，调用schema中的构造函数，定义user这个集合的字段信息，制定value的数据类型如{name：string}，但是不要写死。
// #     字段信息里面：userName：{
// #                   type：string，
// #                   required:true,必须要由用户名这个字段
// #                   default:'张三'
// #                   }，
// #                  createTime：{
// #                   type：Date，
// #                   default：Date.now（获取创建的时间，并且转换成毫秒）
// #                   }
// #                   defult:可以指定时间，指定字符串，指定函数
// #     基于上面定义的schema，暴露modle，第一个参数是数据库中集合的单数形式
// #                   module.exports=db.model('user',schema)

//引入自己创建的数据库db
const db=require('../config/db.js');
//定义schema，调用schema中的构造函数
const schema=new db.Schema({
    //定义db数据库中集合的字段信息
    name:String,//写数据类型
    imgUrl:String,
    urlName:String
});
//基于上面定义的schema，暴露modle，第一个参数是数据库中集合的单数形式
module.exports=db.model('banner',schema);
//ps:最终就能得到db.js中定义的数据库，库里面有一个有上面定义的banner表