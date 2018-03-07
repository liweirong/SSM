package com.iris.controller;

import com.iris.annotation.Log;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by lwrong on 2018/3/7.
 */
@Controller
public class MoneyController extends BaseController{
    private static final Logger LOG = Logger.getLogger(MoneyController.class);

    @Log("进入账单管理")
    @RequestMapping(value = "/money/money", method = RequestMethod.GET)
    public String toMonery(Model model) {
        LOG.info("进入账单管理");
        return "/money/money";
    }
}
