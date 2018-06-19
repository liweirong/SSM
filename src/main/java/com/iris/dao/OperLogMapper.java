package com.iris.dao;

import com.iris.model.OperLog;
import org.springframework.stereotype.Component;

@Component
public interface OperLogMapper {

    int insert(OperLog operLog);

    int insertSelective(OperLog operLog);

}