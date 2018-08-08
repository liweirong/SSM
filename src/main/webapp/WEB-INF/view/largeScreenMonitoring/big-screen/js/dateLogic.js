/**
 * Created by Administrator on 2018/7/16.
 */
;(function($){
    var bevelAngle = 13.297;     // 圆环高出半圆的斜角角度
    var dbCount = 0;    // 数据库个数
    var dbWrapRotates = [];   // 数据库容器的旋转角度数组
    var slantLines = [];  // 边框斜角线的几个长度
    var urli = 0;//年月日视图地址变量
    var workedTimeData = 0; //设备运行时间数据
    var sysInfoData = [];   //性能信息数据
    var visitedListData = []; //访问次数
    var abnormalVisitedListData = []; // 异常访问次数
    var lastCenterData = [];    // 上次数据中心的数据
    var dataCenterData = [];    // 当前数据中心的数据
    var riskLevelData = [];     // 风险级别的数据
    var connectionInterRupt =true; //连接异常报错特征值
    var bubbleInterval = null;     // 气泡运动定时器

    // 20s的加载动画
    function loadingAnimate() {
        var loadingTime = 20000;
        var welcomeText = $('.welcome-text');
        var loadingText = $('.loading-text');
        var loadProgress = $('.load-progress');
        var loadBall = $('.load-ball');
        welcomeText.css({
            opacity: 1
        });
        setTimeout(function(){
            welcomeText.css({
                opacity: 0
            });
            loadingText.css({
                opacity: 1
            });
            setTimeout(function(){
                loadProgress.css({
                    opacity: 1,
                    width: '80%'
                });
                loadBall.css({
                    opacity: 1
                });
            }, 1000);
        }, 3000);
        setTimeout(function(){
            loadingText.css({
                opacity: 0
            });
            setTimeout(function(){
                loadingText.text('加载已完成');
                loadingText.css({
                    opacity: 1
                });
            }, 1000);
        }, loadingTime - 4000);
        setTimeout(function(){
            loadProgress.css({
                width: 0
            });
            setTimeout(function () {
                loadProgress.css({
                    opacity: 0
                });
                loadBall.css({
                    opacity: 0
                });
                loadingText.css({
                    opacity: 0
                });
                setTimeout(function(){
                    $('.loading-mask').fadeOut(1000);
                }, 1000);
            }, 500);
        }, loadingTime - 1500);
    }
    loadingAnimate();

    // 绘制线框
    $('#line-frame1').drawLine({
        direction: 'left'
    });
    $('#line-frame2').drawLine({
        direction: 'left'
    });
    $('#line-frame3').drawLine({
        direction: 'left'
    });
    $('#line-frame4').drawLine({
        direction: 'left'
    });
    $('#line-frame5').drawLine({
        direction: 'center'
    });
    $('#line-frame6').drawLine({
        direction: 'center-btm'
    });
    $('#line-frame7').drawLine({
        direction: 'right'
    });
    $('#line-frame8').drawLine({
        direction: 'right'
    });
    $('#line-frame9').drawLine({
        direction: 'right'
    });
    $('#line-frame10').drawLine({
        direction: 'right'
    });




// //判断是否全屏
    function IsFull() {
        var fullscreenElement =
            document.fullscreenEnabled
            || document.mozFullscreenElement
            || document.webkitFullscreenElement;
        var fullscreenEnabled =
            document.fullscreenEnabled
            || document.mozFullscreenEnabled
            || document.webkitFullscreenEnabled;
        if (fullscreenElement === null)
        {
            return false;
        } else {
            return true;
        }
    }
    function isFullscreenForNoScroll(){
        var explorer = window.navigator.userAgent.toLowerCase();
        var w = document.getElementById("container").offsetWidth;
        console.log(w);
        console.log(window.screen.width);
        console.log(w === window.screen.height && w=== window.screen.width);
        // if(explorer.indexOf('chrome')>0){//webkit
            if ( w < window.screen.width) {

                return false;
            } else {
                return true;
            }

        // }else{//IE 9+  fireFox
        //     if (window.outerHeight === window.screen.height && window.outerWidth === window.screen.width) {
        //         return true;
//         }else{
        //         return false;
//             }
//             }
    }
    $('#switch-btn-mask').click(function(){
        var $switchBtn = $('#switch-display-btn');
        $switchBtn.toggleClass('active');
        console.log("b");
        // console.log(isFullscreenForNoScroll());
        var boolean = isFullscreenForNoScroll();
        var docElm = document.documentElement;
        if(boolean === false) {

            //W3C
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
//FireFox
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }

//Chrome等
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
//IE11
            else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
        }else{
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }

            else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        if ($switchBtn.hasClass('active')) {
            $switchBtn.find('.switch-btn-text').text('还原');
        } else {
            $switchBtn.find('.switch-btn-text').text('大屏展示');
        }
    });

    // 发请求获取全部数据
    getPerSecondDate();
  //  getByFiveSecondDate();
   // getqueryRiskDate();

    // 初始化执行函数
    initLineLength();
    initDomStyle();
    initContentBox();


    // 初始化echart图表
    // 数据库状态
    var databaseYear = echarts.init(document.getElementById('databaseYear'));
    databaseYear.setOption(yearMonDayOption);
    var conditionCurve = echarts.init(document.getElementById('conditionCurve'));
    conditionCurve.setOption(conditionCurveOption);
    var strangeBreak = echarts.init(document.getElementById('strange'));
    strangeBreak.setOption(strangeOption);
    //客户端图表
    var customerChart = echarts.init(document.getElementById('customer-echarts'));
    customerChart.setOption(customerOption);
    // 中心水球
    var gradePolo = echarts.init(document.getElementById("gradePolo"));
    gradePolo.setOption(gradePoloOption);
    //操作语句分析图 操作类型图
    var operationType = echarts.init(document.getElementById('operationType'));
    operationType.setOption(typeOption);
    //操作语句分析图 执行时间图
    var setenceTime = echarts.init(document.getElementById('operationTime'));
    setenceTime.setOption(timeoption);

    function initLineLength() {
        // 边框斜角线的几个长度
        slantLines = [22, 14, 8, 18, 34, 10, 40, 100];
        var windowWidth = $(window).width();
        // 1920 === 100px
        if (windowWidth > 1480) {
            $('html').css({
                fontSize: parseInt((windowWidth / 1920) * 100)
            });
            changeLineLength((windowWidth / 1920));
        } else {
            $('html').css({
                fontSize: parseInt((1480 / 1920) * 100)
            });
            changeLineLength((1480 / 1920));
        }
    }

    // 改变边框斜角线的长度
    function changeLineLength(lengthScale) {
        var lines = [];
        for (var i=0; i<slantLines.length; i++) {
            lines[i] = lengthScale*slantLines[i];
        }
        slantLines = lines;
    }

    // 初始化一些容器的大小和定位，浏览器窗口改变而执行，一进来页面就执行
    function initDomStyle() {
        var riskScoreHeight = $('.risk-score').height() * 2 * 40 / 100;
        $('#gradePolo').css({'width': riskScoreHeight,'height':riskScoreHeight,'left': slantLines[6]});
        $('#insetPolo').css({'width': riskScoreHeight,'height':riskScoreHeight,'left': slantLines[6]});
        var dataCenterHeight = $('#data-center').height();
        $('#data-center').width(dataCenterHeight);
        var moveDateWrap = $('.move-date-wrap');
        moveDateWrap.css({
            width: 0.13*moveDateWrap.parent().width() + slantLines[7],
            height: slantLines[6]
        });
        $('#status-date.move-date-wrap').css({
            top: slantLines[1] + slantLines[2] - 1
        });
    }

    // 为绘制数据中心圆弧里的气泡运动轨迹做准备
    function prepareForDbBubble() {
        if (dataCenterData[0]) {
            dbCount = dataCenterData[0].length - 1;
        } else {
            dbCount = 0;
        }
        var sectorAngle = 180 +　bevelAngle*2;  // 扇形角度
        var averageAngle = Number((sectorAngle/(dbCount + 1)).toFixed(3));    // 平均每个数据库容器的旋转角度
        var bubbleAngle = averageAngle - bevelAngle;  // 第一个数据库容器的旋转角度
        for (var i=0; i<dbCount; i++) {
            if (i>0) bubbleAngle += averageAngle;
            dbWrapRotates.push(bubbleAngle);
        }
    }

    // 绘制数据中心圆弧里的气泡运动轨迹
    function drawDbBubbleWrap() {
        var $dataCenterWrap = $('#data-center-wrap');
        $dataCenterWrap.find('.db-bubble-wrap').remove();
        for (var i=0; i<dbCount; i++) {
            var dbBubbleWrap = $('<div class="db-bubble-wrap">' +
                '<div class="bubble-move-wrap" id="bubble-move-' + (i+1) + '"></div>' +
                '<div class="db-wrap" id="db-wrap-' + (i+1) + '"><span>' + dataCenterData[0][i] + '</span></div>' +
                '</div>');
            var dbWrap = dbBubbleWrap.find('.db-wrap');
            dbBubbleWrap.css({
                width: 0.83*$dataCenterWrap.height(),
                transform: 'rotate(-' + dbWrapRotates[i] + 'deg)'
            });
            dbWrap.css({
                transform: 'rotate(' + dbWrapRotates[i] + 'deg)'
            });
            $dataCenterWrap.append(dbBubbleWrap);
        }
    }

    // 初始化一些容器的大小和定位，浏览器窗口改变而执行，每次请求成功之后执行
    function initDbWrap() {
        var dataCenterWrapHeight = $('#data-center-wrap').height();
        var dbWrapHeight = $('.db-wrap').height();
        $('.db-wrap').width(dbWrapHeight);
        $('.db-bubble-wrap').width(0.83*dataCenterWrapHeight);
    }

    // 气泡运动循环定时器
    function bubbleAction() {
        clearInterval(bubbleInterval);
        if (dataCenterData === []){
            return false;
        }
        bubbleInterval = setInterval(function(){
            for (var i=0; i<dbCount; i++) {
                if (dataCenterData[1][i] > 0 || dataCenterData[2][i] > 0) {
                    // 生成1-4之间的随机数
                    var random4 = Math.ceil(Math.random()*4);
                    // 生成1-8之间的随机数
                    var random8 = Math.ceil(Math.random()*8);
                    bubbleMove('bubble-move-' + (i+1), bubbleData[random4-1][random8-1]);
                }
            }
        }, 600);
    }

    // 气泡运动
    function bubbleMove(id, data) {
        var $bubble = $('#' + id).children('div');
        if ($bubble.length > 12) {
            $bubble.first().remove();
        }
        lottie.loadAnimation({
            container: document.getElementById(id),
            renderer: 'html',
            loop: false,
            autoplay: true,
            animationData: data
        });
    }

    // 判断两个数组是否相等
    function arrayEquals(arr1, arr2) {
        if (!arr1 || !arr2) {
            return false;
        }
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (var i = 0; i < arr1.length; i++) {
            // 如果有嵌套数组
            if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
                // 递归到嵌套数组
                if (!arrayEquals(arr1[i], arr2[i])) {
                    return false;
                }
            } else if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }

    // 初始化内容区域ContentBox
    function initContentBox() {
        $('.js-left-title .content-box').each(function() {
            setContentBox($(this), 'left');
        });

        $('.js-right-title .content-box').each(function() {
            setContentBox($(this), 'right');
        });
    }

    // 设置内容区域的样式
    function setContentBox($this, titleDirec) {
        var lineWidth = 2;
        var parentWidth = $this.parent().width();
        var parentHeight = $this.parent().height();
        var top = slantLines[1] + slantLines[2]*2 + lineWidth;
        var left = slantLines[2] + lineWidth;
        if ($this.parent().hasClass('running-time')) {
            top = top - slantLines[2];
        } else if ($this.parent().hasClass('risk-score')) {
            top = 0;
            left = 0;
        }
        $this.css({
            height: parentHeight - top,
            width: parentWidth - left,
            top: top
        });
        if (titleDirec === 'left') {
            $this.css({
                left: left
            });
        } else if (titleDirec === 'right') {
            $this.css({
                right: left
            });
        }
    }

    //最近风险事件滚动
    var riskSpeed=50;
    var risklist1=document.getElementById('risklist1');
    var risklist2=document.getElementById('risklist2');
    var riskGrid=document.getElementById('riskGrid');
    risklist2.innerHTML=risklist1.innerHTML;
    function riskMarquee(){
        if(risklist2.offsetTop-riskGrid.scrollTop<=0)
            riskGrid.scrollTop-=risklist1.offsetHeight;
        else{
            riskGrid.scrollTop++;
        }
    }
    setInterval(riskMarquee,riskSpeed);

    // 访问次数假数据
    // var top5 = {
    //         visetedTimes: [
    //             {name:'172.1.24.109',value:'1234567'},{name:'172.1.24.109',value:'1234566'}
    //             ],
    //         abnormerVisetedTimes: [
    //             {name:'172.1.24.109',value:'1234567'},{name:'172.1.24.109',value:'1234566'},{name:'172.1.24.109',value:'12345'}
    //             ]
    // };
    //     refreshVisitedList(top5.visetedTimes, top5.abnormerVisetedTimes);
    // refreshVisitedList(top5.abnormerVisetedTimes, top5.visetedTimes);





    // 更新风险级别数据;风险数据有变化是更新
    var riskDateChange=[];//装载风险有变化数据
    var riskDateToString;//将风险数据处理为字符串，方便比较是否相同
    function updateRiskLevel() {
        var highRisk = 0;
        var middleRisk = 0;
        var lowRisk = 0;
        for(var i=0; i<riskLevelData.length; i++){
            highRisk += Number(riskLevelData[i].highRisk);
            middleRisk += Number(riskLevelData[i].middleRisk);
            lowRisk += Number(riskLevelData[i].lowRisk);
        }
        riskDateToString = String(highRisk)+String(middleRisk)+String(lowRisk);
        if(urli-1 <0){
            if(!riskDateChange[2] || riskDateChange[2] !=riskDateToString) {
                riskDateChange[2] = riskDateToString;
                getqueryRiskDate();
                console.log('有变化了')
            }
        }else{
            if(!riskDateChange[urli-1] || riskDateChange[urli-1] !=riskDateToString) {
                riskDateChange[urli-1] = riskDateToString;
                getqueryRiskDate();
                console.log('有变化了')
            }
        }


        $('#high-risk-value').text(highRisk);
        $('#medium-risk-value').text(middleRisk);
        $('#low-risk-value').text(lowRisk);
    }



    //数据处理逻辑，封装成函数，方便每隔5秒进行调用
    //1、接口和性能数据、设备运行时间、状态曲线的请求数据
    function getPerSecondDate() {
        $.ajax({
            type: 'get',
            url: 'largeScreenShowRefreshPerSecond.action',
            success: function (data) {
                //状态曲线接口调试
                //cpu使用率数据
                if (conditionCurveCpudata.length > 20) {
                    conditionCurveCpudata.shift();
                    conditionCurveCpudata.push(parseInt(data.sysInfo.cpu));
                } else {
                    conditionCurveCpudata.push(parseInt(data.sysInfo.cpu));
                }
                //物理内存使用率数据
                if (conditionCurvememerydata.length > 20) {
                    conditionCurvememerydata.shift();
                    conditionCurvememerydata.push(parseInt(data.sysInfo.memery));
                } else {
                    conditionCurvememerydata.push(parseInt(data.sysInfo.memery));
                }



                //接口信息
                var arr = data.ethState.split("@@");
                if (arr[0] === '1') {
                    $(".interface-admin>div").css('background', 'url(img/admin1.png) no-repeat center');
                } else {
                    $(".interface-admin>div").css('background', 'url(img/admin0.png) no-repeat center');
                }
                if (arr[1] === '1') {
                    $(".interface-fe0>div").css('background', 'url(img/fe0_1.png) no-repeat center');
                } else {
                    $(".interface-fe0>div").css('background', 'url(img/fe0_0.png) no-repeat center');
                }
                if (arr[2] === '1') {
                    $(".interface-fe1>div").css('background', 'url(img/fe1_1.png) no-repeat center');
                }
                else {
                    $(".interface-fe1>div").css('background', 'url(img/fe1_0.png) no-repeat center');
                }
                if (arr[3] === '1') {
                    $(".interface-fe2>div").css('background', 'url(img/fe2_1.png) no-repeat center');
                }
                else {
                    $(".interface-fe2>div").css('background', 'url(img/fe2_0.png) no-repeat center');
                }

                //状态曲线接口调试结束

                // 性能信息获取数据
                if(sysInfoData.length >=4 ) {
                    sysInfoData.splice(0,sysInfoData.length);
                    sysInfoData.push(Math.floor(data.sysInfo.cpu));
                    sysInfoData.push(Math.floor(data.sysInfo.memery ));
                    sysInfoData.push(Math.floor(data.sysInfo.fileMemory));
                    sysInfoData.push(Math.floor(data.sysInfo.swapmemery));
                }else {
                    sysInfoData.push(Math.floor(data.sysInfo.cpu));
                    sysInfoData.push(Math.floor(data.sysInfo.memery ));
                    sysInfoData.push(Math.floor(data.sysInfo.fileMemory));
                    sysInfoData.push(Math.floor(data.sysInfo.swapmemery));
                }

            },
            error: function () {
                connectionInterRupt = false;
            }
        });
    }

    //2、 剩余请求数据(目前是年)

    //陌生分析数据处理函数
    function strange(t,arr) {
        var month;
        for (var i = 0; i < t.length; i++) {
            month = t[i].name.substring(4, 6);
            month=parseInt(month);
            if( t[i].value   === '' ){
                arr[month - 1]= 0
            }else{
                arr[month - 1] =parseInt(t[i].value);
            }
        }
        for(var m = 0; m < 12; m++){
            if (!arr[m]){
                arr[m] = 0;
            }
        }

    }
//数据库状态年月日视图数据处理函数
    function DatabaseStatus(type,t,arr1,arr2,arr3) {
        var Datakey;
        //    获取月的数据时的处理
        if(type === "month"){
            for (var i = 0; i < t.length; i++) {
                Datakey = parseInt(t[i].day);
                // month=parseInt(month);
                if( t[i].highRisk   === '' ){
                    arr1[Datakey - 1]= 0
                }else{
                    arr1[Datakey - 1] =parseInt(t[i].highRisk);
                }
                if( t[i].middleRisk   === '' ){
                    arr2[Datakey - 1]= 0
                }else{
                    arr2[Datakey - 1] =parseInt(t[i].middleRisk);
                }
                if( t[i].lowRisk   === '' ){
                    arr3[Datakey - 1]= 0
                }else{
                    arr3[Datakey - 1] =parseInt(t[i].lowRisk);
                }
            }

            for(var m = 0; m < dayArry.length; m++){
                if (!arr1[m]){
                    arr1[m] = 0;
                }
                if (!arr2[m]){
                    arr2[m] = 0;
                }
                if (!arr3[m]){
                    arr3[m] = 0;
                }
            }
        }
        //    获取年的数据时的处理
        else if(type === "year"){
            for (var i = 0; i < t.length; i++) {
                Datakey = parseInt(t[i].day);
                // month=parseInt(month);
                if( t[i].highRisk   === '' ){
                    arr1[Datakey - 1]= 0
                }else{
                    arr1[Datakey - 1] =parseInt(t[i].highRisk);
                }
                if( t[i].middleRisk   === '' ){
                    arr2[Datakey - 1]= 0
                }else{
                    arr2[Datakey - 1] =parseInt(t[i].middleRisk);
                }
                if( t[i].lowRisk   === '' ){
                    arr3[Datakey - 1]= 0
                }else{
                    arr3[Datakey - 1] =parseInt(t[i].lowRisk);
                }
            }

            for(var m = 0; m < 12; m++){
                if (!arr1[m]){
                    arr1[m] = 0;
                }
                if (!arr2[m]){
                    arr2[m] = 0;
                }
                if (!arr3[m]){
                    arr3[m] = 0;
                }
            }

        }
        //    获取日的数据时的处理
        else if (type === "day"){
            for (var i = 0; i < t.length; i++) {
                Datakey = parseInt(t[i].day);
                // month=parseInt(month);
                if( t[i].highRisk   === '' ){
                    arr1[Datakey - 1]= 0
                }else{
                    arr1[Datakey - 1] =parseInt(t[i].highRisk);
                }
                if( t[i].middleRisk   === '' ){
                    arr2[Datakey - 1]= 0
                }else{
                    arr2[Datakey - 1] =parseInt(t[i].middleRisk);
                }
                if( t[i].lowRisk   === '' ){
                    arr3[Datakey - 1]= 0
                }else{
                    arr3[Datakey - 1] =parseInt(t[i].lowRisk);
                }
            }

            for(var m = 0; m < 24; m++){
                if (!arr1[m]){
                    arr1[m] = 0;
                }
                if (!arr2[m]){
                    arr2[m] = 0;
                }
                if (!arr3[m]){
                    arr3[m] = 0;
                }
            }
        }
    }
    // 数据中心，风险分数，风险级别，数据库状态，访问次数top5，客户端分析，语句操作分析，陌生人闯入分析的请求数据
    function getByFiveSecondDate(saveByFiveDate) {
        var url = ["year", "month", "day"];
        var type = url[urli];

        //   剩余请求数据
        $.ajax({
            type:'get',
            url:'largeScreenShowRefreshByFiveSecond.action?flag='+ url[urli],
            success:function (data) {
                // 获取数据中心的数据
                dataCenterData = data.echartListFlowSpeed;
                // 如果这次请求到的数据中心的数据改变了，执行以下代码
                if (!arrayEquals(dataCenterData, lastCenterData)) {
                    prepareForDbBubble();
                    drawDbBubbleWrap();
                    initDbWrap();
                    clearInterval(bubbleInterval);
                    if (dataCenterData.length > 0) {
                        bubbleAction();
                    }
                    lastCenterData = dataCenterData;
                }

                // 获取风险级别数据
                riskLevelData = data.riskInfo;
                updateRiskLevel();
                //陌生分析数据
                strange(data.echartListStrangeOfIp,yAxisData4maxex);
                strange(data.echartListStrangeOfLogUsr,yAxisData3maxex);
                strange(data.echartListStrangeOfTool,yAxisData2maxex);
                strange(data.echartListStrangeOfHost,yAxisData1maxex);

                saveByFiveDate.datebaseYMDtype =type;//保存当前数据的年月日特征值
                DatabaseStatus(saveByFiveDate.datebaseYMDtype,data.riskInfo,saveByFiveDate.highData,saveByFiveDate.middleData,saveByFiveDate.lowData);

                //获取执行语句时间数据
                timeDatafiveMore=data.reportManageMainsBySqlExecTime[0].fiveMore;
                timeDatathreeFive=data.reportManageMainsBySqlExecTime[0].threeFive;
                timeDatazeroOne=data.reportManageMainsBySqlExecTime[0].zeroOne;
                timeDataoneThree=data.reportManageMainsBySqlExecTime[0].oneThree;
                //获取执行语句状态数据
                typeDataDelete=data.reportManageMainsByOperType[0].sumDelete;
                typeDataInsert=data.reportManageMainsByOperType[0].sumInsert;
                typeDataOther=data.reportManageMainsByOperType[0].sumOther;
                typeDataSelect=data.reportManageMainsByOperType[0].sumSelect;
                typeDataUpdate=data.reportManageMainsByOperType[0].sumUpdate;
                // 获取Top5的访问次数
                visitedListData = data.echartListVisit;
                abnormalVisitedListData = data.echartListAbnormalVisit;

                //获取客户端分析数据
                for(var j = 0; j < data.reportManageMainsByClient.length; j += 2) {
                    if (customerLastMonthdata.length >= 3) {
                        customerLastMonthdata.pop();
                        customerLastMonthdata.unshift(data.reportManageMainsByClient[j].countVisitorIP);
                    } else {
                        customerLastMonthdata.unshift(data.reportManageMainsByClient[j].countVisitorIP);
                    }
                    if (customerThisMonthdata.length >= 3) {
                        customerThisMonthdata.pop();
                        customerThisMonthdata.unshift(data.reportManageMainsByClient[j + 1].countVisitorIP);
                    } else {
                        customerThisMonthdata.unshift(data.reportManageMainsByClient[j + 1].countVisitorIP);
                    }
                }
                // 获取中心水球分值
                if(data.score < 0){
                    poloScoreData[0] = 0;
                    poloScoreData[1] = 0;
                    poloScoreData[2] = 0;
                }else if(data.score > 100) {
                    poloScoreData[0] = 100;
                    poloScoreData[1] = 100;
                    poloScoreData[2] = 100;
                }else{
                    poloScoreData[0] = data.score / 100;
                    poloScoreData[1] = (data.score - 2)/ 100;
                    poloScoreData[2] = Math.floor(data.score / 10) / 10;
                }

            },

            error:function () {
                connectionInterRupt = false
            }
        });
        if(urli < 3){
            urli++;
        }
        if(urli === 3){
            urli = 0;
        }
    }
    //3、最近风险事件表格请求数据
    function getqueryRiskDate() {

        //最近风险事件表格请求数据
        $.ajax({
            type: 'get',
            url: 'queryRisk.action?recordR.riskLev=5&recordR.dealState=0&limit=10&page=1&start=0&flagByLSS=true',
            success: function (data) {
                var latestRows = data.latestRows;

                for (i in latestRows) {
                    // console.log(data.latestRows[i].riskLev);
                    if (latestRows != null && latestRows.length != 0) {
                        switch (latestRows[i].riskLev) {
                            case 0 :
                                latestRows[i].riskLev = "高级";
                            case 1 :
                                latestRows[i].riskLev = "中级";
                            case 2 :
                                latestRows[i].riskLev = "低级";
                            case 3 :
                                latestRows[i].riskLev = "关注行为";
                        }
                        if (latestRows[i].time.length > 0) {
                            latestRows[i].time = latestRows[i].time.replace("T", " ");
                        }
                        latestRows[i].extendA = latestRows[i].extendA.replace(/<\/?.+?>/g, "");// 含有样式就去除样式

                    }

                    var  content = ' <li class="riskData"> <span class="riskLevel">' + latestRows[i].riskLev + '</span> <span class="riskTime">' + latestRows[i].time + '</span><span class="description">' + latestRows[i].extendA + '</span></li>';
                    $("#riskGrid ul").append(content);
                    // content.appendTo$("#riskGrid ul");
                }


            },
            error: function () {
                connectionInterRupt = false
            }
        });

    }
    var clearFlag =0;//5秒刷新一次，清理echart图特征值
    var clearOneFlag =0;//5秒刷新一次，清理echart图特征值

    var conditionCurveUserOption;
    var timeDataOption;
    var typeDataOption;
    var databaseYearOption;
    var customerRefreshOption;
    var gradepoloScoreOption;

    var setIntervalFive =setInterval(function () {
        var saveByFiveDate = new Object();
        saveByFiveDate.highData = [];//高风险数据
        saveByFiveDate.middleData = [];//中风险数据
        saveByFiveDate.lowData = [];
        saveByFiveDate.datebaseYMDtype;
        //用变量存放每隔5秒刷新的数据，目的同步刷新所有的数据
        // let  a=[];//状态曲线数据a
        //如果离开页面后停止发送请求
        if(top.Ext.getCmp("largeScreenShow-group").activeTab.id === 'tab-largeScreenShow'){
            clearFlag++;
            getByFiveSecondDate(saveByFiveDate);

            //请求异常处理
            if(!connectionInterRupt){
                alert('连接中断',new Date());
                clearInterval(setIntervalFive);
            }

            setTimeout(function () {
                // 播放年月日视图动画
                dateAnimate('#risk-date', '信息', saveByFiveDate.datebaseYMDtype);
                dateAnimate('#status-date', '视图', saveByFiveDate.datebaseYMDtype);

                databaseYearOption=databaseYear.getOption();
                strangeBreakOption = strangeBreak.getOption();

                customerRefreshOption=customerChart.getOption();
                gradepoloScoreOption = gradePolo.getOption();
                timeDataOption=setenceTime.getOption();
                typeDataOption=operationType.getOption();

                if(clearFlag >12){

                    echartClaer();
                    clearFlag=0;
                }
                if(poloScoreData[0] !== lastPoloScoreData){
                    RedrawPolo(poloScoreData);
                    lastPoloScoreData = poloScoreData[0];
                }
                refreshcustomerChart (customerLastMonthdata,customerThisMonthdata);
                refreshtimeoption(timeDatafiveMore,timeDatathreeFive,timeDatazeroOne,timeDataoneThree);
                refreshtypeoption(typeDataUpdate,typeDataDelete,typeDataOther,typeDataInsert,typeDataSelect);
                RedrawstrangeBreak(yAxisData1maxex,yAxisData2maxex,yAxisData3maxex,yAxisData4maxex);
                refreshVisitedList(visitedListData,abnormalVisitedListData);
                RedrawDatabases(saveByFiveDate.datebaseYMDtype, saveByFiveDate.highData,saveByFiveDate.middleData,saveByFiveDate.lowData);
            },15000)
        }else{
            clearInterval(setIntervalFive);
        }


    },5000);


    //需要一秒刷新一次的数据
    var setIntervalPerSecond= setInterval(function () {
        if(top.Ext.getCmp("largeScreenShow-group").activeTab.id === 'tab-largeScreenShow') {
            //用变量存放每隔1秒刷新的数据，目的同步刷新所有的数据
            clearOneFlag++;
            getPerSecondDate();
            //请求异常处理
            if (!connectionInterRupt) {
                alert('连接中断',new Date());
                clearInterval(setIntervalPerSecond);
            }

            setTimeout(function () {

                conditionCurveUserOption = conditionCurve.getOption();//返回包含用户操作的option，状态曲线
                if (clearOneFlag > 60) {
                    conditionCurve.clear();//状态曲线
                    clearOneFlag = 0;
                }

                refreshconditionCurve(conditionCurveCpudata, conditionCurvememerydata);
                refreshsysInfodata(sysInfoData);


            }, 20000)
        }else{
            clearInterval(setIntervalPerSecond);
        }
    },1000);

    //写刷新页面函数，比如echart用的setOption
    //刷新状态曲线
    function refreshconditionCurve (conditionCurveCpudata,conditionCurvememerydata) {
        conditionCurveUserOption.series[0].data = conditionCurveCpudata;
        conditionCurveUserOption.series[1].data = conditionCurvememerydata;
        conditionCurve.setOption(conditionCurveUserOption)
    }
    //刷新客户端分析图表
    function refreshcustomerChart (customerLastMonthdata,customerThisMonthdata) {
        customerRefreshOption.series[0].data = customerLastMonthdata;
        customerRefreshOption.series[1].data = customerThisMonthdata;
        customerChart.setOption(customerRefreshOption);
    }
    // 刷新性能信息
    //sysInfoData = ['67','89','23','666'];
    //refreshsysInfodata(sysInfoData);
    function refreshsysInfodata (sysInfoData)  {

        var colorLine = $('.performance-item').height() * 0.08;
        var transparentLine = $('.performance-item').height() * 0.10;
        for(var  i = 0;  i < sysInfoData.length;i++) {
            $('.performance-item:eq('+i+') span:eq(0)').html(sysInfoData[i]);

            if(sysInfoData[i]> 100) {
                $('.performance-item:eq('+i+') div').height($('.performance-item').height());
                $('.performance-item:eq('+i+') div').css({ background: 'repeating-linear-gradient(0deg,#ff1600 0, #ff1600 '+ colorLine +'px,transparent '+colorLine+'px, transparent '+transparentLine+'px)'}) ;
                $('.performance-item:eq('+i+') span').css({color:'#ff1600'});

            }else{
                $('.performance-item:eq('+i+') div').height((sysInfoData[i] - 0)/100 * $('.performance-item').height());
                $('.performance-item:eq('+i+') div').css({
                    background: 'repeating-linear-gradient(0deg,#14848B 0, #14848B '+ colorLine +'px,transparent '+colorLine+'px, transparent '+transparentLine+'px)'
                })
                $('.performance-item:eq('+i+') span').css({color:'#d9e4ff'});
            }
        }
    }
    // 刷新访问次数Top5
    function refreshVisitedList(visited,abnormalVisited) {
        var $visitedUl = $('.visited-times ul');
        var $abnVisitedUl = $('.abnormal-visited-times ul');
        $visitedUl.empty();
        $abnVisitedUl.empty();
        for(var i = 0; i < visited.length;i++){
            var visitedUlDom ="<li>\n" + "<i>"+(i+1)+"</i>\n" + "<em>"+visited[i].name+"</em>\n" + "<span>"+visited[i].value +"</span>\n"+"</li>";
            $visitedUl.append(visitedUlDom);

        }
        for(var i = 0;i < abnormalVisited.length;i++)  {
            var abnVisitedUlDom = "<li>\n" + "<i>"+(i+1)+"</i>\n" + "<em>"+abnormalVisited[i].name+"</em>\n" +"<span>"+abnormalVisited[i].value+"</span>\n" + "</li>";
            $abnVisitedUl.append(abnVisitedUlDom);
        }
    }
    //写执行语句 执行时间数据
    function refreshtimeoption(timeDatafiveMore,timeDatathreeFive,timeDatazeroOne,timeDataoneThree){

        timeDataOption.series[0].data[0].value=timeDatazeroOne;
        timeDataOption.series[0].data[1].value=timeDatathreeFive;
        timeDataOption.series[0].data[2].value=timeDataoneThree;
        timeDataOption.series[0].data[3].value=timeDatafiveMore;

        setenceTime.setOption(timeDataOption);
    }
    function refreshtypeoption(typeDataUpdate,typeDataDelete,typeDataOther,typeDataInsert,typeDataSelect) {
        typeDataOption.series[0].data[0].value=typeDataSelect;
        typeDataOption.series[0].data[1].value=typeDataUpdate;
        typeDataOption.series[0].data[2].value=typeDataInsert;
        typeDataOption.series[0].data[3].value=typeDataDelete;
        typeDataOption.series[0].data[4].value=typeDataOther;
        operationType.setOption(typeDataOption);
    }
    //重绘陌生工具
    function RedrawstrangeBreak(yAxisData1maxex,yAxisData2maxex,yAxisData3maxex,yAxisData4maxex) {
        strangeBreakOption.series[0].data = yAxisData1maxex;
        strangeBreakOption.series[1].data = yAxisData2maxex;
        strangeBreakOption.series[2].data = yAxisData3maxex;
        strangeBreakOption.series[3].data = yAxisData4maxex;
        strangeBreak.setOption(strangeBreakOption);
    }
    // 重绘水球
    function RedrawPolo(poloScoreData) {
        gradepoloScoreOption.series[0].data[0].value = poloScoreData[0];
        gradepoloScoreOption.series[0].data[1].value = poloScoreData[1];
        gradepoloScoreOption.series[0].data[2].value = poloScoreData[2];
        for(var i = 0; i < gradepoloScoreOption.series[0].data.length-1; i++) {
            for(var j = 0;j < gradepoloScoreOption.series[0].data[i].itemStyle.color.colorStops.length; j++) {
                gradepoloScoreOption.series[0].data[i].itemStyle.color.colorStops[j].color  = colors[ poloScoreData[2]*10 ].top;

            }
        }
        gradepoloScoreOption.series[0].data[2].itemStyle.color.colorStops[0].color  = colors[ poloScoreData[2]*10 ].bottom;
        gradepoloScoreOption.series[0].data[2].itemStyle.color.colorStops[1].color  = colors[ poloScoreData[2]*10 ].top;


        gradePolo.clear();  //水球图
        gradePolo.setOption(gradepoloScoreOption,true);
        $("#insetPolo span:eq(0)").html(Math.floor(gradepoloScoreOption.series[0].data[0].value * 100));
    }

    //重绘数据库状态
    function RedrawDatabases(datebaseYMDtype,highData,middleData,lowData) {
        if(datebaseYMDtype =='month'){
                databaseYearOption.xAxis[0].data=dayArry;
            }
        if(datebaseYMDtype =='year'){
                databaseYearOption.xAxis[0].data = datebaseyearDate;
            }
        if(datebaseYMDtype =='day'){
                databaseYearOption.xAxis[0].data =  datebaseTimeDate;
            }
        databaseYearOption.series[0].data = highData;
        databaseYearOption.series[1].data = middleData;
        databaseYearOption.series[2].data = lowData;
        databaseYear.setOption(databaseYearOption);
    }
    // refreshsysInfodata(sysInfoData);
    //避免浏览器开销太大，对echart图进行清理
    function echartClaer() {

        databaseYear.clear();//数据库状态
        strangeBreak.clear();//陌生闯入分析
        customerChart.clear();//客户端图表
        setenceTime.clear();//执行语句 时间
        operationType.clear();//执行语句 状态
    }

    // 年月日视图动画
    function dateAnimate(id, text, type) {
        var eq;
        switch (type) {
            case 'year':
                eq = 0;
                break;
            case 'month':
                eq = 1;
                break;
            case 'day':
                eq = 2;
                break;
        }
        var dateItem = $(id).find('.date-item');
        var activeDateItem = dateItem.eq(eq);

        dateItem.each(function(){
            $(this).find('span').text($(this).find('span').text().charAt(0));
        });
        activeDateItem.find('span').fadeOut();
        dateItem.removeClass('active-date-item');
        activeDateItem.addClass('active-date-item');
        setTimeout(function() {
            activeDateItem.find('span').text(activeDateItem.find('span').text() + text);
            activeDateItem.find('span').fadeIn();
        }, 500);
    }

    // 获取设备运行时间函数
    $.ajax({
        type: 'get',
        url: 'largeScreenShowRefreshPerSecond.action',
        success: function (data) {
            // 获取时间
            workedTimeData = data.workedTime;
        },
        error:function(){
            connectionInterRupt = false;
        }
    });
    // 时间自加
    setInterval(function(){
        workedTimeData += 1000;
        getRunningTime(workedTimeData);
    },1000);
    // 时间换算
    function getRunningTime(time){
        var time_d = Math.floor(time / 86400000);
        var time_h = Math.floor((time - time_d * 86400000) / 3600000);
        var time_m = Math.floor((time - time_d * 86400000 - time_h * 3600000) / 60000);
        var time_s = Math.floor((time - time_d * 86400000 - time_h * 3600000 - time_m * 60000) / 1000);

        if (time_d < 10) {
            time_d = "00" + time_d;
        } else if (time_d < 100) {
            time_d = "0" + time_d;
        }
        if (time_h < 10) {
            time_h = "0" + time_h;
        }
        if (time_m < 10) {
            time_m = "0" + time_m;
        }
        if (time_s < 10) {
            time_s = "0" + time_s;
        }

        $("#time_day").html(time_d);
        $("#time_hour").html(time_h);
        $("#time_minute").html(time_m);
        $("#time_second").html(time_s);
    }
    $.fn.scrollTop = function(options){
        var defaults = {
            speed:100
        };
        var opts = $.extend(defaults,options);
        this.each(function(){
            var $timer;
            var scroll_top=0;
            var obj = $(this);
            var $height = obj.find("ul").height();
            obj.find("ul").clone().appendTo(obj);

            $timer = setInterval(function(){
                //请求异常处理,关闭定时器
                if(!connectionInterRupt){
                    alert('连接中断',new Date());
                    clearInterval($timer);
                }

                scroll_top++;
                if(scroll_top > $height){
                    scroll_top = 0;
                }

                obj.find("ul").first().css("margin-top",-scroll_top);
            },opts.speed);


        })
    };

    // 浏览器窗口改变执行函数
    $(window).resize(function() {
        initLineLength();
        initDomStyle();
        initDbWrap();
        initContentBox();

        conditionCurve.resize();//重绘echart图
        databaseYear.resize();//数据库状态
        strangeBreak.resize();//陌生闯入分析
        customerChart.resize();//客户端图表
        setenceTime.resize();//执行语句 时间
        operationType.resize();//执行语句 状态
        gradePolo.resize();  //水球图
    });

    // $("#riskGrid").on("click",scrollTop({
    //     speed:100//数值越大 速度越慢
    // }));

})(jQuery);