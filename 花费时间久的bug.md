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