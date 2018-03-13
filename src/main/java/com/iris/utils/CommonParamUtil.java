package com.iris.utils;
import java.util.MissingResourceException;
import java.util.ResourceBundle;
/**
 * Created by lwrong on 2018/3/13.
 */
public class CommonParamUtil {
    // 属性文件名
    private String propertyFileName;
    private ResourceBundle resourceBundle;

    public CommonParamUtil() {
        // commonParam.properties
        propertyFileName = "properties/commonParam";
        resourceBundle = ResourceBundle.getBundle(propertyFileName);
    }

    /*
     * 根据name获取配置文件commonParam.properties中对应的value值
     */
    public String getString(String key) {
        if (key == null || ("").equals(key) || ("null").equals(key)) {
            return "";
        }
        String result = "";
        try {
            result = resourceBundle.getString(key);
        } catch (MissingResourceException e) {
            e.printStackTrace();
        }
        return result;
    }
}
