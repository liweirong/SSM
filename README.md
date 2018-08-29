彩虹系统
====
![](https://img.shields.io/badge/version-1.0.0-blue.svg) 
![](https://img.shields.io/badge/java-1.8%2B-brightgreen.svg) 
![](https://img.shields.io/badge/maven-3.0%2B-brightgreen.svg) 
![](https://img.shields.io/badge/node.js-8.0%2B-brightgreen.svg)
![](https://img.shields.io/badge/tomcat-8.5-brightgreen.svg)
![](https://img.shields.io/badge/mysql-5.7-brightgreen.svg)

```
* 开发环境：IDEA2018.1、Tomcat8.5、jdk1.8、mysql5.7
* 系统 CentOS Linux release 7.4.1708 (Core) (cat /etc/redhat-release)
* 数据库：MySql、elasticsearch、redis
* 前端主要使用vue.js、Bootstrap、echarts以及JQuery，
* 后端基于SpringMVC、Spring、MyBatis、shiro进行开发，使用Maven构建；idea插件：lombok、
（如果采用vue.js则采用前后端分离，目前系统作为后端系统，前端系统另拉分支）
* 三方服务： 邮件服务、谷歌双因子认证、七牛云文件服务、钉钉机器人服务、高德地图API
```
* **项目原型图管理地址：[墨刀](https://modao.cc/workspace/apps/p7D3CF01AB41533285900082)**
* **项目管理地址：[Testin](https://www.testin.cn/realmachine/index.htm)**
* **项目接口管理地址：[eolinker](https://www.eolinker.com/#/home/project/api/)**

## Table of Contents
<!-- GFM-TOC -->
* [一、项目设计想法](#project-design-idea)
* [二、项目计划](#project-plan)
* [三、项目进度](#project-progress)
* [四、目录结构](#file-structure)
* [五、实用网站](#useful-links)
* [六、项目检出启动](#quick-start)

<!-- GFM-TOC -->

# Project design idea
```项目设计想法```
> 该系统主要面向小情侣，方便对于金钱的管理，促使双方养成个好的习惯，不乱花钱，同时对生活产生一种仪式感，使感情更加融洽；
> 其他的用户主要用于日常账单的管理，单身的时候更加要精打细算，才能遇见更好的他/她。

# Project plan
```项目计划```
### 项目大纲-总模块列表
#### 1.用户（前台）
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
#### 2.管理员（后台管理）
* **日志管理** 主要针对敏感数据及危及系统的操作
* **数据维护** 导入及导出，备份，脱敏，加密
* **权限管理** 维护好管理员和用户的功能
* **反馈板块** 搜集系统不好的地方改进
* **用户管理** 维护客户关系，在线人数统计
* **积分管理** 对应礼物、娱乐系统，互动加积分

# Project progress
```项目进度```
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

# File Structure
```目录结构```  
Within the download you'll find the following directories and files:
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

# Useful Links
```实用网站```  
[Apache 官网](//apache.org/)<br>
[Stackoverflow](https://stackoverflow.com/)<br>
[Github（开源、代码托管）](https://github.com/)<br>
[About 云 ](//www.aboutyun.com/)<br>
[CSDN](//www.csdn.net/)<br>
[51CTO](//www.51cto.com/)

# Quick start
### 资源下载
- Maven [http://maven.apache.org/download.cgi](http://maven.apache.org/download.cgi "Maven")
- Redis [https://redis.io/download](https://redis.io/download "Redis")
- ActiveMQ [http://activemq.apache.org/download-archives.html](http://activemq.apache.org/download-archives.html "ActiveMQ")
- ZooKeeper [http://www.apache.org/dyn/closer.cgi/zookeeper/](http://www.apache.org/dyn/closer.cgi/zookeeper/ "ZooKeeper")
- Dubbo [http://dubbo.io/Download-zh.htm](http://dubbo.io/Download-zh.htm "Dubbo")
- Elastic Stack [https://www.elastic.co/downloads](https://www.elastic.co/downloads "Elastic Stack")
- Nginx [http://nginx.org/en/download.html](http://nginx.org/en/download.html "Nginx")
- Jenkins [http://updates.jenkins-ci.org/download/war/](http://updates.jenkins-ci.org/download/war/ "Jenkins")
- dubbo-admin-2.5.3 [http://download.csdn.net/detail/shuzheng5201314/9733652](http://download.csdn.net/detail/shuzheng5201314/9733652 "dubbo-admin-2.5.3")
- dubbo-admin-2.5.4-SNAPSHOT-jdk8 [http://download.csdn.net/detail/shuzheng5201314/9733657]

### 项目检出启动
#### 1、环境准备（mysql5.7，jdk1.8，maven3+，idea2018等安装对应版本lombok插件）
#### 2、git检出到本地（配置相关参数如maven仓库、jdk版本）
#### 3、修改数据库配置文件\resources\properties\jdbc.properties 文件中的数据库名和密码
#### 4、修改后初始化对应数据库脚本 \resources\sql\ssm.sql
#### 5、编译、打包、部署、启动

## 开发指南:
- 1、本机安装Jdk7、Mysql、Redis、Zookeeper、ActiveMQ并**启动相关服务**，使用默认配置默认端口即可
- 2、克隆源代码到本地并打开，**推荐使用IntelliJ IDEA**，本地编译并安装到本地maven仓库
### 框架规范约定
约定优于配置(convention over configuration)，此框架约定了很多编程规范，下面一一列举：
```

- service类，需要在叫名`service`的包下，并以`Service`结尾，如`CmsArticleServiceImpl`

- controller类，需要在以`controller`结尾的包下，类名以Controller结尾，如`CmsArticleController.java`，并继承`BaseController`

- spring task类，需要在叫名`task`的包下，并以`Task`结尾，如`TestTask.java`

- mapper.xml，需要在名叫`mapper`的包下，并以`Mapper.xml`结尾，如`CmsArticleMapper.xml`

- mapper接口，需要在名叫`mapper`的包下，并以`Mapper`结尾，如`CmsArticleMapper.java`

- model实体类，需要在名叫`model`的包下，命名规则为数据表转驼峰规则，如`CmsArticle.java`

- spring配置文件，命名规则为`applicationContext-*.xml`

- 类名：首字母大写驼峰规则；方法名：首字母小写驼峰规则；常量：全大写；变量：首字母小写驼峰规则，尽量非缩写

- springmvc配置加到对应模块的`springMVC-servlet.xml`文件里

- 配置文件放到`src/main/resources`目录下

- 静态资源文件放到`src/main/webapp/resources`目录下

- jsp文件，需要在`/WEB-INF/jsp`目录下

- `RequestMapping`和返回物理试图路径的url尽量写全路径，如：`@RequestMapping("/manage")`、`return "/manage/index"`

- `RequestMapping`指定method

- 模块命名为`项目`-`子项目`-`业务`，如`zheng-cms-admin`

- 数据表命名为：`子系统`_`表`，如`cms_article`

- 更多规范，参考[[阿里巴巴Java开发手册] http://git.oschina.net/shuzheng/zheng/attach_files

```
### 参与开发

首先谢谢大家支持，如果你希望参与开发，欢迎通过[Github](https://github.com/liweirong/SSM "Github")上fork本项目，并Pull Request您的commit。
作者QQ:2277839278 遇到问题可详聊

## 附件
### 在线小工具

- [在线Cron表达式生成器](http://cron.qqe2.com/ "在线Cron表达式生成器")

- [在线工具 - 程序员的工具箱](http://tool.lu/ "在线工具 - 程序员的工具箱")

### 在线文档

- [JDK7英文文档](http://tool.oschina.net/apidocs/apidoc?api=jdk_7u4 "JDK7英文文档")

- [Spring4.x文档](http://spring.oschina.mopaas.com/ "Spring4.x文档")

- [Mybatis3官网](http://www.mybatis.org/mybatis-3/zh/index.html "Mybatis3官网")

- [Dubbo官网](http://dubbo.io/ "Dubbo官网")

- [Nginx中文文档](http://tool.oschina.net/apidocs/apidoc?api=nginx-zh "Nginx中文文档")

- [Freemarker在线手册](http://freemarker.foofun.cn/ "Freemarker在线中文手册")

- [Velocity在线手册](http://velocity.apache.org/engine/devel/developer-guide.html "Velocity在线手册")

- [Bootstrap在线手册](http://www.bootcss.com/ "Bootstrap在线手册")

- [Git官网中文文档](https://git-scm.com/book/zh/v2 "Git官网中文文档")

- [Thymeleaf](http://www.thymeleaf.org/doc/tutorials/3.0/thymeleafspring.html "Thymeleaf")