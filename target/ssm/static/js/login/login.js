$(function () {
    //按钮单击时执行login
    $(".correctLoginpost").click(function () {
        $.ajax({
            type: "POST",
            url: $ctx + "/guest/loginPost",
            data: {
                username: $(".correctUsername").val(),
                password: $(".correctPassword").val()
            },
            success: function (data) {
                $(".returnMsg").html(data.msg);
            }
        });
    });
    //按钮单击时执行
    $(".errorLoginpost").click(function () {
        $.ajax({
            type: "POST",
            url: $ctx + "/guest/loginPost",
            data: {
                username: $(".errorUsername").val(),
                password: $(".errorPassword").val()
            },
            success: function (data) {
                $(".returnMsg").html(data.msg);
            }
        });
    });
});