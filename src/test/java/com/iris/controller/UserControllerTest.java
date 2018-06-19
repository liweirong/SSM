package com.iris.controller;

import com.iris.model.User;
import com.iris.model.UserMoneyDetail;
import com.iris.service.MoneyService;
import com.iris.service.UserService;
import com.iris.testUtils.BaseControllerTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

/**
 * Created by lwrong on 2018/6/15.
 */
public class UserControllerTest extends BaseControllerTest {

    @Autowired
    private MoneyService moneyService; //注意，这里要用接口，因为用到了spring的AOP
    @Autowired
    private UserService userService;
    @Test
    public void testUserService() throws Exception {

    }
    @Test
    public void testTestPOJO() throws Exception {
        String id = "1";
        User user = userService.getUser(id);
        System.out.println(user.getUserName()+ "|" + user.getPassword());
    }//测试名d|sfasgfaf     成功2018/6/19

    @Test
    public void testGetUser() throws Exception {
        ArrayList<UserMoneyDetail> UserMoneyDetail = moneyService.findAllUserMoneyByUserId(1L,"2018",0,10);
        System.out.println(UserMoneyDetail.get(0).getId());
    }//1  成功2018/6/19
    @Test
    public void testUserManager() throws Exception {

    }

    @Test
    public void testTest1() throws Exception {

    }


}