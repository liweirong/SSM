package com.iris.dao;

import com.iris.model.OperLog;

public interface OperLogMapper {

    int insert(OperLog operLog);

    int insertSelective(OperLog operLog);

}