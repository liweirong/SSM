package com.iris.testUtils;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

/**
 * Created by lwrong on 2018/6/15.
 */
//配置spring和junit整合，这样junit在启动时就会加载spring容器
@RunWith(value = SpringJUnit4ClassRunner.class)
//告诉junit spring配置文件
@ContextConfiguration({"classpath*:conf/spring.xml",
        "classpath*:conf/spring-mvc.xml",
        "classpath*:conf/spring-mybatis.xml",
        "classpath*:conf/mybatis-config.xml"
})
//事务
@TransactionConfiguration(defaultRollback = true)
// 解决WebApplicationContext无法注入问题
@WebAppConfiguration
public class BaseControllerTest {

}