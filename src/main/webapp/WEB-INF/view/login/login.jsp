<%--
  Created by IntelliJ IDEA.
  User: lwrong
  Date: 2018/5/31
  Time: 10:47
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<head>
    <title>Login</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="keywords" content="" />
    <script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
    <!-- bootstrap-css -->
    <link rel="stylesheet" href="/css/login/bootstrap.min.css" >
    <!-- //bootstrap-css -->
    <!-- Custom CSS -->
    <link href="/css/login/style.css" rel='stylesheet' type='text/css' />
    <link href="/css/login/style-responsive.css" rel="stylesheet"/>
    <!-- font CSS -->
    <link href='/css/login/fonts-googleapis.css' rel='stylesheet' type='text/css'>
    <!-- font-awesome icons -->
    <link rel="stylesheet" href="/css/login/font.css" type="text/css"/>
    <link href="/css/login/font-awesome.css" rel="stylesheet">
    <!-- //font-awesome icons -->
    <script src="/js/jquery2.0.3.min.js"></script>
</head>
<body>
<div class="log-w3">
    <div class="w3layouts-main">
        <h2>Sign In Now</h2>
        <form class ="form-signin">
            <input type="username" class="ggg" name="username" placeholder="USERNAME" required autofocus>
            <input type="password" class="ggg" name="password" placeholder="PASSWORD" required="">
            <span><input  name="checkbox" type="checkbox" />Remember Me</span>
            <h6><a href="#">Forgot Password?</a></h6>
            <div class="clearfix"></div>
            <button id="login-submit" class="btn btn-lg btn-primary btn-block" style="background: #f0bcb4;color: white;border: none;outline: none;display: table; cursor: pointer;margin: 45px auto 31px;" type="submit">Sign In</button>
        </form>

        <p>Don't Have an Account ?<a href="/toRegister">Create an account</a></p>
    </div>
</div>

<script src="/js/bootstrap.js"></script>
<script src="/js/login/jquery.dcjqaccordion.2.7.js"></script>
<script src="/js/login/scripts.js"></script>
<script src="/js/login/jquery.slimscroll.js"></script>
<script src="/js/login/jquery.nicescroll.js"></script>
<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="/js/login/flot-chart/excanvas.min.js"></script><[endif]-->
<script src="/js/login/jquery.scrollTo.js"></script>
<script src="/js/login/login_click.js"/>
</body>
</html>

