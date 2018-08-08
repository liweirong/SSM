/*chart-option
  这个文件用来定义图表的option
  */

var chartFontSize = 100;
initChartFontSize();
$(window).resize(function() {
    initChartFontSize();
});

function initChartFontSize() {
    chartFontSize = 100;
    var windowWidth = $(window).width();
    // 1920 === 100px
    if (windowWidth > 1480) {
        chartFontSize = parseInt((windowWidth / 1920)*100);
    } else {
        chartFontSize = parseInt((1480 / 1920)*100);
    }
}


// 状态曲线
var conditionCurveCpudata=[];//状态曲线的cpu数据
var conditionCurvememerydata =[];//状态曲线的物理内存数据
var conditionCurveOption = {
    tooltip: {
        show:false,
        trigger: 'axis'
    },
    legend: {
        data:[
            {
                name: 'cpu',
                // 强制设置图形为圆。
                // 设置文本为红色
                textStyle: {
                    fontSize: 0.16*chartFontSize,
                    color: '#49ecff'
                }
            },
            {
                name: '物理内存',
                // 强制设置图形为圆。

                // 设置文本为红色
                textStyle: {
                    fontSize: 0.16*chartFontSize,
                    color:'#53d67e'
                }
            }
        ],
        itemWidth:0,
        itemHeight:0
    },
    grid: {

        left: '2',
        right: '20',
        y:'35',
        y2:'17%',
        axisPointer:false,
        containLabel: true
    },

    xAxis: {
        type: 'category',
        boundaryGap: false,
        splitLine :{
            show:false
        },

        axisTick:{
            show :false
        },
        itemHeight:5,
        data: []
    },
    yAxis: {
        type: 'value',
        max:100,
        min:0,
        axisLine:{
            show :false
        },
        //修改表格线
        splitLine :{
            lineStyle:{
                width:2,
                color:'rgb(92,114,160)'
            }
        },
        axisTick:{
            show :false
        },
        axisLabel:{
            marginTop:100,
            formatter: '{value}%',
            textStyle:{
                fontSize: 0.12*chartFontSize,
                color:'#ade3ff'
            }
        }

    },
    series: [
        {
            name:'cpu',
            type:'line',
            smooth: true,
            showSymbol:false,
            itemStyle:{
                normal:{
                    color:'#49ecff',
                    lineStyle:{
                        width:3
                    }
                }
            },
            data:conditionCurveCpudata,
            //data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name:'物理内存',
            type:'line',
            smooth: true,
            showSymbol:false,
            itemStyle:{
                normal:{
                    color:'#53d67e',

                    lineStyle:{
                        width:3
                    }
                }
            },
            data:conditionCurvememerydata
            // data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 91.6, 46.6, 55.4, 18.4, 10.3, 0.7]

        }

    ]
};
//陌生闯入分析图
var yAxisData4maxex = [];//陌生Ip数据
var yAxisData2maxex = [];//陌生账号数据
var yAxisData3maxex = [];//陌生工具数据
var yAxisData1maxex = [];//陌生主机数据
var poloScoreData = []; // 中心水球数据
var lastPoloScoreData = null;
var strangeOption = {
    color: ['#ffaa24', '#49ecff', '#5ce476', '#d5d745'],
    legend: {
        itemHeight:0,
        itemWidth:0,
        selectedMode:false,//取消图例上的点击事件
        data: [{
            name: '陌生主机',
            textStyle: {
                fontSize: 0.16*chartFontSize,
                color: '#ffaa24'
            }
        }, {
            name: '陌生工具',
            textStyle: {
                fontSize: 0.16*chartFontSize,
                color: '#49ecff'
            }
        }, {
            name: '陌生账号',
            textStyle: {
                fontSize: 0.16*chartFontSize,
                color: '#5ce476'
                // font : '微软雅黑'
            }
        },{
            name:'陌生IP',
            textStyle: {
                fontSize: 0.16*chartFontSize,
                color: '#d5d745'
                // font : '微软雅黑'
            }
        }]
    },
    grid:{
        x:50,
        y:40,
        x2:10,
        y2:30
        // left: '6%',
        // right: '20',
        // y:'30'
    },
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
            '十月', '十一月', '十二月'],
        axisLabel : {//坐标轴文本标签选项
            textStyle: {
                color: '#ade3ff',
                fontSize: 0.1*chartFontSize
            }
        },
        splitLine:{show: false},
        axisLine:{
            lineStyle:{
                color:'#82a2ff',
                width:1//这里是为了突出显示加上的
            }
        }
    }],
    yAxis: [{
        type: 'value',
        axisTick: {
            show: false
        },
        axisLine: {
            show: false,
            // y轴是否显示
            lineStyle:{
                color:'#6C85B9',
                width:1//这里是为了突出显示加上的
            }
        },
        splitLine: {
            lineStyle: {
                color: "#82a2ff"
            }
        },
        axisLabel : {//坐标轴文本标签选项
            margin:4,
            textStyle: {
                color: '#ade3ff',
                align:'right',
                fontSize: 0.1*chartFontSize
            }
        }

    }],

    series: [{
        name: '陌生主机',
        type: 'bar',
        barGap:0,
        itemStyle : {
            normal : {
                barBorderColor: "rgba(0, 161, 185, 0.6)",
                barBorderWidth: 1
            }
        },
        // data: [12, 5, 6, 5, 1, 3, 3, 5, 2,2, 5, 6]
        data: yAxisData1maxex
    }, {
        name: '陌生工具',
        type: 'bar',
        itemStyle : {
            normal : {
                barBorderColor: "rgba(0, 161, 185, 0.6)",
                barBorderWidth: 1
            }
        },
        // data: [6, 3, 8, 9, 6, 5, 4, 7, 5,1, 4, 5]
        data: yAxisData2maxex
    }, {
        name: '陌生账号',
        type: 'bar',
        itemStyle : {
            normal : {
                barBorderColor: "rgba(0, 161, 185, 0.6)",
                barBorderWidth: 1
            }
        },
        // data: [6, 5, 8, 1, 4, 5, 9, 7, 3,5, 9, 7]
        data: yAxisData3maxex
    }, {
        name: '陌生IP',
        type: 'bar',
        itemStyle : {
            normal : {
                barBorderColor: "rgba(0, 161, 185, 0.6)",
                barBorderWidth: 1
            }
        },
        // data: [66, 35, 121, 58, 454, 55, 94, 47, 74,45, 54, 47]
        data: yAxisData4maxex
    }]
};


//数据库状态—月视图
var timeDataoneThree=null;//执行语句 0-3s的数据 初始化
var timeDatafiveMore=null;//执行语句超过5s的数据 初始化
var timeDatazeroOne=null;//执行语句 0-1s的数据  初始化
var timeDatathreeFive=null; //执行语句 3-5s的数据 初始化
var typeDataUpdate=null;
var typeDataSelect=null;
var typeDataInsert=null;
var typeDataDelete=null;
var typeDataOther=null;
var highData = [];//高风险数据
var middleData = [];//中风险数据
var lowData = [];//低风险数据

//数据库状态x轴坐标轴
var datebaseyearDate=['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
var datebaseTimeDate= ['00:00', '01:00','02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00','15:00', '16:00', '17:00','18:00', '19:00', '20:00','21:00', '22:00', '23:00']

function getCountDays() {
    var curDate = new Date();
    /* 获取当前月份 */
    var curMonth = curDate.getMonth();
    /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
    curDate.setMonth(curMonth + 1);
    curDate.setDate(0);
    /* 返回当月的天数 */
    return curDate.getDate();
}
var day=getCountDays();
var dayArry=[];
for (var k = 1; k <= day; k++) {
    dayArry.push(k);
}
var yearMonDayOption = {
    color: ['#ff530f', '#ff9524', '#d8ff00'],
    tooltip:{
        show:false
    },
    legend: {
        itemHeight:0,
        itemWidth:0,
        selectedMode:false,//取消图例上的点击事件
        data: [{
            name: '高风险',
            textStyle: {
                fontSize: 0.16*chartFontSize,
                color: '#ff530f'
            }
        },{
            name: '中风险',
            textStyle: {
                fontSize: 0.16*chartFontSize,
                color: '#ff9524'
                // font : '微软雅黑'
            }
        },{
            name:'低风险',
            textStyle: {
                fontSize: 0.16*chartFontSize,
                color: '#d8ff00'
                // font : '微软雅黑'
            }
        }]
    },
    grid:{
        x:50,
        y:60,
        x2:20,
        y2:30
        // left: '6%',
        // right: '25',
        // y:'55'
    },
    xAxis: [{
        type: 'category',
        axisTick: {
            show: false
        },
        data: datebaseyearDate,
        axisLabel : {//坐标轴文本标签选项
            textStyle: {
                color: '#ade3ff',
                fontSize: 0.1*chartFontSize
            }
        },
        splitLine:{show: false},
        axisLine:{
            lineStyle:{
                color:'#82a2ff',
                width:1//这里是为了突出显示加上的
            }
        }
    }],
    yAxis: [{
        type: 'value',
        name: "单位（个）",
        nameTextStyle: {
            color: '#ade3ff',
            fontSize: 0.1*chartFontSize
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false,
            // y轴是否显示
            lineStyle:{
                color:'#6C85B9',
                width:1//这里是为了突出显示加上的
            }
        },
        splitLine: {
            lineStyle: {
                color: "#82a2ff"
            }
        },
        axisLabel : {//坐标轴文本标签选项
            margin:4,
            textStyle: {
                color: '#ade3ff',
                align:'right',
                fontSize: 0.1*chartFontSize
            }
        }

    }],

    series: [{
        name: '高风险',
        type: 'bar',
        barGap:0,
        itemStyle : {
            normal : {
                barBorderColor: "rgba(0, 161, 185, 0.6)",
                barBorderWidth: 1
            }

        },
        // data: [120, 50, 60, 50, 15, 50, 30, 50, 20,120, 50, 60,55,96,366,448,52,466,553,66,120, 50, 60, 50, 15, 50, 30, 50, 20,120, 50]
        data: highData
    }, {
        name: '中风险',
        type: 'bar',
        itemStyle : {
            normal : {
                barBorderColor: "rgba(0, 161, 185, 0.6)",
                barBorderWidth: 1
            }

        },
        // data: [66, 35, 58, 454, 456, 5, 45, 47, 45,121, 454, 415,120, 50, 60, 50, 15, 50, 30, 50, 20,120, 50 ,45,121, 454, 415,120, 50,415,120]
        data: middleData
    }, {
        name: '低风险',
        type: 'bar',
        itemStyle : {
            normal : {
                barBorderColor: "rgba(0, 161, 185, 0.6)",
                barBorderWidth: 1
            }
        },
        // data: [66, 35, 58, 121, 454, 415, 54, 47, 45,415, 54, 47,45,121, 454, 415,120, 50, 60, 50, 15, 50, 30, 50, 20,120, 50 ,45,121, 454,120]
        data: lowData
    }]
};


//操作语句分析图 操作类型图
var typeOption = {
    title: {
        text:'操作类型',
        left:'28%',
        top:'45%',
        padding:[-8,-21],
        textStyle:{
            color:'#d9e4ff',
            fontSize: 0.12*chartFontSize,
            align:'center'
        }
    },
    tooltip:{
        show:false
    },
    grid:{
        x:50
    },
    legend: [{
        x : '48%',
        y : '8%',
        selectedMode:false,//取消图例上的点击事件
        itemWidth:0,
        data:[
            {
                name:'select',
                icon:'none',
                textStyle:{
                    color:'#d5d745',
                    fontSize: 0.16*chartFontSize
                }
            },
            {
                name:'update',
                icon:'none',
                textStyle:{
                    color:'#5ce476',
                    fontSize: 0.16*chartFontSize
                }
            }]
    },
        {
            x : '48%',
            y : '32%',
            itemWidth:0,
            selectedMode:false,//取消图例上的点击事件
            data:[
                {
                    name:'insert',
                    icon:'none',
                    textStyle:{
                        color:'#ffaa24',
                        fontSize: 0.16*chartFontSize
                    }
                },
                {
                    name:'delete',
                    icon:'none',
                    textStyle:{
                        color:'#ff530f',
                        fontSize: 0.16*chartFontSize
                    }

                }]},
        {
            x: '48%',
            y: '56%',
            itemWidth:0,
            selectedMode:false,//取消图例上的点击事件
            data: [{
                name: 'other',
                icon: 'none',
                textStyle: {
                    color: '#0096ff',
                    fontSize: 0.16*chartFontSize
                }
            }]
        }
    ],
    color: ['#d5d745', '#5ce476', '#ffaa24','#ff530f','#0096ff'],
    series : [
        {
            name:'半径模式',
            type:'pie',
            hoverAnimation:false,
            radius : ["65%","90%"],
            center : ['28%', "45%"],
            roseType : 'radius',
            width: '40%',       // for funnel
            max: 40,            // for funnel
            itemStyle : {
                normal : {
                    borderColor: "rgba(0, 161, 185, 0.6)",
                    borderWidth: 1,
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                }

            },
            data:[
                {value:typeDataSelect,name:'select'},
                {value:typeDataUpdate, name:'update'},
                {value:typeDataInsert, name:'insert'},
                {value:typeDataDelete, name:'delete'},
                {value:typeDataOther, name:'other'}
            ]
        }

    ]
};

//操作语句分析图 执行时间图
var timeoption = {
    title: {
        text:'执行时间',
        left:'30%',
        top:'50%',
        padding:[-12,-21],
        textStyle:{
            color:'#d9e4ff',
            fontSize: 0.12*chartFontSize,
            align:'center'
        }
    },
    legend: [{
        x : '50%',
        y : '8%',
        selectedMode:false,//取消图例上的点击事件
        itemWidth:0,
        data:[
            {
                name:'0~1s',
                icon:'none',
                textStyle:{
                    color:'#0093ff',
                    fontSize: 0.16*chartFontSize
                }
            },
            {
                name:'3~5s',
                icon:'none',
                textStyle:{
                    color:'#5ce476',
                    fontSize: 0.16*chartFontSize
                }
            }
        ]},
        {
            x : '50%',
            y : '32%',
            selectedMode:false,//取消图例上的点击事件
            itemWidth:0,
            data:[
                {
                    name:'1~3s',
                    icon:'none',
                    textStyle:{
                        color:'#cdd04a',
                        fontSize: 0.16*chartFontSize
                    }
                },{
                    name:'>5s',
                    icon:'none',
                    textStyle:{
                        color:'#e26c33',
                        fontSize: 0.16*chartFontSize
                    }

                }]}
    ],
    // grid:{
    //     x:100,
    //     x2:20
    // },
    color: ['#0093ff', '#5ce476', '#cdd04a','#e26c33'],
    series : [
        {
            name:'半径模式',
            type:'pie',
            hoverAnimation:false,
            radius : ["65%","85%"],
            center : ['30%', "45%"],
            roseType : 'radius',
            width: '40%',       // for funnel
            max: 40,            // for funnel
            itemStyle : {
                normal : {
                    borderColor: "rgba(0, 161, 185, 0.6)",
                    borderWidth: 1,
                    label : {
                        show : false
                    },
                    labelLine : {
                        show : false
                    }
                }

            },
            data:[
                /* {value:10, name:'0~1s'},
                 {value:10, name:'3~5s'},
                 {value:10, name:'1~3s'},
                 {value:10, name:'>5s'}*/
                {value:timeDatazeroOne, name:'0~1s'},
                {value:timeDatathreeFive, name:'3~5s'},
                {value:timeDataoneThree, name:'1~3s'},
                {value:timeDatafiveMore, name:'>5s'}
            ]
        }

    ]
};


//客户端分析
var customerLastMonthdata=[]; //客户端分析的上月数据
var customerThisMonthdata=[]; //客户端分析的本月数据
var customerOption = {
    tooltip: {
        show: false //取消提示框
    },
    grid: {
        y: '20%', //设置表格距离顶部位置为10%
        x: '15%',
        bottom: '15%'
    },
    legend: {
        data:['上月','本月'],
        itemWidth: 0,
        selectedMode: false, //取消图例的点击效果
        textStyle:{
            color: ['#49ecff','#53d67e'],
            fontSize: 0.16*chartFontSize
        }
    },
    xAxis: {
        show: false  //不显示X轴
    },
    yAxis: {
        data: ["工具","账号","IP"],
        axisLabel: {
            show: true, //显示Y轴文本标签
            textStyle: {
                color: '#ade3ff',
                fontSize: 0.14*chartFontSize
            },
            marginTop:100
        },
        axisTick: {
            show: false //不显示坐标轴小标志
        }
    },
    series: [
        {
            name: '上月',
            type: 'bar',
            barWidth: '20%',
            data: customerLastMonthdata,
            // data: [200,260,340],
            itemStyle:{
                normal: {
                    color: 'rgba(73,236,255,0.8)',
                    barBorderRadius:[0, 5, 5, 0],
                    borderColor: '#005d8b',
                    borderWidth: 2,
                    label: {
                        show: true,
                        position: 'right'
                    }
                }
            }
        },
        {
            name: '本月',
            type:'bar',
            barWidth: '20%',
            barGap: '55%',
            data:customerThisMonthdata,
            // data: [1000,60,830],
            itemStyle:{
                normal: {
                    color: 'rgba(83,214,126,0.8)',
                    barBorderRadius:[0, 5, 5, 0],
                    borderColor: '#005d8b',
                    borderWidth: 2,
                    label: {
                        show: true,
                        position: 'right'
                    }
                }
            }
        }
    ]
};

// 十个阶段的水球液体颜色
var colors=[
    {
        bottom: "#ea1b00",
        top: "#b91e1e"
    },
    {
        bottom: "#e84b00",
        top: "#c43f2e"
    },
    {
        bottom: "#fa7500",
        top: "#c6541d"
    },
    {
        bottom: "#ff9c00",
        top: "#c16412"
    },
    {
        bottom: "#ffc000",
        top: "#b78a00"
    },
    {
        bottom: "#ffe100",
        top: "#c8b734"
    },
    {
        bottom: "#f6ff00",
        top: "#c4ad00"
    },
    {
        bottom: "#80f700",
        top: "#d3d929"
    },
    {
        bottom: "#00ec4f",
        top: "#73c61a"
    },
    {
        bottom: "#00ffc0",
        top: "#0cc24a"
    },
    {
        bottom: "transparent",
        top: "transparent"
    }
];
//  水球配置
var gradePoloOption = {
    series: [{
        type: 'liquidFill',
        animation: true,
        waveAnimation: true,
        data: [
            {
                value: 0,
                direction: 'left',
                itemStyle: {
                    normal: {
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0,
                                color: colors[10].top, opacity: 1  // 0% 处的颜色
                            }, {
                                offset: 1, color: colors[10].bottom,opacity: 1  // 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        }
                    }
                }
            },
            {
                value: 0,
                direction: 'left',
                itemStyle: {
                    normal: {
                        color:{
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: colors[10].top,opacity: 0.8 // 0% 处的颜色
                            }, {
                                offset: 1, color: colors[10].top,opacity: 0.8// 100% 处的颜色
                            }],
                            globalCoord: false // 缺省为 false
                        },
                        shadowColor:'10px 10px 5px #888888 inset'
                    }
                }
            },
            {
                value: 0,
                direction: 'left',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 1, 0, 0,
                            [
                                {offset: 0, color: colors[10].bottom, opacity: 1 },
                                {offset: 1, color: colors[10].top,opacity: 1}
                            ]
                        )
                    }
                }
            }
        ],
        // data: [0.98, 0.97, 0.96, 0.94],
        amplitude: 8,//水球波浪起伏大小
        radius: '100%',
        center: ['50%', '50%'],
        // outline  外边
        outline: {
            borderDistance: 4,
            itemStyle: {
                color: 'none',
                borderWidth: 0,
                borderColor: '#003a89'
            }
        },
        label: {
            normal: {
                formatter: function(param) {
                    // return param.value * 100;
                    return ''
                }
            }
        },
        // 内图 背景色 边
        backgroundStyle: {
            color: 'rgba(4,24,74)',
            borderColor: 'rgba(4,24,74)'
        }
        //
    }]
};
// 水球分值填入
$("#insetPolo span:eq(0)").html(Math.floor(gradePoloOption.series[0].data[0].value * 100));
