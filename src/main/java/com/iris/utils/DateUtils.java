package com.iris.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {
	
	/**
	 * 将时间转化为mills
	 * @param Date
	 * @return
	 * @throws ParseException
	 */
	public static long getMills(String Date) throws ParseException{
		return formatToDate(Date).getTime();
	}
	
	/**
	 * 将日期字符串转化为时间
	 * @param date
	 * @return
	 * @throws ParseException
	 */
	public static Date formatToDate(String date) throws ParseException{
		SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss");
		return sdf.parse(date);
	}

	/**
	 * 获取每月最后一天的日期
	 *
	 * @param startDate 开始时间
	 * @return 最后一天的日期 "yyyy-MM-dd 23:59:59"
	 * @throws ParseException
	 */
	public static String getMonthLastDay(Date startDate) throws ParseException {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(startDate);
		calendar.add(Calendar.MONTH, 1);
		//日期倒数一日,既得到本月最后一天
		calendar.add(Calendar.DAY_OF_MONTH, -1);
		Date lastDay = calendar.getTime();
		SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
		return sd.format(lastDay)+ " 23:59:59";
	}
}
