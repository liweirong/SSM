/**
 * Created by lwrong on 2018/3/9.
 */
$(function () {
    //按钮单击时执行
    $("#login-submit").click(function () {
        $.ajax({
            type: "POST",
            url: "/toIndex/"+$("#username").val()+"/"+$("#username").val(),
            data: {
              /*  username: $("#username").val(),
                password: $("#password").val()*/
            },
           success: function (data) {
             alert("666")
            }
        });
    });
})