(function () {
    /**
     * 定义这个文件操作的构造函数
     */
    var Banner = function () {
        //定义一个页面需要的一些数据
        this.pageNum = 1; //当前页码数
        this.pageSize = 2; //每页显示的条数
        this.totalPage = 0; //总的页数
        this.bannerList = []; //banner数据

        //前端性能优化dom缓存
        //需要用的dom对象，作为dom缓存，减少服务器负担和带宽消耗

        this.dom = {
            table: $('#banner-table tbody'), //table的tbody
            pagination: $("#pagination"), //分页ul
            nameInput: $('#exampleInputEmail1'), //名字输入框
            urlInput: $('#exampleInputPassword1'), //url输入框
            addModal: $('#myModal'), //新增的模态框
            submitAdd: $('#bannerAdd'), //确认新增的按钮
        }
    }
    //新增的方法
    Banner.prototype.add = function () {
        //发送ajax请求
        var that = this;
        $.post('/banner/add', {
            bannerName: this.dom.nameInput.val(), //获取页面添加框的val值传到后台
            bannerUrl: this.dom.urlInput.val() //获取页面添加框的val值传到后台
        }, function (res) {
            if (res.code === 0) {
                layer.msg('添加成功');
            } else {
                //很多时候，正在的错误信息不回给用户去看
                console.log(res);
                layer.msg('网络异常，请稍后再试');
            }
            //调用模态框的隐藏显示方法model（来自bootstarp）
            that.dom.addModal.modal('hide');
            //手动清空输入框的内容
            that.dom.nameInput.val('');
            that.dom.urlInput.val('');
        });
    }
    //查询方法
    Banner.prototype.search = function () {
        var that = this;
        $.get('/banner/search', {
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }, function (result) {
            if (result.code === 0) {
                layer.msg('查询成功');
                //将result.data写入到实例的bannerList
                that.bannerList = result.data;
                //将result.totalPage写入到实例的totalPage
                that.totalPage = result.totalPage;
                //调用渲染table
                that.renderTable();
                //调用渲染分页
                that.renderPage();
            } else {
                console.log(result.msg)
                layer.msg('网络异常请稍后')
            }
        })
    }
    //将所有的 dom 事件操作放在这里面
    Banner.prototype.bindDOM = function () {
        var that = this;
        console.log(this.dom.submitAdd);
        //点击确认新增按钮需要调用 add
        this.dom.submitAdd.click(function () {
            that.add();
        })

        //分页按钮点击事件
        this.dom.pagination.on('click','li',function(){//事件委托
            //通过自定义属性data-num得到页码
            //attr 获取属性，如果是自定义属性，并且用data-开头，我们可以更简单实用data
            // $(this).attr('data-num')=$(this).data('num')
            var num=parseInt($(this).data('num'));
            //判断这次点击的页码是不是当前页，如果是当前页,或者小于1，或者大于最大页数就不做渲染
            if(that.pageNum==num||num<1||num>that.totalPage){
                return;
            }
            //设置给this.pageNum
            that.pageNum=num;
            
            //再次调用一下this.search
            that.search();


        })
    }
    /**
     * 渲染分页
     */
    Banner.prototype.renderPage = function () {
        //给上一页和下一页按钮添加disabled属性，来自bootstrap的css类名
        var prevClassName=this.pageNum===1?'disabled':'';
        var nextClassName=this.pageNum===this.totalPage?'disables':'';
        //清空
        this.dom.pagination.html('');
        //添加上一页
        this.dom.pagination.append(
            //当前页－1就是上一页
            `
            <li class=${prevClassName} data-num='${this.pageNum-1}'>
                <a href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            
            `
        )
        //根据this.totalpage循环渲染多少个li
        for(var i=1;i<=this.totalPage;i++){
            this.dom.pagination.append(
                `
                <li class="${this.pageNum===i?'active':''}" data-num='${i}'><a href='#'>${i}</a></li>
                `
                //data-num自定义属性
            )
        }
        //添加一个下一页
        this.dom.pagination.append(
            `
            <li class=${nextClassName} data-num='${this.pageNum+1}'>
                <a href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
            `
        )
    }
    /**
     * 渲染table
     */
    Banner.prototype.renderTable = function () {
        //先清空再渲染
        this.dom.table.html('')
        for (var i = 0; i < this.bannerList.length; i++) {
            var item = this.bannerList[i];
            this.dom.table.append(
                `
                            <tr>
                                <td>${item._id}</td>
                                <td>${item.name}</td>
                                <td>
                                    <img class="banner-img" src='${item.imgUrl}'
                                </td>
                                <td>
                                <a href='javascript:;'>删除</a>
                                <a href='javascript:;'>修改</a>
                                </td>
                            </tr>
                            `
            )
        }
    }
    //最后 实例化banner对象，调用方法
    $(function(){
        var banner = new Banner();
        banner.bindDOM();
        banner.search();//默认渲染第一页
    })
})();










// //banner页面的JavaScript文件
// $(function(){
//     var pageNum=1;
//     var pageSize=2;
//     //默认调用一次search
//     search(pageNum,pageSize);

//     //点击模态框的确认按钮发送ajax请求并且关闭模态框
//     $("#add_banner").click(function(){
//         //发送ajax请求
//         $.post('/banner/add',{
//             bannerName:$('#exampleInputEmail1').val(),//获取页面添加框的val值传到后台

//             bannerUrl:$('#exampleInputPassword1').val()//获取页面添加框的val值传到后台
//         },function(res){
//             if(res.code===0){
//                 layer.msg('添加成功'); 
//             }else{
//                 console.log(res);
//                 layer.msg('网络异常，请稍后再试'); 
//             }
//         })

//         //调用模态框的隐藏显示方法model（来自bootstarp）
//         $('#addModal').modal('hide');
//         $('#exampleInputEmail1').val('');
//         $('#exampleInputPassword1').val('·');
//     })
//     /**
//      * 查询banner数据的方法
//      */
//     function search(pageNum,pageSize){
//         $.get('/banner/search',{
//             pageNum:pageNum,
//             pageSize:pageSize
//         },function(result){
//             if(result.code===0){
//                 layer.msg('查询成功');

//                 for(var i=0;i<result.data.length;i++){
//                     var item=result.data[i];
//                     $('#banner-table tbody').append(
//                         `
//                         <tr>
//                             <td>${item._id}</td>
//                             <td>${item.name}</td>
//                             <td>
//                                 <img class="banner-img" src='${item.imgUrl}'
//                             </td>
//                             <td>
//                             <a href='javascript:;'>删除</a>
//                             <a href='javascript:;'>修改</a>
//                             </td>
//                         </tr>
//                         `
//                     )
//                 }
//             }else{
//                 console.log(result.msg)
//                 layer.msg('网络异常请稍后')
//             }
//         })
//     }
// })