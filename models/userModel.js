const db = require('../config/db');
//下面是数据库里面的数据属性设置
const schema= new db.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true//必须输入
    },
    nickName:{
        type:String,
        default:'小用户'//设置默认值
    },
    isAdmin:{
        type:Number,
        default:0//默认是0 ，0 表示不是管理员
    }
});
module.exports=db.model('user',schema);//user是表名的单数形式，基于schema，这样就会在数据库里面创建一个表，名字是users
