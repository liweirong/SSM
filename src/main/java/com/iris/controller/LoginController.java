package com.iris.controller;

import com.alibaba.fastjson.JSONObject;
import com.iris.annotation.Log;
import com.iris.model.User;
import com.iris.service.UserService;
import com.iris.utils.ConstantVar;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by lwrong on 2018/3/29.
 */
@Controller
public class LoginController extends BaseController{
    private static final Logger LOG = Logger.getLogger(LoginController.class);

    @Autowired
    @Qualifier("userService")
    private UserService userService;


    @Log("进入login")
    @RequestMapping(value = "/toLogin", method = RequestMethod.GET)
    public String toLogin(Model model) {
        LOG.info("进入login");
        return "login/login";
    }

    @Log("进入index")
    @RequestMapping(value = "/toIndex/{username}/{password}", method = RequestMethod.GET)
    public Object toIndex(ModelAndView modelAndView ,@PathVariable("username")String username,@PathVariable("password")String password) {
        if (StringUtils.isBlank(username)) {
            modelAndView.setViewName("login/login");
            return renderError("用户名不能为空");
        }
        if (StringUtils.isBlank(password)) {
            return renderError("密码不能为空");
        }
        Subject subject = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password);
        try {
            subject.login(token);
        } catch (UnknownAccountException e) {
            logger.error("账号不存在：{}", e);
            return renderError("账号不存在");
        } catch (DisabledAccountException e) {
            logger.error("账号未启用：{}", e);
            return renderError("账号未启用");
        } catch (IncorrectCredentialsException e) {
            logger.error("密码错误：{}", e);
            return renderError("密码错误");
        } catch (ExcessiveAttemptsException e) {
            logger.error("登录失败多次，账户锁定：{}", e);
            return renderError("登录失败多次，账户锁定10分钟");
        } catch (RuntimeException e) {
            logger.error("未知错误,请联系管理员：{}", e);
            return renderError("未知错误,请联系管理员");
        }
        User user = userService.findUserByUserName(username);

        subject.getSession().setAttribute(ConstantVar.LOGIN_USER, user);
        LOG.info("进入index");
        return "index";
    }

    @Log("进入index")
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        LOG.info("进入index");
        return "index";
    }

    /**
     * 获取request的hashCode，验证其是否线程安全
     * @param request
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/testRequestHashCode", method = RequestMethod.POST)
    public Object testRequestHashCode(HttpServletRequest request) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("requestHashCode",request.hashCode());
        return renderSuccess(jsonObject.toJSONString());
    }

    /**
     * GET 登录
     *
     * @return {String}
     */
    @RequestMapping(value = "/guest/login", method = RequestMethod.GET)
    public String login(Model model) {
        return "index";
    }

    @Log(value = "登录操作", entry = { "username=用户名" })
    @RequestMapping(value = "/guest/loginPost.lwr", method = RequestMethod.POST)
    @ResponseBody
    public Object loginPost(String username, String password) {


        return renderSuccess("登录成功");
    }

    /**
     * 退出
     *
     * @return {Result}
     */
    @Log(value = "用户退出操作")
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public Object logout() {
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        return renderSuccess("退出成功");
    }

}