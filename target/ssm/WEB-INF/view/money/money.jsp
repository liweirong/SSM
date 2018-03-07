<%--
  Created by IntelliJ IDEA.
  User: lwrong
  Date: 2018/3/7
  Time: 15:48
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>年度账单一览表</title>
    <script type="text/javascript" src="<%=request.getContextPath() %>/static/js/echarts.min.js"></script>
</head>
<body>
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="height:800px"></div>
</body>
<script type="text/javascript" src="<%=request.getContextPath() %>/static/money/money.js"></script>
</html>
