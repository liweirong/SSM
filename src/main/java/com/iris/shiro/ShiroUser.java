package com.iris.shiro;

import lombok.Data;

import java.io.Serializable;

/**
 * @description：自定义Authentication对象，使得Subject除了携带用户的登录名外还可以携带更多信息
 */
@Data
public class ShiroUser implements Serializable {

    private static final long serialVersionUID = -1373760761780840081L;
    public String userId;
    public String userName;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public ShiroUser(String userId, String userName) {
        this.userId = userId;
        this.userName = userName;
    }

}