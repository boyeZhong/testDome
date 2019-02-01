(function(){
    var User=function(){
        this.btnLock=false;//登录按钮的锁
       // this.userName='';
       // this.password='';
        this.dom={
            submitBtn:$('#btn'),
            userNameInput:$('input[type=text]'),
            passwordInput:$('input[type=password')
        }
    }
    User.prototype.binDom=function(){
        var that=this;
        this.dom.submitBtn.click(function(){
            //发送ajax之前先要判断是否有锁
            if(!that.btnLock){//默认是false
                that.btnLock=true;//没锁的时候，加把锁，并发送请求
                that.handleLogin();//在请求结束后再解锁
            }
            
        })

    }
    /**
     * 登录方法，调用ajax
     */
    User.prototype.handleLogin=function(){
        var that=this;
        $.post('/user/login',{
            userName:this.dom.userNameInput.val(),
            password:this.dom.passwordInput.val()
        },function(res){
            if(res.code===0){
                //登录成功
                layer.msg('登录成功');
                //跳转首页
                setTimeout(function(){
                window.location.href='/';
                },500)
                
            }else{
                //登录失败
                layer.msg(res.msg);
            }
            //记得解锁
            that.btnLock=false;
        })
    }
    //实例化user对象
    var user=new User();
    user.binDom();
})();