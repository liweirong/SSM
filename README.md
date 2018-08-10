彩虹系统
====
```
* 开发环境：IDEA2018.1、Tomcat8.5、jdk1.8、mysql5.7
* 系统 CentOS Linux release 7.4.1708 (Core) (cat /etc/redhat-release)
* 数据库：MySql、elasticsearch、redis
* 前端主要使用vue.js、Bootstrap、echarts以及JQuery，
* 后端基于SpringMVC、Spring、MyBatis、shiro进行开发，使用Maven构建；idea插件：lombok、
（如果采用vue.js则采用前后端分离，目前系统作为后端系统，前端系统另拉分支）
* 三方服务： 邮件服务、阿里云短信服务、七牛云文件服务、钉钉机器人服务、高德地图API
```
* **项目原型图管理地址：[墨刀](https://modao.cc/workspace/apps/p7D3CF01AB41533285900082)**
* **项目管理地址：[Testin](https://www.testin.cn/realmachine/index.htm)**
* **项目接口管理地址：[eolinker](https://www.eolinker.com/#/home/project/api/)**

## Table of Contents
<!-- GFM-TOC -->
* [一、项目设计想法](#project design idea)
* [二、项目计划](#二项目计划)
    * [项目大纲-总模块列表](#项目大纲-总模块列表)
* [三、项目进度](#三项目进度)
* [四、目录结构](#四目录结构)
* [五、实用网站](#五实用网站)
* [六、项目检出启动](#六项目检出启动)

<!-- GFM-TOC -->

# Project design idea
项目设计想法
> 该系统主要面向小情侣，方便对于金钱的管理，促使双方养成个好的习惯，不乱花钱，同时对生活产生一种仪式感，使感情更加融洽；
> 其他的用户主要用于日常账单的管理，单身的时候更加要精打细算，才能遇见更好的他/她。

# 二、项目计划
## 项目大纲-总模块列表
### 1.用户
* **登录注册**  邮件接口，短信接口
* **房租模块**  生活消费的分支，图片服务器发票
* **账单管理**  生活消费
* **情绪管理**  图表直观
* **运动管理**  外设接口
* **礼物推荐**  快递接口，购物车模块
* **软文推送**  评论及回复
* **娱乐系统**  微信小游戏，网页小游戏
* **常用工具模块** 生活便利，自定义网站、常用工具
* **日程管理** 自定义节日、法定节假日的提醒及推荐 - 邮件、短信提醒
* **好友动态** 互动
* **情侣互聊** 互动
### 2.后台管理
* **日志管理** 主要针对敏感数据及危及系统的操作
* **数据维护** 导入及导出，备份，脱敏，加密
* **权限管理** 维护好管理员和用户的功能
* **反馈板块** 搜集系统不好的地方改进
* **用户管理** 维护客户关系，在线人数统计
* **积分管理** 对应礼物、娱乐系统，互动加积分

# 三、项目进度

* 原型图
- [x] 后台原型图 
- [x] 首页原型图 

* 后端部分
- [x] 接口的完善及调试  ✔  （主要为了引入junit单元测试）
- [x] 登录注册 
- [x] 管理用户 
- [x] 权限管理 登录和不登录的接口权限
- [x] 管理员设置

* 前段部分
- [x] vue环境的部署  ✔
- [x] vue的学习 --前段项目小demo ✔
- [x] vue搭建前端系统
- [x] 登录注册页面
- [x] 管理员登录页面
- [x] 各个前端页面的设计
- [x] 接口联调

* 还未考虑好的：针对后期数据可能集成elasticsearch 等针对大数据量的数据库（用户量大的情况），接入其他缓存服务器redis等

# 四、目录结构
```
├── ssm
│   ├── src                  
│   │   ├── main                
│   │   │   ├── java/com/iris             
│   │   │   │   ├── annotation           // 自定义注解等
│   │   │   │   ├── controller           // 控制层
│   │   │   │   ├── dao                  // dao接口层
│   │   │   │   ├── mapper               // mybatis的 xml 层
│   │   │   │   ├── model                // 实体类
│   │   │   │   ├── service              // service接口层
│   │   │   │   │   ├── impl            // service接口的实现层
│   │   │   │   ├── shiro                // 采用shiro，实现用户的登录与权限控制等
│   │   │   │   ├── utils                // 工具类，包括常量类（运用枚举）、获取ip地址、xss转义、序列化类等
│   │   │   ├── resources                 // 配置资源
│   │   │   ├── webapps        
│   │   │   ├── css                       // 样式
│   │   │   ├── images                    // 图片
│   │   │   ├── js                        // 存放js目录
│   │   │   │   ├── WEB-INF             
│   │   │   │   │   ├── view            // 存放jsp目录
│   │   │   │   │   ├── web.xml          
│   │   │   │   ├── static               // 静态资源
│   │   ├── test                           // junit单元测试
│   │   │   ├── java/com/iris             // junit单元测试各层
│   │   │   ├── resources                 // junit配置资源及插件配置
│   └── pom.xml                             // maven管理的 pom 文件
│   └── README.md
```


# 五、实用网站
[Apache 官网](//apache.org/)<br>
[Stackoverflow](https://stackoverflow.com/)<br>
[Github（开源、代码托管）](https://github.com/)<br>
[About 云 ](//www.aboutyun.com/)<br>
[CSDN](//www.csdn.net/)<br>
[51CTO](//www.51cto.com/)

# 六、项目检出启动
#### 1、环境准备（mysql5.7，jdk1.8，maven）
#### 2、git检出到本地（配置相关参数如maven仓库、jdk版本）
#### 3、修改数据库配置文件\resources\properties\jdbc.properties 文件中的数据库名和密码
#### 4、修改后初始化数据库脚本 \resources\sql\ssm.sql
#### 5、编译、打包、部署、启动

作者QQ:2277839278 遇到问题可详聊
