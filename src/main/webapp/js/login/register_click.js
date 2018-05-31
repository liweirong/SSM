/**
 * Created by lwrong on 2018/5/31.
 */

$(function () {
    //按钮单击时执行
    $("#register-submit").click(function () {
        $.ajax({
            type: "POST",
            url: "/toIndex",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function (data) {
                alert("666")
            }
        });
    });
})
