package com.iris.service;

import com.iris.model.UserMoneyDetail;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author lwrong
 */
public interface MoneyService {

	/**
	 * 通过年份查询到用户所有的数据，做报表展示用
	 * @param userId 用户id
	 * @param year 年
	 * @param start 开始记录
	 * @param  limit 限制
     * @return
     */
	ArrayList<UserMoneyDetail> findAllUserMoneyByUserId(Long userId, String year, Integer start, Integer limit);

	/**
	 * 通过年份月份查询到用户所有的数据，做月度报表展示用
	 * @param userId
	 * @param year
	 * @param month
	 * @param start
	 * @param limit
     * @return
     */
	ArrayList<UserMoneyDetail> findUserMonthMoneyByUserId(Long userId, String year,String month, Integer start, Integer limit);

	/**
	 * 通过前台输入的时间查询某一时间段的数据
	 * @param userId 用户id
	 * @param moneyTypes 用户查询的类型 【数组】
	 * @param startDate 开始时间
	 * @param  endDate 结束时间
	 * @param start 开始记录
	 * @param  limit 限制
     * @return
     */
	ArrayList<UserMoneyDetail> findUserMoneyDetailByUserId(Long userId, List<String> moneyTypes , Date startDate, Date endDate, Integer start, Integer limit);

	/**
	 * 批量删除
	 * @param ids id
	 * @return
     */
	boolean deleteMoneyDetailById(Long userId,long[] ids);



}
