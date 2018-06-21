package com.iris.controller;

import com.iris.service.MoneyService;
import com.iris.testUtils.BaseControllerTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Created by lwrong on 2018/6/21.
 */
public class MoneyControllerTest extends BaseControllerTest {

    @Autowired
    private MoneyService moneyService;

    @Test
    public void testListAll() throws Exception {
    }
}