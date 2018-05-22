package com.iris.controller;

import com.iris.annotation.Log;
import com.iris.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *@author lwrong
 *  Created by lwrong on 2018/5/22.
 */
@Controller
public class RegisterController extends  BaseController{

    private static final Logger LOG = Logger.getLogger(LoginController.class);

    @Autowired
    @Qualifier("userService")
    private UserService userService;
    /**
     *  注册跳转
     *
     * @return {String}
     */
    @RequestMapping(value = "/guest/register", method = RequestMethod.GET)
    public String register(Model model) {
        return "guest/register";
    }


    @Log(value = "登录操作", entry = { "username=用户名" })
    @RequestMapping(value = "/guest/register", method = RequestMethod.POST)
    @ResponseBody
    public Object registerPost(String username, String password) {
//TODO
        return renderSuccess("注册成功");
    }

}
