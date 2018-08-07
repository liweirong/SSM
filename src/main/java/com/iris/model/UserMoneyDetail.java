package com.iris.model;

import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;

@Data
public class UserMoneyDetail {

    private Long id;


    private Long userId;


    private String goodsName;


    private Double money;


    private String type;


    private Integer moneyStatus;


    private String describe;


    private Timestamp createDate;


    private Timestamp makeDate;

    @JsonIgnore
    private Integer delete;

}