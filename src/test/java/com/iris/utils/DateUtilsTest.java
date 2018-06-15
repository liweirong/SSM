package com.iris.utils;

import org.junit.Test;

import java.util.Date;

/**
 * Created by lwrong on 2018/6/11.
 */
public class DateUtilsTest {

    @Test
    public void testGetMonthLastDay() throws Exception {
        DateUtils.getMonthLastDay(new Date());
    }
}