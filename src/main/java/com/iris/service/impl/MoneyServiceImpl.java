package com.iris.service.impl;

import com.iris.dao.UserMoneyDetailMapper;
import com.iris.model.UserMoneyDetail;
import com.iris.model.UserMoneyDetailExample;
import com.iris.service.MoneyService;
import com.iris.utils.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author lwrong
 * Created by lwrong on 2018/5/25.
 */
@Service(value="moneyService")
public class MoneyServiceImpl implements MoneyService {

    @Autowired
    private UserMoneyDetailMapper userMoneyDetailMapper;

    @Override
    public ArrayList<UserMoneyDetail> findAllUserMoneyByUserId(Long userId, String year, Integer start, Integer limit){
        UserMoneyDetailExample userMoneyDetailExample = new UserMoneyDetailExample();
        UserMoneyDetailExample.Criteria createCriteria = userMoneyDetailExample.createCriteria();
        createCriteria.andUserIdEqualTo(userId);
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = new Date();
        Date endDate = new Date();
        try {
            startDate = sd.parse(year + "-01-01");
            endDate = sd.parse(year + "-12-31");
        } catch (ParseException e) {
            e.printStackTrace();
        }
        createCriteria.andMakeDateBetween(startDate ,endDate);
        createCriteria.andMoneyIsNotNull();
        userMoneyDetailExample.setStart(start);
        userMoneyDetailExample.setLimit(limit);
        List<UserMoneyDetail> userMoneyDetails = userMoneyDetailMapper.selectByExample(userMoneyDetailExample);
        return (ArrayList<UserMoneyDetail>) userMoneyDetails;
    }

    @Override
    public ArrayList<UserMoneyDetail> findUserMonthMoneyByUserId(Long userId, String year,String month, Integer start, Integer limit){
        UserMoneyDetailExample userMoneyDetailExample = new UserMoneyDetailExample();
        UserMoneyDetailExample.Criteria createCriteria = userMoneyDetailExample.createCriteria();
        createCriteria.andUserIdEqualTo(userId);
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = new Date();
        Date endDate = new Date();
        try {
            startDate = sd.parse(year + "-" + (month.length() == 2 ? month : "0" + month) + "-01");
            String monthLastDay = DateUtils.getMonthLastDay(startDate);
            endDate = sd.parse(monthLastDay);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        createCriteria.andMakeDateBetween(startDate ,endDate);
        createCriteria.andMoneyIsNotNull();
        userMoneyDetailExample.setStart(start);
        userMoneyDetailExample.setLimit(limit);
        List<UserMoneyDetail> userMoneyDetails = userMoneyDetailMapper.selectByExample(userMoneyDetailExample);
        return (ArrayList<UserMoneyDetail>) userMoneyDetails;
    }

    @Override
    public ArrayList<UserMoneyDetail> findUserMoneyDetailByUserId(Long userId, List<String> moneyTypes , Date startDate, Date endDate, Integer start, Integer limit){
        UserMoneyDetailExample userMoneyDetailExample = new UserMoneyDetailExample();
        UserMoneyDetailExample.Criteria createCriteria = userMoneyDetailExample.createCriteria();
        createCriteria.andUserIdEqualTo(userId);
        createCriteria.andMakeDateBetween(startDate ,endDate);
        if(moneyTypes.size() > 0){
            createCriteria.andTypeIn(moneyTypes);
        }
        createCriteria.andMoneyIsNotNull();
        userMoneyDetailExample.setStart(start);
        userMoneyDetailExample.setLimit(limit);
        List<UserMoneyDetail> userMoneyDetails = userMoneyDetailMapper.selectByExample(userMoneyDetailExample);
        return (ArrayList<UserMoneyDetail>) userMoneyDetails;
    }
}
