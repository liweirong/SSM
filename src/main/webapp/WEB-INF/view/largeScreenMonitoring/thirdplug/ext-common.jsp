<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
			String cssPath = null;
   Cookie cookie[]=request.getCookies();
   if(cookie!=null){
    for(int i=0;i<cookie.length;i++){
     	Cookie c=cookie[i];
     	if(c.getName().equals("css")){
     		cssPath = c.getValue();
		}}
	}
	if(cssPath == null){
		cssPath = "blue";
	}
%>

<link rel="stylesheet" type="text/css"href="/javascript/sys/ext/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css"	href="/javascript/sys/ext/resources/css/xtheme-<%=cssPath %>.css" />
<link rel="stylesheet" type="text/css" href="/css/myCss.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/audit.css" />

<link rel="stylesheet" type="text/css" href="/javascript/sys/css/Ext.ux.form.LovCombo.css"> 
<link rel="stylesheet" type="text/css" href="/javascript/sys/css/webpage.css"> 
<link rel="stylesheet" type="text/css" href="/javascript/sys/css/lovcombo.css"> 
<link rel="stylesheet" type="text/css" href="/javascript/sys/ext/ux/css/RowEditor.css" />
<link rel="stylesheet" type="text/css"  href="/javascript/sys/ext/ux/css/Portal.css">

<script type="text/javascript" src="/javascript/sys/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="/javascript/sys/ext/ext-all.js"></script>
<script type="text/javascript" src="/javascript/sys/js/WebPage.js"></script> 
<script type="text/javascript" src="/javascript/sys/js/Ext.ux.form.LovCombo.js"></script> 
<script type="text/javascript" src="/javascript/sys/js/Ext.ux.ThemeCombo.js"></script>
<script type="text/javascript" src="/javascript/sys/ext/ux/Portal.js"></script> 

<script type="text/javascript" src="/javascript/sys/ext/ext-lang-zh_CN.js"></script>	
<script type="text/javascript" src="/javascript/sys/ext/ux/RowEditor.js"></script>
<script type="text/javascript" src="/javascript/sys/ext/DateTimeField/spinnerDate.js"></script>
<script type="text/javascript" src="/javascript/sys/ext/DateTimeField/SpinnerField.js"></script>
<script type="text/javascript" src="/javascript/sys/ext/DateTimeField/DateTimeField.js"></script>
<script type="text/javascript" src="/javascript/util/commonMethod.js"></script>



