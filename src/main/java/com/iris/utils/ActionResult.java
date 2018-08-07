package com.iris.utils;

import lombok.Data;

/**
 * 统一返回类接口
 *
 * @Autor lwrong
 * @Date 2018/8/7
 * @Time 16:21
 */
@Data
public class ActionResult {
    /**
     * 状态码
     */
    private int code;
    /**
     * 状态信息
     */
    private String msg;

    /**
     * 返回给前台的数据
     */
    private Object data;


}
