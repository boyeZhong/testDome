- github全球最大的开源式的社交网站 代码托管网站

- svn：集中式版本控制工具
-      svn相对来说比较笨拙，在有些情况下会是收费的

- git：分布式的版本控制工具
-      git相对来说的好处
-      1、git可以创建多个分支，svn的分支比较笨拙
-      2、git在工作的时候会分为三个区域来保证代码的过渡效果
-         1、工作区---->本地的
-         2、暂存区---->为了起一个过渡效果  保证代码的安全
-         3、版本控制区
-      3、代码回退
-      4、版本控制
-      5、代码托管


- git linux语言编写

- pwd：查看当前文件的路径
- touch：创建文件
- mkdir：创建文件夹
- ls：列出当前文件夹所有东西
- cat

# git的基本命令

# 初始化仓库
- git int ---他会在你的项目文件夹里面创建一个git隐藏的文件夹

# 配置个人信息
- git config --global user.name "你的名字"---配置你的名字让队友知道这段代码是谁写的
- git config --global urer.email "你的邮箱"---配置你的邮箱让队友知道你的邮箱联系方式

# 查看你配置的信息
- git config --list ---会显示出你配置的信息

# 文件的提交
# 第一步暂存区
- git add 文件名---从工作区提交到暂存区

# 第二步版本库
- git commit -m "对当前提交版本的注释" ---从暂存区提交到版本库

# 查看当前代码状态
- git status ---如果有代码没有上传到暂存区会用红色文件名提示你，如果没有都是绿色名字

# 查看所有的版本，每次提交的作者
- git log ---他会显示每次提交的版本号以及修改的作者

# 版本回退
- git reset --hard HEAD^---回退到上一个版本
- git reset --hard HEAD^^---回退到上上个版本
- git reset --hard HEAD~N---回退到第N个版本 N是一个整数
- git reset --hard 版本号---回退到指定版本
- git reflog ---获得每次版本的版本号的缩写。

# 查看工作区，暂存区，版本库的不同之处
- git diff 文件名---工作区和版本库的区别，结尾区别
- git diff maseter 文件名 ---暂存区和版本库的区别，结尾区别

# 删除文件
- rm 文件名 ---删除该文件，但是可以通过版本回退拿回，前提是提交到了版本库，只是提交到暂存区不能回退
- git branch -D 分支名 ----删除本地分支
- git push origin --delete 分支名 ---删除远端分支


# 分支创建
- 尽量不要在主分支去操作代码
- git branch ----查看分支
- git branch 分支名 ---创建分支
- git checkout 分支名 ---切换到指定分支
- git checkout -b 分支名 ---切换并创建分支
- git remote show origin ---展示远端所有分支

# 保证每一台电脑上有一个秘钥
- 登陆你的github账号
- 点开头像点击设置
- 点击ssh and GPG keys
- 点击 new SSH key--->新建一个秘钥
- title 随便写自己起名字 key需要通过命令生产秘钥获得
- ssh-keygen -t rsa -C "邮箱"（之前上传代码的时候填写的用户邮箱）--->生产秘钥
- 三次回车之后看到一个图案生产秘钥成功
- cat ~/.ssh/id_rsa.pud --->查看秘钥，显示在命令行，将其复制粘贴在github里面key里面
- 也可以直接在c盘user文件里面的Administrator文件夹里找到.ssh文件夹里面的id_rsa.pub文件打开复制即可
- 保存

# git 工作流程 模拟三个人团队开发git工作流程

- 1、每台电脑都有一个秘钥，每个秘钥对应一台电脑，没有秘钥不能进行操作

# cto：代码托管:   
-                 1、在github上创建一个项目（仓库）
-                 2、Repository name:填写项目名称
-                 3、Decription：项目描述
-                 4、选择公开的还是私人的：public or private
-                 5、GitHub 可以免费无限制的为普通用户提供私有仓库服务了。虽然可以免费创建私有仓库了，但是还是有一点限制，免费私有仓库最多
-                    能添加三个协同操作者，这也就意味着适合小团队的项目协同管理。之前是需要收费的。2019年1月7号通过微博发布免费消息
-                 6、勾选：Initialize this repository with a README(自动帮你生产一个readme文件)

- 到公司第一步-->clone项目
- git clone 公司项目的地址（一定要选git开头的地址，也就是ssh，不能选择https开头的地址）
- 第二步-->打开文件编写代码
- git status
- git add 文件名
- git commit -m "CTO提交"
- git push
- 修改代码
- git status 查看代码提交状态
- git add 文件名
- git commit -m "CTO2"
- gti push 
- 此时已经托管到github上了
# 接到张三的通知，bug已经改好，现在需要代码合并（实际工作中需要三个人同意才能合并一个管理员一个cto）
- 此时cto电脑上没有张三的分支，需要将分支从github上拉下来
- git pull --->更新所有代码和分支 或者git fetch（只更新分支））
- git checkout gaibug -->切换到张三的分支
- git checkout master -->切换回master分支
- git merge gaibug  -->从主分支合并gaibug分支
- git push
# 接到李四的通知，已经开发好了，现在需要代码合并（实际工作中需要三个人同意才能合并一个管理员一个cto）
- 此时cto电脑上没有李四的分支，需要将分支从github上拉下来
- git fetch --->更新所有分支
- git checkout lisi -->切换到lisi的分支
- git checkout master -->切换回master分支
- git merge lisi  -->从主分支合并lisi分支
- git push

# 张三clone代码下来改bug
- git clone 公司项目的地址 zhangsan（这个表示克隆下来文件存放的文件夹的名字）
- git checkout -b gaibug 创建一个新的分支对代码进行修改
- git status 查看代码提交状态
- git add 文件名
- git commit -m "张三提交"
- git push --set-upstream origin gaibug 将张三创建的gaibug分支上传的github上面，因为之前cto创建项目的时候是没有这个分支的。
- 告诉cto，bug改好了，让cto合并代码
- 阮一峰git教程有一张图

# 李四clone代码下来开发
- git clone 公司项目的地址 lisi（这个表示克隆下来文件存放的文件夹的名字）
- git checkout -b lisi 创建一个lisi分支
- git add 文件名
- git commit -m "李四提交"
- git checkout master 回到主分支
- git pull --->更新所有代码和分支 或者git fetch（只更新分支）
- git checkout lisi 切换回lisi分支
- git merge master 从lisi分支合并主分支
- 会出现merge branch "master" into lisi：他是告诉你合并了哪些东西，出现了哪些问题，你可以输入一些东西，也可以不输入
- 按一下esc 输入:wq  回车 退出当前可编辑状态 
- git push --set-upstream origin lisi 将李四创建的lisi分支上传的github上面，因为之前cto创建项目的时候是没有这个分支的。



