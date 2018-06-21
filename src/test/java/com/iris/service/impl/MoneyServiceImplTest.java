package com.iris.service.impl;

import com.iris.model.UserMoneyDetail;
import com.iris.service.MoneyService;
import com.iris.testUtils.BaseControllerTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by lwrong on 2018/6/21.
 */
public class MoneyServiceImplTest extends BaseControllerTest {

    @Autowired
    private MoneyService moneyService;
    @Test
    public void testFindAllUserMoneyByUserId() throws Exception {
        Long userId = 1L;
        String year = "2018";
        Integer start = 0;
        Integer limit = 15;
        ArrayList<UserMoneyDetail>  list = moneyService.findAllUserMoneyByUserId( userId,  year,  start,  limit);
        System.out.println(list.size());
    } // 1 成功

    @Test
    public void testFindUserMoneyDetailByUserId() throws Exception {
        Long userId = 1L;
        List<String> list = new ArrayList<>();
       // list.add("monery");
        Date startTime = new Date(0);
        Date endTime = new Date();
        Integer start = 0;
        Integer limit = 15;
        ArrayList<UserMoneyDetail> lisy =  moneyService.findUserMoneyDetailByUserId(userId,list,startTime,endTime ,start,limit);
        System.out.println(lisy.size());
    }
}