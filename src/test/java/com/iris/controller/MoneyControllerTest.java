package com.iris.controller;

import com.google.gson.Gson;
import com.iris.model.UserMoneyDetail;
import com.iris.testUtils.BaseControllerTest;
import com.iris.utils.ActionResult;
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
        ActionResult userMoneyDetails = moneyController.listAll("2018");
        ArrayList<UserMoneyDetail> obj = (ArrayList<UserMoneyDetail>) userMoneyDetails.getObj();
        Gson gson = new Gson();
        String s = gson.toJson(userMoneyDetails);
        System.out.println(s);

    }

    @Test
    public void testdelete() throws Exception {

        Object userMoneyDetails = moneyController.deleteMoneyDetailById("1");
        System.out.println(userMoneyDetails);

    }
}