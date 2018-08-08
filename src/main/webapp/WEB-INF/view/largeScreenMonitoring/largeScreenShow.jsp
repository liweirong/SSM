<%@ page language="java" contentType="text/html; charset=utf-8"
         pageEncoding="utf-8" %>
<%@ include file="thirdplug/ext-common.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8">
    <meta name="renderer" content="webkit">

    <link rel="stylesheet" type="text/css" href="thirdplug/ext-all.css">
    <script type="text/javascript" src="thirdplug/ext-all.js"></script>
    <script type="text/javascript" src="thirdplug/commonMethod.js"></script>
    <script src="big-screen/js/jquery-1.9.1.min.js"></script>
    <title></title>
    <style>
        .x-window-mc {
            border: none !important;
        }

        .x-panel-mc {
            border: none !important;
        }

        html, body, #warpper, #largeScreen {
            height: 100%;
        }

        #view-fullscreen {
            position: absolute;
            top: 0;
            right: 0;
        }

        #test {
            height: 30px;
            width: 30px;
            background: yellow;
        }
    </style>
</head>

<script type="text/javascript">

</script>

<body>
<div id="warpper">

    <div id="largeScreen">

        <iframe allowfullscreen="true" src="big-screen/index.html" id="iframepage" frameborder="0" scrolling="yes"
                marginheight="0"
                marginwidth="0" width="100%" height="100%"></iframe>


    </div>
    <div id="largeScreenshow">

    </div>
</div>
<script type="text/javascript" src="largeScreenShow.js"></script>
</body>
</html>
