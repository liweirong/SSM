$(function(){

	$("#submit").click(function (){
		var data = $("#form").serialize();
		debugger
		$.ajax({
			type: "POST",
			url: "/login",
			data:data,
			success: function(loginStatsJson){
				debugger
				var login = JSON.parse(loginStatsJson);
				if(login.result){
					location.href = "http://localhost:8081";
				}else{
					$("#msg").html("账号或密码错误");
				}
			}});

	});



})

//去掉前后空格  
function trim(str) {
	var strnew = str.replace(/^\s*|\s*$/g, "");
	return strnew;
}



function checkpassword() {
	var username =$("#username").val();
	debugger
	if (username == "" || !isNaN(username.charAt(0))) {
		$("#usernameTip").html = "<font color='red'>× 请先输入用户名</font>";
	}
	var password = $("#password").val();
	if (password.length ==0) {
		$("#passwordTip").html = "<font color='red'>× 请输入密码</font>";
	}
}


// 图片验证码  
function checkNumber() {
	var checkNum = $("#checkNum").val();
	if (trim(checkNum) == "") {
		document.getElementById("checkNumTip").innerHTML = "<font color='red'>× 验证码不能为空</font>";
		return false;
	} else {
		document.getElementById("checkNumTip").innerHTML = "<font color='#339933'>√ 验证码合格</font>";
		// 向后台发送处理数据
		$.ajax({
			url : "checkCodeImageNum",// 目标地址
			data : {checkNum : checkNum}, // 目标参数
			type : "POST", // 用POST方式传输
			dataType : "text", // 数据格式:text
			success : function(data) {
				data = parseInt(data, 10);
				if (data == 0) {
					$("#checkNumTip").html("<font color='red'>× 验证码错误</font>");
				} else {
					$("#checkNumTip").html("<font color='#339933'>√ 验证码正确</font>");
				}
			}
		});
		return true;
	}
}
//更换图片验证
function changeCheckNum(){
	$("#checkNumImage").attr("src","getCodeImage?"+new Date());
}
