package com.iris.controller;

import com.iris.model.UserMoneyDetail;
import com.iris.testUtils.BaseControllerTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;

/**
 * Created by lwrong on 2018/6/21.
 */
public class MoneyControllerTest extends BaseControllerTest {

    @Autowired
    private MoneyController moneyController;

    @Test
    public void testListAll() throws Exception {
        ArrayList<UserMoneyDetail> userMoneyDetails = moneyController.listAll();
        System.out.println(userMoneyDetails.size());

    }
}