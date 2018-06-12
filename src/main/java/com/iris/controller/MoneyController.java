package com.iris.controller;

import com.google.gson.Gson;
import com.iris.annotation.Log;
import com.iris.model.UserMoneyDetail;
import com.iris.service.MoneyService;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

/*
*
 * @author lwrong
 *         Created by lwrong on 2018/3/7.
*/
@Controller
@RequestMapping("/money")
public class MoneyController extends BaseController {
    private static final Logger LOG = Logger.getLogger(MoneyController.class);
    @Autowired
    private MoneyService moneyService;

    @Log("进入账单管理")
    @RequestMapping(value = "/money", method = RequestMethod.GET)
    public String toMonery(Model model) {
        LOG.info("进入账单管理");
        return "/money/money";
    }

    @Log("得到所有账单信息")
    @ResponseBody
    @RequestMapping(value = "listAll", method = RequestMethod.GET)
    public ArrayList<UserMoneyDetail> listAll() {
        ArrayList<UserMoneyDetail> allUserMoneyList = moneyService.findAllUserMoneyByUserId(1L, "2014", 0, 20);
        LOG.info("得到账单信息一个"+allUserMoneyList.size() +"条数据");
        return allUserMoneyList;
    }

    @Log("得到所有账单信息")
    @ResponseBody
    @RequestMapping(value = "listAllAjax",produces = "application/json; charset=utf-8")//集合对象就会乱码
    public String listAllAjax(HttpServletRequest request) {
        ArrayList<UserMoneyDetail> allUserMoneyList = moneyService.findAllUserMoneyByUserId(1L, "2014", 0, 20);
        //list转成json
        Gson gson = new Gson();
        String json = gson.toJson(allUserMoneyList);
        String parameter = request.getParameter("callback");
        System.out.println(parameter);
        //如果不是ajax调的时候就返回json
        if(StringUtils.isEmpty(parameter)){
            return  json;
        }else{//否则就返回回调函数
            return parameter+"("+json+")";
        }
    }

}
