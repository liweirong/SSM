<jsp:include page="common/global.jsp"></jsp:include>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
</head>
<body>
<span> 已经弄好的接口</span>
<p><span>requestHashCode = </span><span id="requestHashCode"></span>
<p><a href="">游客页面</a></p>
<p><a href="/toLogin">登录</a></p>
<p><a href="/guest/login">登录页面</a></p>
<p><a href="/testPOJO">testPOJO</a></p>
<p><a href="/user">用户管理</a></p>
<p><a href="/toIndex/admin/admin">登录的resultful：/toIndex/admin/admin </a></p>
<p><a href="/druid">数据库链接管理</a></p>
/billManagement
<p><a href="/billManagement/deleteById">删除所有的细节/money/deleteById/后端接口</a></p>

---------------------------------------------------------
<span style="color:red;"> 有问题的接口</span>
<p><a href="/billManagement/bill/2018?start=0&limit=10">账单页面http://localhost:8080/billManagement/bill/2018?start=0&limit=10</a></p>
---------------------------------------------------------
</body>
<script type="text/javascript" src="<%=request.getContextPath() %>/static/js/common/jquery-1.12.1.min.js"></script>
<script type="text/javascript">
    $(function () {
        $.ajax({
            type: "POST",
            url: $ctx + "/testRequestHashCode",
            data: {
            },
            success: function (data) {
                var dataMsg = eval("("+data.msg+")");
                $("#requestHashCode").html(dataMsg.requestHashCode);
            }
        });

    });
</script>
</html>