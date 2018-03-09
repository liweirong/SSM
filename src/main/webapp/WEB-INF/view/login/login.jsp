<%--
  Created by IntelliJ IDEA.
  User: lwrong
  Date: 2018/3/9
  Time: 11:53
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="/images/login/favicon.ico">
    <title>登录</title>
    <link href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/login/ie10-viewport-bug-workaround.css" rel="stylesheet">
    <link href="/css/login/signin.css" rel="stylesheet">
    <script src="/js/login/ie-emulation-modes-warning.js"></script>
</head>
<body>
<div class="container">
    <form class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="username" class="sr-only">username</label>
        <input type="username" id="username" class="form-control" placeholder="userName" required autofocus>
        <label for="password" class="sr-only">Password</label>
        <input type="password" id="password" class="form-control" placeholder="Password" required>

        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button id="login-submit" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>

</div> <!-- /container -->


<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="/js/login/ie10-viewport-bug-workaround.js"></script>
<script src="/js/login/login_click.js"/>

</body>
</body>
</html>
