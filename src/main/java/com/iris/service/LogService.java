package com.iris.service;

import com.iris.model.OperLog;
import org.aspectj.lang.JoinPoint;

/**
 * @description：操作日志
 */
public interface LogService {

    void insertLog(OperLog log); // 插入日志

    void saveByJoinPoint(JoinPoint joinPoint, Exception e);
}
