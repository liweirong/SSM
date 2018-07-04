package com.iris.service.impl;

import com.iris.model.UserMoneyDetail;
import com.iris.service.MoneyService;
import com.iris.testUtils.BaseControllerTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
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
    } //成功
    @Test
    public void testFindUserMonthMoneyDetailByUserId() throws Exception {
        Long userId = 1L;
        String year = "2018";
        String month = "01";
        Integer start = 0;
        Integer limit = 15;
        ArrayList<UserMoneyDetail> list = moneyService.findUserMonthMoneyByUserId(userId,  year, month, start,  limit);
        System.out.println(list.size());
    }//成功

    @Test
    public void testDeleteByUserId() throws Exception {
        long[] ids = new long[]{2L};
        boolean bool = moneyService.deleteMoneyDetailById(1L,ids);
        System.out.println(bool);
    }//成功

    @Test
    public void testSaveORUpdate() throws Exception {
        UserMoneyDetail userMoneyDetail = new UserMoneyDetail();
        userMoneyDetail.setId(2L);
        userMoneyDetail.setUserId(1L);
        userMoneyDetail.setGoodsName("good");
        userMoneyDetail.setMoney(11D);
        userMoneyDetail.setMakeDate(new Timestamp(new Date().getTime()));
        userMoneyDetail.setDelete(0);
        userMoneyDetail.setCreateDate(new Timestamp(new Date().getTime()));
        userMoneyDetail.setType("1");
        userMoneyDetail.setMoneyStatus(1);
        userMoneyDetail.setDescribe("666");
        boolean bool = moneyService.saveOrUpdateMoneyDetail(userMoneyDetail);
        System.out.println(bool);
    }//成功
}