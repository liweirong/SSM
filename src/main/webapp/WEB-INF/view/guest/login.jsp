<jsp:include page="../common/global.jsp"></jsp:include>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <script type="text/javascript">
    /* If below IE9 */
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0"){
    alert("Your browser version is too low, please use IE9 and above or Chrome, Firefox and other browsers!");
    }
    </script>
    <link rel="stylesheet" href="//unpkg.com/element-ui@1.3.6/lib/theme-default/index.css">
    <script type="text/javascript" src="<%=request.getContextPath() %>/static/js/vue.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/static/js/login/login.js"></script>
    <script type="text/javascript" src="<%=request.getContextPath() %>/static/js/jquery-1.9.1.js"></script>
    <style>
    </style>
</head>
<body>


<div>
    <p>
        <span>正确的用户名和密码</span>
    </p>
    <p>
        <span>用户名</span><input type="text" name="username" value="admin" class="correctUsername"/>
    </p>
    <p>
        <span>密码</span><input type="text" name="password" value="admin" class="correctPassword"/>
    <p>
    <p>
        <input type="button" name="loginpost" value="登录" class="correctLoginpost"/>
    <p>
</div>
<div>
    <p>
        <span>错误的用户名和密码</span>
    </p>
    <p>
        <span>用户名</span><input type="text" name="username" value="admin" class="errorUsername"/>
    </p>
    <p>
        <span>密码</span><input type="text" name="password" value="admin2" class="errorPassword"/>
    <p>
    <p>
        <input type="button" name="password" value="登录" class="errorLoginpost"/>
    <p>
</div>
<div>
    <span> 登录请求返回信息：</span>
    <span class="returnMsg" style="color: red"></span>
</div>
<div>
    <span> 登录后才可进入的个人信息页面：</span>
    <a href="<%=request.getContextPath() %>/manage/user/user">个人信息</a>
</div>
</body>
<script type="text/javascript" src="<%=request.getContextPath() %>/static/js/common/jquery-1.12.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/static/js/login/login.js"></script>
</html>
