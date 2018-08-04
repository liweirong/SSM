bug记录
-----
**序号**: 1 
**时间**: 2018/6/19
**步骤**: junit测试 testTestPOJO
**结果**: java.lang.IllegalStateException: Failed to load ApplicationContext
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Caused by: org.xml.sax.SAXParseException; lineNumber: 1; columnNumber: 1; 前言中不允许有内容。
最后下面两个注解  @TransactionConfiguration(defaultRollback = true) //事务
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@WebAppConfiguration// 解决WebApplicationContext无法注入问题
    后报错：java.lang.NoClassDefFoundError: javax/servlet/SessionCookieConfig    
**错误原因**: Spring4 与servlet2.5兼容性问题
**解决方案**: 添加相关的jar包 javax.servlet
** *************************************************************************************************************************** ** ***************************************************************************************************************************
**序号**: 2  
**时间**: 2018/6/19
**步骤**: junit测试 testGetUser
**结果**: org.apache.ibatis.binding.BindingException: Invalid bound statement (not found): com.iris.dao.UserMoneyDetailMapper.selectByExample
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;at com.iris.service.impl.MoneyServiceImpl.findAllUserMoneyByUserId(MoneyServiceImpl.java:45)
**错误原因**：xml的namespace写错，是接口的全路径，而不是本包名
**解决方案**: 1首先确保xml中的namespace配置是你的接口全类名，而不是包名！<mapper namespace="com.iris.dao.UserMoneyDetailMapper">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 确认dao接口中的方法，和xml中一一对应，返回类型，参数都正确。
** *************************************************************************************************************************** ** ***************************************************************************************************************************    
**序号**: 3 
**时间**: 2018/6/21
**步骤**: junit测试 MoneyserviceImpl.FindAllUserMoneyByUserId
**结果**: java.lang.NoClassDefFoundError: javax/servlet/SessionCookieConfig
           at org.springframework.test.context.web.AbstractGenericWebContextLoader.configureWebResources(AbstractGenericWebContextLoader.java:182) 
**错误原因**: Spring4 与 的兼容性问题
**解决方案**: 添加相关的jar包 geronimo-servlet_3.0_spec
** *************************************************************************************************************************** ** ***************************************************************************************************************************    
**序号**: 4 
**时间**: 2018/6/26
**utf8 & utf8mb4**
问题的症结在于，MySQL 的“utf8”实际上不是真正的 UTF-8。“utf8”只支持每个字符三个字节，而真正的 UTF-8 是每个字符最多四字节
MySQL 一直没有修复这个 bug，他们在 2010 年发布了一个叫作“utf8mb4”的字符集，绕过了这个问题。当然，他们并没有对新的字符集广而告之（可能是因为这个 bug 让他们觉得很尴尬），以致于现在网络上仍然在建议开发者使用“utf8”，但这些建议都是错误的。
简单概括如下：
MySQL 的“utf8mb4”是真正的“UTF-8”。
MySQL 的“utf8”是一种“专属的编码”，它能够编码的 Unicode 字符并不多。
我要在这里澄清一下：所有在使用“utf8”的 MySQL 和 MariaDB 用户都应该改用“utf8mb4”，永远都不要再使用“utf8”。
[转载出处](https://www.toutiao.com/a6571196568651694596/?iid=36498010015&app=news_article&timestamp=1530008837)
<a href="https://my.oschina.net/leejun2005/blog/343353"> *关于 MySQL UTF8 编码下生僻字符插入失败/假死问题的分析* </a>
** *************************************************************************************************************************** ** ***************************************************************************************************************************    

