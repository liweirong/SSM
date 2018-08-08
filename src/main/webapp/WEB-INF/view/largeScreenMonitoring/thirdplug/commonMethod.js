Ext.QuickTips.init();
var licenseStatus = 1;
var systemSten = true;  //此变量控制系统语句过滤添加删除的开关
var jsonFlag;
Ext.PagingToolbar1 = Ext.extend(Ext.PagingToolbar, {
    doRefresh: function (a, b, c, d) {
        a.ownerCt.ownerCt.getStore().baseParams.refresh = true;
        var timpType = a.ownerCt.ownerCt.getStore().baseParams.timeTypeString;
        if (timpType != 12) {
            var timpType = getCurentTimeRang(timpType);
            Ext.apply(a.ownerCt.ownerCt.getStore().baseParams, timpType);
        }
        a.ownerCt.ownerCt.getStore().reload();
        return true;
    }
});

/**
 * 用户输入delete语句的条件
 */
function obtainQueryCondition(value, riskLev, srcIp, theTime, type) {
    var startTime = new Date(theTime.replace("T", " "));
    startTime = new Date(startTime.setMinutes(startTime.getMinutes() - 30));   //开始时间为此记录时间减去30分钟
    var sqlForm = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        layout: 'absolute',
        defaultType: 'textfield',
        height: 170,
        items: [{
            x: 1,
            y: 5,
            xtype: 'label',
            text: '查询条件:'
        }, {
            x: 65,
            y: 5,
            width: 535,
            xtype: 'textfield',
            id: 'queryConditionID',
            name: 'queryCondition'
        }, {
            y: 35,
            xtype: 'compositefield',
            fieldLabel: '时间选择',
            msgTarget: 'side',
            anchor: '-10',
            defaults: {
                flex: 1
            },
            layout: 'column',
            border: false,
            items: [{
                xtype: 'label',
                text: '开始日期:',
                width: 60
            }, {
                width: 150,
                xtype: 'datetimefield',
                validator: this.ckDate,
                id: 'startDate',
                name: 'startDate',
                format: 'H:i',
                value: startTime,
                style: "width: 101px; top: 0pt;"
            },
                {
                    xtype: 'label',
                    text: '结束日期:',
                    width: 60
                }, {
                    width: 150,
                    xtype: 'datetimefield',
                    id: 'endDate',
                    validator: this.ckDate,
                    name: 'endDate',
                    format: 'H:i',
                    value: new Date(theTime.replace("T", " "))
                }
            ]
        }, {
            x: 450,
            y: 35,
            xtype: 'label',
            text: '源IP:'
        }, {
            x: 490,
            y: 35,
            width: 110,
            xtype: 'textfield',
            id: 'searchIp',
            name: 'searchIp',
            value: srcIp
        }, {
            x: 1,
            y: 70,
            xtype: 'label',
            fieldLabel: '<font color="red">说明</font>',
            html: '<font color="red">输入"查询条件"时请注意：' + '</br>'
            + '1.不输入条件时，默认取出所有的条件，如：delete zhou where age = 1 and name = wang;取age = 1 and name = wang' + '</br>'
            + '2.输入条件时，条件的输入形式应该如:age=1;name=wang;sex=male等' + '</br>'
            + '3.目前只支持"="号的操作符' + '</font>',
            anchor: '100%',
            maxLength: 20
        }],
        buttonAlign: 'center',
        buttons: [{
            text: '查询',
            handler: function () {
                var conditions = Ext.getCmp('queryConditionID').getValue();
                var searchIp = Ext.getCmp('searchIp').getValue();
                var startDate = Ext.getCmp('startDate').getValue();
                var endDate = Ext.getCmp('endDate').getValue();
                var nowTime = new Date();
                if (startDate != "" && endDate != "" && startDate >= endDate) {
                    return Ext.Msg.alert('提示', '开始日期不能晚于结束日期');
                }
                if (sqlForm.getForm().isValid()) {
                    Ext.Ajax.request({
                        url: 'aboutBreview.action',
                        method: 'POST',
                        params: {
                            id: value,
                            riskLev: riskLev,
                            conditions: conditions,
                            startDate: startDate,
                            endDate: endDate,
                            searchIp: searchIp
                        },
                        success: function (response, options) {
                            var arrays = Ext.util.JSON.decode(response.responseText);
                            OpenWindow = window.open("", "newwin", 'width=' + (window.screen.availWidth - 10) + ',height=' + (window.screen.availHeight - 50) + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
                            OpenWindow.document.write("<TITLE>" + type + "</TITLE>");
                            OpenWindow.document.write("<script type='text/javascript' src='/javascript/util/commonMethod.js'></script>");
                            /*OpenWindow.document.write("<script type='text/javascript' src='http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js'></script>");
                            OpenWindow.document.write("<script type='text/javascript' src='http://apps.bdimg.com/libs/bootstrap/3.3.0/js/bootstrap.min.js'></script>");
                            OpenWindow.document.write("<link rel='stylesheet' href='http://apps.bdimg.com/libs/bootstrap/3.3.0/css/bootstrap.min.css'>");*/
                            OpenWindow.document.write("<script src='//cdn.bootcss.com/jquery/1.11.3/jquery.min.js'></script>");
                            OpenWindow.document.write("<script src='//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>");
                            OpenWindow.document.write("<link rel='stylesheet' href='//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css'>");
                            /*OpenWindow.document.write("<script src='jquery.min.js'></script>");
                            OpenWindow.document.write("<script src='bootstrap.min.js'></script>");
                            OpenWindow.document.write("<link rel='stylesheet' href='bootstrap.min.css'>");*/
                            OpenWindow.document.write("<BODY BGCOLOR=#ffffff>");
                            OpenWindow.document.write("<h4 align='center'>" + type + "</h4>");
                            OpenWindow.document.write(arrays.msg);
                            OpenWindow.document.write("</BODY>");
                            OpenWindow.document.write("</HTML>");
                            OpenWindow.document.close();
                        }
                    });
                }
            }
        }]
    });

    var resultWindow = new Ext.Window({
        title: '查询条件界面',
        width: 680,
        modal: true,
        //   height: 600,
        minWidth: 300,
        plain: true,
        bodyStyle: 'padding:5px;',
        buttonAlign: 'center',
        items: [sqlForm]
    });
    resultWindow.show();
}

if (Ext.reg) {
    Ext.reg('pagingtoolbar1', Ext.PagingToolbar1);
}

function resultReturn(value, record) {
    if (record.operType.indexOf('delete') != -1 || record.operType.indexOf('DELETE') != -1) {
        var returnValue = "<a style='color:#FF0000' href='javascript:void(0)' onclick='playBackByDelete(\"" + record.time + "\",\"" + record.srcToString + "\")'>前后半小时查询操作回放</a>";
        return returnValue;
    }
    if (value && value.indexOf('portalprotocol') != -1) {
        var returnValue = "<a HREF='#' onClick=\"window.open('" + value + "', '返回结果详细',' left=0,top=0,width='+ (screen.availWidth - 10) +',height='+ (screen.availHeight-50) +',scrollbars,resizable=yes')\">点击查看详细</a>'";
        return returnValue;
    } else if (record.sqlRespon.indexOf("success") == -1 && record.sqlRespon.indexOf("200") == -1) {
        return value;
    } else if (record.returnedContent == null || record.returnedContent == "/" || record.returnedContent == '/<br/>') {
        var v = record.operSentence;
        if (v.toUpperCase().indexOf("SELECT") == -1) {
            return value;
        }
        var oriSql = record.operSentence;//.replace(/\'/g, "\\'").replace(/\"/g, "&quot;")
        var returnValue = "<a href='#' onClick=\"getContentFromDB('" + escape(oriSql) + "','" + record.dbName + "','" + record.destIp + "','" + record.destPort + "')\">点击查看详细</a>";
        return returnValue;

    } else if (value && value.substring(0, 1) == '/' && value.length > 5 && record.sqlRespon.indexOf('error') == -1) {
        var returnValue = "<a style='color:#FF0000' href='/downSysInfoFile.action?fileName=" + value + "'>点击下载返回结果</a>";
        return returnValue;
    } else {
        return value;
    }
}

function replyReturn(value, record) {
    if (record.get('operType').indexOf('delete') != -1 || record.get('operType').indexOf('DELETE') != -1) {
        var returnValue = "<a style='color:#FF0000' href='javascript:void(0)' onclick='playBackByDelete(\"" + record.get('time') + "\",\"" + record.get('srcToString') + "\")'>前后半小时查询操作回放</a>";
        return returnValue;
    }
    if (value && value.indexOf('portalprotocol') != -1 || value.substring(0, 13) == '/preview/HttP') {
        var returnValue = "<a HREF='#' onClick=\"window.open('" + value + "', '返回结果详细',' left=0,top=0,width='+ (screen.availWidth - 10) +',height='+ (screen.availHeight-50) +',scrollbars,resizable=yes')\">点击查看详细</a>";
        return returnValue;
    } else if (record.get('sqlRespon').indexOf("success") == -1 && record.get('sqlRespon').indexOf("200") == -1) {
        return value;
    } else if (record.get('returnedContent') == null || record.get('returnedContent') == "/" || record.get('returnedContent') == '/<br/>') {
        var v = record.get('operSentence');
        if (v.toUpperCase().indexOf("SELECT") == -1) {
            return value;
        }
        var oriSql = record.get('operSentence');//.replace(/\'/g, "\\'").replace(/\"/g, "&quot;")
        var returnValue = "<a href='#' onClick=\"getContentFromDB('" + escape(oriSql) + "','" + record.json.dbName + "','" + record.json.destIp + "','" + record.json.destPort + "')\">点击查看详细</a>";
        return returnValue;

    } else if (value && value.substring(0, 1) == '/' && value.length > 5 && record.get('sqlRespon').indexOf('error') == -1) {
        var returnValue = "<a style='color:#FF0000' href='/downSysInfoFile.action?fileName=" + value + "'>点击下载返回结果</a>";
        return returnValue;
    } else {

        //如果不是以上情况（returnContent不为空）
        return "";
    }
}

function openpreview(value) {

    Ext.Ajax.request({
        url: 'preview.action',
        method: 'POST',
        params: {fileName: value},
        success: function (response, options) {
            var arrays = Ext.util.JSON.decode(response.responseText);
            OpenWindow = window.open("", "newwin", 'width=' + (window.screen.availWidth - 10) + ',height=' + (window.screen.availHeight - 50) + ',top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=no, status=no');
            OpenWindow.document.write("<TITLE>操作语句详细</TITLE>");
            OpenWindow.document.write("<script type='text/javascript' src='http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js'></script>");
            OpenWindow.document.write("<script type='text/javascript' src='http://apps.bdimg.com/libs/bootstrap/3.3.0/js/bootstrap.min.js'></script>");
            OpenWindow.document.write("<link type='text/css' href='http://apps.bdimg.com/libs/bootstrap/3.3.0/css/bootstrap.min.css'>");
            OpenWindow.document.write("<BODY BGCOLOR=#ffffff>");
            OpenWindow.document.write("<h4 align='center'>返回结果预览</h4>");
            OpenWindow.document.write(arrays.msg);
            OpenWindow.document.write("</BODY>");
            OpenWindow.document.write("</HTML>");
            OpenWindow.document.close();
        }
    });
}

Ext.EventManager.onWindowResize(browserOnresize, this);

function browserOnresize() {
    var mainPanel = Ext.getCmp('audit_sys_main_id');
    if (!mainPanel || !Ext.lib || !Ext.lib.Dom) {
        return;
    }
    var mainWidth = Ext.lib.Dom.getViewWidth();
    var mainHeight = Ext.lib.Dom.getViewHeight();
    if (mainWidth < 1180) {
        mainWidth = 1180;
    }

    if (mainHeight < 785) {
        mainHeight = 785;
    }
    mainPanel.setWidth(mainWidth);
    mainPanel.setHeight(mainHeight);
}

function getCurentTimeRang(timeTypeString) {
    var selectEtime = new Date();
    var selectStime = new Date();
    switch (parseInt(timeTypeString)) {
        case 0: {
            selectStime.setMinutes(selectEtime.getMinutes() - 1);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 1: {
            selectStime.setMinutes(selectEtime.getMinutes() - 5);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 2: {
            selectStime.setMinutes(selectEtime.getMinutes() - 10);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 3: {
            selectStime.setMinutes(selectEtime.getMinutes() - 30);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 4: {
            selectStime.setHours(selectEtime.getHours() - 1);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 5: {
            selectStime.setHours(selectEtime.getHours() - 3);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 6: {
            selectStime.setHours(selectEtime.getHours() - 12);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 7: {
            selectStime.setHours(selectEtime.getHours() - 24);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 8: {
            selectStime.setHours(0);
            selectStime.setMinutes(0);
            selectStime.setSeconds(0);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 9: {
            var weekNum = selectEtime.getDay();
            selectStime.setDate((selectEtime.getDate() - weekNum));
            selectStime.setHours(0);
            selectStime.setMinutes(0);
            selectStime.setSeconds(0);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 10: {
            selectStime.setDate(selectEtime.getDate() - 7);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 11: {
            selectStime = selectEtime.getFirstDateOfMonth();
            selectStime.setHours(0);
            selectStime.setMinutes(0);
            selectStime.setSeconds(0);
            selectEtime.format('Y-m-d H:i:s');
            selectStime.format('Y-m-d H:i:s');
            break;
        }
        case 12: {
            selectStime = Ext.getCmp('startDate').getValue();
            selectEtime = Ext.getCmp('endDate').getValue();
        }
    }

    var timeParams = {
        selectStime: selectStime,
        selectEtime: selectEtime
    }
    return timeParams;
}

function requestcomplete(conn, response, options) {
    if (response.getResponseHeader != undefined) {
        var sessionStatus = response.getResponseHeader("sessionstatus");
        if (typeof(sessionStatus) != "undefined") {
            Ext.MessageBox.show({
                title: '提示',
                msg: '连接丢失，请重新登录',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO,
                closable: false,
                fn: function (btn, text) {
                    var redirect = "/";
                    top.window.location = redirect;
                }
            });
        }
    }
}

function requestexception(conn, response, options) {
    a = 0;
    if (a != 0) {
        win = new Ext.Window({
            title: '发生错误',
            width: 340,
            id: 'errorWin_main',
            height: 280,
            layout: 'fit',
            closeAction: 'hide',
            items: [{
                xtype: 'form',
                frame: true,
                title: '服务器处理请求失败，失败信息如下：',
                iconCls: 'iconWarn',
                labelWidth: 60,
                labelAlign: 'left',
                padding: 5,
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '错误代码',
                    anchor: '100%',
                    readOnly: true,
                    value: response.status
                }, {
                    xtype: 'textarea',
                    fieldLabel: '错误信息',
                    anchor: '100%',
                    readOnly: true,
                    name: 'comErrorMsg',
                    height: 50,
                    value: response.statusText + "\r\n请求地址为：" + options.url
                }, {
                    xtype: 'textarea',
                    fieldLabel: '详细信息',
                    anchor: '100%',
                    readOnly: true,
                    name: 'comErrorDetail',
                    height: 150,
                    value: response.responseText ? response.responseText : (response.timedout ? "请求超时。" : "")
                }]
            }
            ], constructor: function (conf) {
                Ext.Window.superclass.constructor.call(this, conf);
                this.initPosition(true);
            },
            initEvents: function () {
                Ext.Window.superclass.initEvents.call(this);
                //自动隐藏  
                if (false !== this.autoHide) {
                    var task = new Ext.util.DelayedTask(this.hide, this),
                        second = (parseInt(this.autoHide) || 3) * 1000;
                    this.on('beforeshow', function (self) {
                        task.delay(second);
                    });
                }
                this.on('beforeshow', this.showTips);
                this.on('beforehide', this.hideTips);
                //window大小改变时，重新设置坐标  
                Ext.EventManager.onWindowResize(this.initPosition, this);
                //window移动滚动条时，重新设置坐标  
                Ext.EventManager.on(window, 'scroll', this.initPosition, this);
            },
            //参数flag为true时强制更新位置  
            initPosition: function (flag) {
                //不可见时，不调整坐标
                if (true !== flag && this.hidden) {
                    return false;
                }
                var doc = document, bd = (doc.body || doc.documentElement);
                //Ext取可视范围宽高(与上面方法取的值相同), 加上滚动坐标  
                var left = bd.scrollLeft + Ext.lib.Dom.getViewWidth() - 4 - this.width;
                var top = bd.scrollTop + Ext.lib.Dom.getViewHeight() - 4 - this.height;
                this.setPosition(left, top);
            },
            showTips: function () {
                var self = this;
                if (!self.hidden) {
                    return false;
                }
                //初始化坐标
                self.initPosition(true);
                self.el.slideIn('b', {
                    callback: function () {
                        //显示完成后,手动触发show事件,并将hidden属性设置false,否则将不能触发hide事件
                        self.fireEvent('show', self);
                        self.hidden = false;
                    }
                });
                //不执行默认的show
                return false;
            },
            hideTips: function () {
                var self = this;
                if (self.hidden) {
                    return false;
                }
                self.el.slideOut('b', {
                    callback: function () {
                        //渐隐动作执行完成时,手动触发hide事件,并将hidden属性设置true  
                        self.fireEvent('hide', self);
                        self.hidden = true;
                    }
                });
                //不执行默认的hide
                return false;
            }
        }).show();
    }
    else {
        return;
    }
};
Ext.Ajax.on('requestcomplete', requestcomplete, this);
Ext.Ajax.on('requestexception', requestexception, this);
/**
 * 这种方法的速度是很快的
 * 先是把可能的空白符全部列出来,在第一次遍历中砍掉前边的空白,第二次砍掉后面的空白
 * @return {}
 */
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

function recordAnalyseFun(record) {
    var aliasType;
    if (parent.messArray[0].aliasName != null) {
        aliasType = parent.messArray[0].aliasName;
    } else if (parent.messArray[0].logUsr != null && parent.messArray[0].logUsr != '/') {
        aliasType = parent.messArray[0].logUsr;
    } else if (parent.messArray[0].srcIp != null && parent.messArray[0].srcIp != '/') {
        aliasType = parent.messArray[0].srcIp;
    }

    var ruleName = parent.messArray[0].ruleName;
    if (ruleName == '/' || ruleName == null) {
        ruleName = "N/A";
    }
    var visitTime = parent.messArray[0].time;
    var dbName = parent.messArray[0].auditObjKey;
    if (dbName == '/' || dbName == null) {
        dbName = "N/A";
    }
    var tables = parent.messArray[0].tableName;
    if (tables == '/' || tables == null) {
        tables = "N/A";
    }
    var operType = parent.messArray[0].operType;
    var fileds = parent.messArray[0].fieldName;
    if (fileds == '/' || fileds == null) {
        fileds = "N/A";
    }

    var recordAnalyse = "";
    if ((tables == "N/A" || fileds == "N/A") && operType == '审计口网线被拔出') {
        recordAnalyse = '<font color="red">' + record.extendA + '</font>';
    } else if (operType.indexOf('login') != -1) {
        var result = record.sqlRespon;
        if (result.indexOf("success") != -1) {
            recordAnalyse = '<font color="red">' + aliasType + '</font>在<font color="red">' + visitTime + '</font>成功登录了<font color="red">' + dbName + '</font>';
        } else {
            recordAnalyse = '<font color="red">' + aliasType + '</font>在<font color="red">' + visitTime + '</font>尝试登录<font color="red">' + dbName + '</font>，登录失败。';
        }
    } else if (operType.indexOf('logout') != -1) {
        recordAnalyse = '<font color="red">' + aliasType + '</font>在<font color="red">' + visitTime + '</font>退出了<font color="red">' + dbName + '</font>';
    } else {
        if (operType.indexOf("save") != -1 || operType.indexOf("Save") != -1) {
            recordAnalyse = '<font color="red">' + aliasType + '</font>在<font color="red">' + visitTime + '</font>对<font color="red">' + dbName
                + '</font>的<font color="red">' + getRealValue(tables) + '</font>进行了<font color="red">'
                + getRealValue(operType) + "</font>操作 ";
        } else {
            recordAnalyse = '<font color="red">' + aliasType + '</font>在<font color="red">' + visitTime + '</font>对<font color="red">' + dbName
                + '</font>的<font color="red">' + getRealValue(tables) + '</font>进行了<font color="red">'
                + getRealValue(operType) + '</font>操作，' + '访问的字段有：<font color="red">' + getRealValue(fileds) + "</font>。";
        }
    }
    return recordAnalyse;
}

//推送信息
function putInfoIntoArray(record) {
    parent.messArray.push(record);
    var title = parent.messArray[0].auditObjKey + "产生了风险操作:";
    var infoDiv = parent.document.getElementById('infoTipWin');
    var titleDiv = parent.document.getElementById('showMessTitleId');

    var recordAnalyse = recordAnalyseFun(parent.messArray[0]);

    titleDiv.innerHTML = title;
    infoDiv.innerHTML = recordAnalyse;
    parent.Ext.getCmp('lastMessageButton').disable();
    if (parent.messArray.length <= 1) {
        parent.Ext.getCmp('nextMessageButton').disable();
    } else {
        parent.Ext.getCmp('nextMessageButton').enable();
    }
    parent.Ext.getCmp('messageButton').recordId = parent.messArray[0].id;
    parent.Ext.getCmp('messageButton').arrayId = 0;
    var window = parent.Ext.getCmp('rightWinAboutMessInfo');
    if (window.hidden) {
        window.show();
    }
}

Ext.override(Ext.form.TextField, {
    onRender: function (ct, position) {
        Ext.form.TextField.superclass.onRender.call(this, ct, position);

        //鼠标移到文本框上时提示
        if (this.tooltip) {
            new Ext.ToolTip({
                target: this.id,
                trackMouse: false,
                draggable: false,
                maxWidth: 500,
                minWidth: 100,
                html: this.tooltip
            });
        }
    }
});


function createFirstPage(pageId, url) {
    var tabpanel = parent.Ext.getCmp('treePanel');
    var n = new Ext.Panel({
        title: '监控墙',
        frame: true,
        autoScroll: true,
        html: '<iframe id="firstPage" region="center" frameborder="no" height="100%" width="100%" src="' + url + '"></iframe>'
    });
    tabpanel.add(n);
}

function chkDate(beginDate, endDate) {
    var nowtime = new Date();

    if (beginDate == "" && endDate != "") {
        Ext.Msg.alert('提示', '请输入开始时间');
        return false;
    }
    else if (beginDate != "" && endDate == "") {
        Ext.Msg.alert('提示', '请输入结束时间');
        return false;
    }
    else if (beginDate > nowtime || endDate > nowtime) {
        Ext.Msg.alert('提示', '所选时间不能大于当前时间');
        return false;
    }

    else if (beginDate > endDate) {
        Ext.Msg.alert('提示', '开始时间不能大于结束时间');
        return false;
    }
    return true;
}

function getRealValue(theValue) {
    if (theValue == null) {
        return "N/A";
    }
    var realValue = "";
    var valueArray = theValue.split(" ");
    if (valueArray.length == 0 || valueArray.length == 1) {
        valueArray = theValue.split(",");
    }
    if (valueArray.length == 0 || valueArray.length == 1) {
        var firstIndex = valueArray[0].indexOf('(');
        if (firstIndex != -1) {
            var lastIndex = valueArray[0].indexOf(')');
            theValue = valueArray[0].substring(firstIndex + 1, lastIndex);
        } else {
            theValue = valueArray[0];
        }
        return theValue;
    } else {
        for (var i = 0; i < valueArray.length; i++) {
            var temValue = valueArray[i];
            var firstIndex = temValue.indexOf('(');
            if (firstIndex != -1) {
                var lastIndex = temValue.indexOf(')');
                if (realValue != "") {
                    realValue = realValue + "，";
                }
                realValue = realValue + temValue.substring(firstIndex + 1, lastIndex);
            } else {
                if (realValue != "") {
                    realValue = realValue + "，";
                }
                realValue = realValue + temValue;
            }
        }
    }
    return realValue;
}


function descwinshow(recordDesc, recordId) {
    var descform = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        layout: 'absolute',
        defaultType: 'textfield',
        height: 180,
        items: [{
            x: 0,
            y: 5,
            xtype: 'label',
            id: 'descID',
            text: '处理描述:'
        }, {
            x: 65,
            y: 5,
            id: 'descStrId',
            xtype: 'textarea',
            emptyText: '请输入处理描述',
            allowBlank: false,
            anchor: '95% 100%'
        }, {
            xtype: 'textfield',
            id: 'riskId',
            hidden: true
        }],
        buttons: [{
            text: '保存',
            handler: function () {
                if (descform.getForm().isValid()) {
                    if (null == Ext.getCmp('descStrId').value && '' == Ext.getCmp('descStrId').value) {
                        Ext.Msg.alert('提示', '请输入处理描述');
                        return;
                    }
                }
                var params = Ext.applyIf(descform.form.getValues());
                Ext.Ajax.request({
                    url: 'saveAndUpdateRiskInfo.action',
                    params: params,
                    success: function (response, options) {
                        Ext.Msg.alert('提示', '保存成功');
                        descWindow.hide();
                        store.reload();
                    },
                    failure: function () {
                        Ext.Msg.alert('错误', '保存失败!');
                    }
                });
            }
        }]
    });


    var descWindow = new Ext.Window({
        title: '处理建议',
        collapsible: true,
        maximizable: true,
        width: 1000,
        modal: true,
        //   height: 600,
        minWidth: 300,
        plain: true,
        bodyStyle: 'padding:5px;',
        buttonAlign: 'center',
        items: [descform]
    });
    descWindow.setPosition(80, 50);
    descWindow.show();
    if (recordDesc != null && recordDesc != "") {
        Ext.getCmp('descStrId').setValue(recordDesc);
    }
    if (recordId != null && recordId != "") {
        Ext.getCmp('riskId').setValue(recordId);
    }


}


/**
 * 用户执行操作语句去查询用户数据库并给出返回结果
 */
function getContentFromDB(sqlSent, dbName, destIp, destPort) {
    var sqlSentence = unescape(sqlSent);
    var theParams = {
        "record.dbName": dbName,
        "record.destIp": destIp,
        "record.destPort": destPort
    };
    var sqlResultStore = new Ext.data.ArrayStore({
        // store configs
        autoDestroy: true,
        storeId: 'myStore',
        // reader configs
        idIndex: 0,
        fields: [
            'company',
            {name: 'price', type: 'float'},
            {name: 'change', type: 'float'},
            {name: 'pctChange', type: 'float'},
            {name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
        ]
    });
    var sqlForm = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        layout: 'absolute',
        defaultType: 'textfield',
        height: 180,
        items: [{
            x: 0,
            y: 5,
            xtype: 'label',
            id: 'operStyleID',
            text: '操作语句:'
        }, {
            x: 65,
            y: 5,
            id: 'operStID',
            xtype: 'textarea',
            emptyText: '请输入操作语句',
            allowBlank: false,
            name: 'operSentence',
            anchor: '95% 100%'
        }],
        buttonAlign: 'center',
        buttons: [{
            text: '查询',
            handler: function () {
                if (sqlForm.getForm().isValid()) {
                    if (null == Ext.getCmp('operStID').value && '' == Ext.getCmp('operStID').value) {
                        Ext.Msg.alert('提示', '请输入要查询的SQL语句！');
                        return;
                    }
                    var params = Ext.applyIf(sqlForm.form.getValues(), sqlResultStore.baseParams);
                    params = Ext.applyIf(params, theParams);
                    Ext.Ajax.request({
                        url: 'sqlOperationResult.action',
                        params: params,
                        success: function (response, options) {
                            var arrays = Ext.util.JSON.decode(response.responseText);
                            var colMArray = new Array();
                            if (!arrays.resultColumnName) {
                                Ext.Msg.alert('信息', arrays.msg + " 无返回结果。");
                                return;
                            }
                            colMArray = arrays.resultColumnName.split(";");
                            var colLength = colMArray.length;
                            var colMModel = new Array();

                            for (var i = 0; i < colLength - 1; i++) {
//									if(i<10){
                                colMModel[i] = {
                                    header: colMArray[i],
                                    mapping: colMArray[i],
                                    dataIndex: colMArray[i],
                                    align: 'center',
                                    width: 1000 / 10
                                };
//								    }else{
//								    	colMModel[i] = {
//									    		header:colMArray[i],
//									    		mapping :colMArray[i],
//									    		hidden : true,
//									    		dataIndex:colMArray[i],
//									    		align:'center',
//									    		width : 1000 /10
//									    };
//								    }
                            }
                            //colM可以从request中获取,然后用来动态创建header即表头信息，同理dataIndex
                            var column = new Ext.grid.ColumnModel(colMModel);
                            var dataStore = new Ext.data.ArrayStore({
                                fields: colMArray
                            });

                            grid.reconfigure( //重新配置grid的数据和列模型
                                dataStore,
                                column
                            );

                            var loadMarsk = new top.Ext.LoadMask(document.body, {
                                msg: '数据查询中，请稍候......',
                                disabled: false,
                                store: grid.getStore()
                            });
                            loadMarsk.show();
                            ;
                            grid.setVisible(true);
                            grid.getView().refresh();
                            dataStore.loadData(arrays.listValues, true);
                            loadMarsk.hide();
                            Ext.Msg.alert('提示', arrays.msg);
                        },
                        failure: function () {
                            Ext.Msg.alert('错误', '执行操作语句失败!');
                        }
                    });
                }
            }
        }, {
            text: '重置',
            handler: function () {
                sqlForm.getForm().reset();
            }
        }]
    });
    var cm = new Ext.grid.ColumnModel([]);
    var grid = new Ext.grid.GridPanel({
        store: sqlResultStore,
        title: '执行返回结果',
        cm: cm,
        height: 200,
        hidden: true,
        frame: true,
        border: false
    });

    var resultWindow = new Ext.Window({
        title: '语句执行界面',
        collapsible: true,
        maximizable: true,
        width: 800,
        modal: true,
        //   height: 600,
        minWidth: 300,
        closeAction: 'hide',
        plain: true,
        bodyStyle: 'padding:5px;',
        buttonAlign: 'center',
        items: [sqlForm, grid]
    });
    resultWindow.setPosition(0, 50);
    resultWindow.addListener('beforeshow', function (o) {
        o.center();
    });
    resultWindow.show();
    sqlSentence = sqlSentence.replace(/<[^>]+>/g,''); //去掉所有样式
    Ext.getCmp('operStID').setValue(sqlSentence);
}

var exportDateButton = {
    xtype: 'button',
    text: '文件导出',
    text: '',
    iconCls: 'risk_query_page_fileexport_icon',
    handler: function () {
        Ext.Ajax.request({
            url: 'existDataFile.action',
            success: function (response, options) {
                var arrays = Ext.util.JSON.decode(response.responseText);
                if (arrays.message && arrays.message.length != 0) {
                    var targetForm = document.forms[0];
                    if (!targetForm) {
                        targetForm = document.createElement('form');
                        document.body.appendChild(targetForm);
                    }
                    targetForm.action = "downDataFile.action?filePath='" + arrays.message + "'";
                    targetForm.method = "POST";
                    targetForm.submit();
                } else {
                    Ext.Msg.alert('提示', '服务器中没有待下载的数据。');
                }
            },
            failure: function () {
                Ext.Msg.alert('错误', '服务器返回错误。');
            }
        });
    }
};


function createRelationWindow(auditObjKey, id) {//关联对象详情
    if (null == auditObjKey || '/' == auditObjKey) {
        Ext.Msg.alert('提示', '没有于此关联的审计对象信息！');
        return;
    }
    var MyRecord = Ext.data.Record.create([{
        name: 'id',
        mapping: 'id'
    }, {
        name: 'time',
        mapping: 'time',
        convert: function (v) {
            return v.replace("T", " ");
        }
    }, {
        name: 'logUsr',
        mapping: 'logUsr'
    },
        {name: 'aliasType', mapping: 'aliasType'},
        {name: 'aliasName', mapping: 'aliasName'},
        {name: 'controlShow', mapping: 'controlShow'},
        {
            name: 'srcIp',
            mapping: 'srcToString'
        }, {
            name: 'srcPort',
            mapping: 'srcPort'
        }, {
            name: 'srcMac',
            mapping: 'srcMac'
        }, {
            name: 'systemHost',
            mapping: 'systemHost'
        }, {
            name: 'systemUsr',
            mapping: 'systemUsr'
        }, {
            name: 'dataSrc',
            mapping: 'dataSrc'
        }, {
            name: 'destIp',
            mapping: 'destToString'
        }, {
            name: 'destPort',
            mapping: 'destPort'
        }, {
            name: 'destMac',
            mapping: 'destMac'
        }, {
            name: 'dbName',
            mapping: 'dbName'
        }, {
            name: 'dbType',
            mapping: 'dbType'
        }, {
            name: 'tableType',
            mapping: 'tableType'
        }, {
            name: 'tableName',
            mapping: 'tableName'
        }, {
            name: 'fieldType',
            mapping: 'fieldType'
        }, {
            name: 'fieldName',
            mapping: 'fieldName'
        }, {
            name: 'operType',
            mapping: 'operType',
            convert: function (v) {
                if (v == 'select') {
                    return "select(查询)";
                } else if (v == 'insert') {
                    return "insert(插入)";
                } else if (v == 'update') {
                    return "update(更新)";
                } else if (v == 'delete') {
                    return "delete(删除)";
                } else if (v == 'create') {
                    return "create(创建)";
                } else if (v == 'alter') {
                    return "alter(改变)";
                } else if (v == 'drop') {
                    return "drop(删除)";
                } else if (v == 'rollback') {
                    return "rollback(回滚)";
                } else if (v == 'grant') {
                    return "grant(允许)";
                } else if (v == 'execute') {
                    return "execute(执行)";
                } else if (v == 'logout') {
                    return "logout(登出)";
                } else if (v == 'login') {
                    return "login(登录)";
                } else if (v == 'cableOff') {
                    return '审计口网线被拔出';
                } else {
                    return v;
                }
            }
        }, {
            name: 'operSentence',
            mapping: 'operSentence'
        }, {
            name: 'rowNum',
            mapping: 'rowNum'
        }, {
            name: 'tableNum',
            mapping: 'tableNum'
        }, {
            name: 'sqlExecTime',
            mapping: 'sqlExecTime',
            convert: function (v) {
                if (v != null) {
                    return v + "ms";
                }

            }
        }, {
            name: 'sqlRespon',
            mapping: 'sqlRespon'
        }, {
            name: 'returnedContent',
            mapping: 'returnedContent',
            convert: function (value, record) {
                if ((record.destPort == 57772) || (record.destPort == 8972)) {
                    return "<a HREF='#' onClick=\"window.open('" + record.returnedContent + "', '返回结果详细',' left=0,top=0,width='+ (screen.availWidth - 10) +',height='+ (screen.availHeight-50) +',scrollbars,resizable=yes,toolbar=no')\">点击查看详细</a>";
                } else {
                    return value;
                }
            }
        }, {
            name: 'ruleName',
            mapping: 'ruleName'
        }, {
            name: 'riskLev',
            mapping: 'riskLev',
            convert: function (v) {
                switch (v) {
                    case 0 :
                        return '<font color="red">高风险</font>';
                    case 1 :
                        return '<font color="orange">中风险</font>';
                    case 2 :
                        return '<font color="green">低风险</font>';
                    case 3 :
                        return '关注行为';
                    case 4 :
                        return '一般行为';
                    case 5 :
                        return '不审计';
                }
            }
        }, {
            name: 'messageLev',
            mapping: 'messageLev'
        }, {
            name: 'dataSrcLev',
            mapping: 'dataSrcLev'
        }, {
            name: 'srcIpLev',
            mapping: 'srcIpLev'
        }, {
            name: 'flowRate',
            mapping: 'flowRate'
        }, {
            name: 'busType',
            mapping: 'busType'
        }, {
            name: 'comment',
            mapping: 'comment'
        }, {
            name: 'dealState',
            mapping: 'dealState',
            convert: function (v) {
                switch (v) {
                    case 0 :
                        return '<font color="#FFCC33">未处理</font>';
                    case 1 :
                        return '处理完成';
                }
            }
        }, {
            name: 'dealMan',
            mapping: 'dealMan'
        }, {
            name: 'dealStart',
            mapping: 'dealStart',
            convert: function (v) {
                if (v != null && v != '')
                    return v.replace("T", " ");
                else
                    return '';

            }
        }, {
            name: 'dealEnd',
            mapping: 'dealEnd'
        }, {
            name: 'dealDesc',
            mapping: 'dealDesc'
        }, {
            name: 'sessionId',
            mapping: 'sessionId'
        }, {
            name: 'auditObjKey',
            mapping: 'auditObjKey'
        }, {
            name: 'sentenceLen',
            mapping: 'sessionId'
        }, {
            name: 'extendA',
            mapping: 'extendA'
        }]);

    var store = new Ext.data.Store({
        baseParams: {
            start: 0,
            limit: 2,
            'record.auditObjKey': auditObjKey,
            'record.id': id,
            'record.extendC': 'relation'
        },
        proxy: new Ext.data.HttpProxy({
            method: 'post',
            url: 'dailyBehaviorQuery.action'
        }),

        reader: new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'rows'
        }, MyRecord)
    });
    store.load({
        callback: function (records, options, success) {
            if (records.length == 0) {
                Ext.Msg.alert('提示', '于此关联的审计对象为空！');
                return;
            }
            var record = records[0];
            var v = record.get("returnedContent");
            var contentTable = "";
            if (v == null || v == "/")
                contentTable = "/";
            else {
                contentTable = "<table border='1' style='font-size:10pt;' cellpadding=0 cellspacing=0 width='100%'>";
                var trData = "";
                var tempContent = "", tempArray;
                var index;
                while (v != "<br/>" && (index = v.indexOf("<br/>")) != -1) {
                    tempContent = v.substring(0, index);
                    tempArray = tempContent.split(",");
                    trData = "<tr>";
                    for (var i = 0; i < tempArray.length; i++) {
                        trData += "<td align='center'>" + tempArray[i] + "</td>";
                    }
                    trData += "</tr>";
                    contentTable += trData;

                    v = v.substring(index + "<br/>".length);
                }
                contentTable += "</table>";
                if (contentTable.indexOf("td") == -1) {
                    contentTable = "&nbsp;"
                }

            }

            function content() {
                var aliasType;
                var cacheStr = false;
                if (record.data.aliasName == null) {
                    aliasType = '<font color="red">别名未配置，建议配置上别名。</font>';
                } else {
                    aliasType = record.data.aliasName;
                }

                var cacheStrOpen = "";
                if (!cacheStr) {
                    cacheStrOpen = '<tr><td width="85"><font color="blue">表类型:</font></td>' +
                        '<td width="190">' + record.get('tableType') + '</td>' +
                        '<td width="85"><font color="blue">表名:</font></td>' +
                        '<td width="190">' + record.get('tableName') + '</td></tr>' +
                        '<tr><td width="85"><font color="blue">字段名:</font></td>' +
                        '<td width="190">' + record.get('fieldName') + '</td>' +
                        '<td width="85"><font color="blue">操作类型:</font></td>' +
                        '<td width="190">' + record.get('operType') + '</td></tr>';
                } else {
                    cacheStrOpen = '<tr><td width="85"><font color="blue">访问的类名:</font></td>' +
                        '<td width="190">' + record.get('tableName') + '</td>' +
                        '<td width="85"><font color="blue">操作类型:</font></td>' +
                        '<td width="190">' + record.get('operType') + '</td></tr>';
                }

                var htmlContent = '<table style="table-layout:fixed" width="550" border="1px" cellspacing="0" cellpadding="0">' +
                    '<tr><td><font color="blue">风险级别：</font></td>' +
                    '<td colspan="3">' + record.get('riskLev') + '</td></tr>' +
                    '<tr><td><font color="blue">数据库账户:</font></td>' +
                    '<td>' + record.get('logUsr') + '</td>' +
                    '<td><font color="blue">访问者:</font></td>' +
                    '<td>' + aliasType + '</td></tr>' +
                    '<tr><td><font color="blue">应用账户:</font></td>' +
                    '<td>' + record.get('extendB') + '</td>' +
                    '<td><font color="blue">客户端IP:</font></td>' +
                    '<td>' + record.get('srcIp') + '</td></tr>' +
                    '<tr><td><font color="blue">源MAC地址:</font></td>' +
                    '<td>' + record.get('srcMac') + '</td>' +
                    '<td><font color="blue">操作系统用户名:</font></td>' +
                    '<td>' + record.get('systemUsr') + '</td></tr>' +
                    '<tr><td><font color="blue">操作系统主机名:</font></td>' +
                    '<td>' + record.get('systemHost') + '</td>' +
                    '<td><font color="blue">会话ID:</font></td>' +
                    '<td>' + record.get('sessionId') + '</td></tr>' +
                    '<tr><td><font color="blue">发生时间:</font></td>' +
                    '<td>' + record.get('time').replace("T", " ") + '</td>' +
                    '<td><font color="blue">客户端端口:</font></td>' +
                    '<td>' + record.get('srcPort') + '</td></tr>' +
                    '<tr><td><font color="blue">客户端进程:</font></td>' +
                    '<td>' + record.get('dataSrc') + '</td>' +
                    '<td><font color="blue">服务端IP:</font></td>' +
                    '<td>' + record.get('destIp') + '</td></tr>' +
                    '<tr><td><font color="blue">服务端端口:</font></td>' +
                    '<td>' + record.get('destPort') + '</td>' +
                    '<td><font color="blue">服务端MAC:</font></td>' +
                    '<td>' + record.get('destMac') + '</td></tr>' +
                    '<tr><td><font color="blue">数据库类型:</font></td>' +
                    '<td>' + record.get('dbType') + '</td>' +
                    '<td><font color="blue">数据库名:</font></td>' +
                    '<td>' + record.get('dbName') + '</td></tr>' + cacheStrOpen +
                    '<tr><td><font color="blue">语句长度:</font></td>' +
                    '<td>' + record.get('operSentence').length + '</td>' +
                    '<td><font color="blue">语句执行时间:</font></td>' +
                    '<td>' + record.get("sqlExecTime") + '</td></tr>' +
                    '<tr><td><font color="blue">语句执行回应:</font></td>' +
                    '<td>' + record.get('sqlRespon') + '</td>' +
                    '<td><font color="blue">满足规则:</font></td>' +
                    '<td>' + record.get('ruleName') + '</td></tr>' +
                    '<tr align=center><td colspan="4"><font color="blue">操作语句</font></td></tr>' +
                    '<tr><td colspan="4" height="130" style="word-wrap:break-word">' + record.get('operSentence') + '</td></tr>' +
                    '</table>';
                return htmlContent;
            }

            // 控制弹出面板
            var win = new parent.Ext.Window({
                title: '关联对象详细信息',
                layout: 'fit',
                width: 565,
                height: 465,
//				modal : true,
                closeAction: 'close',
                maximizable: false,
                buttonAlign: 'center',
                autoScroll: true,
                html: content(),
                buttons: [{
                    text: '关闭',
                    handler: function () {
                        win.close();
                    }
                }]
            });
            win.show(Ext.getBody());
        }
    });
}