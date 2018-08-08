;(function($){
    var lineFrame = function(config, line){
        var vm = this;
        vm.lineDom = line;
        // 默认参数
        vm.config = {
            direction: 'left',
            lineWidth: 2
        };

        // 默认参数扩展
        if(config && $.isPlainObject(config)){
            $.extend(vm.config, config);
        };

        vm.init();

        $(window).resize(function() {
            vm.init();
        });
    };
    lineFrame.prototype = {
        // 初始化
        init: function(){
            var vm = this;
            // vm.lineDom = line;
            // 清空lineDom下面的svg节点
            vm.lineDom.find('svg').remove();
            if (vm.config.direction !== 'center') {
                // 在lineDom中插入svg，插入3个多边形
                vm.lineDom.append('<svg><polygon class="line-header"></polygon>' +
                    '<polygon class="line-top-left"></polygon>' +
                    '<polygon class="line-main"></polygon></svg>');
            } else {
                // 在lineDom中插入svg，插入1个多边形和一个圆弧，用于中间风险分数的线框
                vm.lineDom.append('<svg><polygon class="line-main"></polygon><path></path></svg>');
                vm.arcPath = vm.lineDom.find('svg').find('path');
            }
            vm.polygons = vm.lineDom.find('svg').find('polygon');
            vm.initLineLength();
            vm.drawPolygon();
        },
        initLineLength: function (){
            var vm = this;
            vm.config.lineWidth = 2;
            // 边框斜角线的几个长度
            vm.slantLines = [22, 14, 8, 18, 34, 10, 40, 100];
            var windowWidth = $(window).width();
            if (windowWidth > 1480) {
                vm.changeLineLength((windowWidth / 1920));
                vm.config.lineWidth = parseInt((windowWidth / 1920) * vm.config.lineWidth);
            } else {
                vm.changeLineLength(1480 / 1920);
                vm.config.lineWidth = parseInt((1480 / 1920) * vm.config.lineWidth);
            }
        },
        changeLineLength: function (lengthScale) {
            var vm = this;
            var lines = [];
            for (var i=0; i<vm.slantLines.length; i++) {
                lines[i] = lengthScale*vm.slantLines[i];
            }
            vm.slantLines = lines;
        },
        // 设置线框的各点坐标
        setPoints: function () {
            var vm = this;
            var lineWidth = vm.config.lineWidth;
            var direction = vm.config.direction;
            // 获取线框容器宽高，减1是因为不让父容器挡到svg的边框
            var w = vm.lineDom.width() - 1;
            var h = vm.lineDom.height() - 1;
            // 边框斜角线的几个长度
            var slantLines = vm.slantLines;
            // for (var i=0; i<slantLines.length; i++) {
            //     slantLines[i] = slantLines[i]*1.2;
            // }

            if (direction === 'left') {
                // 左上角的线框
                vm.points1 = [
                    {
                        x: 0,
                        y: slantLines[0]
                    },
                    {
                        x: slantLines[0],
                        y: 0
                    },
                    {
                        x: 0.32*w + slantLines[0],
                        y: 0
                    },
                    {
                        x: 0.32*w + slantLines[0] + slantLines[1],
                        y: slantLines[1]
                    },
                    {
                        x: 0.55*w + slantLines[0] + slantLines[1],
                        y: slantLines[1]
                    },
                    {
                        x: 0.55*w + slantLines[0] + slantLines[1] + slantLines[2],
                        y: slantLines[1] + slantLines[2]
                    },
                    {
                        x: 0.45*w + slantLines[2]*2 + slantLines[3],
                        y: slantLines[1] + slantLines[2]
                    },
                    {
                        x: 0.45*w + slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: slantLines[2],
                        y: slantLines[1] + slantLines[2]*2 + slantLines[3],
                    },
                    {
                        x: slantLines[2],
                        y: 0.4*h + slantLines[0] + slantLines[2]
                    },
                    {
                        x: 0,
                        y: 0.4*h + slantLines[0]
                    }
                ];
                // 左上角线框遮挡住的线条
                // vm.points2 = [
                //     {
                //         x: slantLines[2],
                //         y: slantLines[1] + slantLines[2]*2 + slantLines[3]
                //     },
                //     {
                //         x: slantLines[2],
                //         y: slantLines[1] + slantLines[2]
                //     },
                //     {
                //         x: 0.45*w + slantLines[2]*2 + slantLines[3],
                //         y: slantLines[1] + slantLines[2]
                //     },
                //     {
                //         x: slantLines[2],
                //         y: slantLines[1] + slantLines[2]
                //     }
                // ];
                // 右下角主体线框
                vm.points3 = [
                    {
                        x: slantLines[2],
                        y: slantLines[1] + slantLines[2]*2 + slantLines[3]
                    },
                    {
                        x: slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: 0.45*w + slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: 0.45*w + slantLines[2]*2 + slantLines[3],
                        y: slantLines[1] + slantLines[2]
                    }
                ];
            } else if (direction === 'right') {
                // 右上角的线框
                vm.points1 = [
                    {
                        x: w,
                        y: slantLines[0]
                    },
                    {
                        x: w - slantLines[0],
                        y: 0
                    },
                    {
                        x: w - (0.40*w + slantLines[0]),
                        y: 0
                    },
                    {
                        x: w - (0.40*w + slantLines[0] + slantLines[1]),
                        y: slantLines[1]
                    },
                    {
                        x: w - (0.55*w + slantLines[0] + slantLines[1]),
                        y: slantLines[1]
                    },
                    {
                        x: w - (0.55*w + slantLines[0] + slantLines[1] + slantLines[2]),
                        y: slantLines[1] + slantLines[2]
                    },
                    {
                        x: w - (0.3*w + slantLines[2]*2 + slantLines[3]),
                        y: slantLines[1] + slantLines[2]
                    },
                    {
                        x: w - (0.3*w + slantLines[2] + slantLines[3]),
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: w - (slantLines[2] + slantLines[3]),
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: w - slantLines[2],
                        y: slantLines[1] + slantLines[2]*2 + slantLines[3],
                    },
                    {
                        x: w - slantLines[2],
                        y: 0.4*h + slantLines[0] + slantLines[2]
                    },
                    {
                        x: w,
                        y: 0.4*h + slantLines[0]
                    }
                ];
                // 右上角线框遮挡住的线条
                // vm.points2 = [
                //     {
                //         x: w - (0.3*w + slantLines[2]*2 + slantLines[3]),
                //         y: slantLines[1] + slantLines[2]
                //     },
                //     {
                //         x: w - slantLines[2],
                //         y: slantLines[1] + slantLines[2]
                //     },
                //     {
                //         x: w - slantLines[2],
                //         y: slantLines[1] + slantLines[2]*2 + slantLines[3]
                //     },
                //     {
                //         x: w - slantLines[2],
                //         y: slantLines[1] + slantLines[2]
                //     }
                // ];
                // 左下角主体线框
                vm.points3 = [
                    {
                        x: w - slantLines[2],
                        y: slantLines[1] + slantLines[2]*2 + slantLines[3]
                    },
                    {
                        x: w - (slantLines[2] + slantLines[3]),
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: w - (0.3*w + slantLines[2] + slantLines[3]),
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: w - (0.3*w + slantLines[2]*2 + slantLines[3]),
                        y: slantLines[1] + slantLines[2]
                    }
                ];
            } else if (direction === 'center') {
                // 中间风险分数的主体线框
                vm.points = [
                    {
                        x: w - (slantLines[7] + 0.13*w + slantLines[6]*2),
                        y: slantLines[6]
                    },
                    {
                        x: w - (slantLines[7] + 0.13*w + slantLines[6]),
                        y: 0
                    },
                    {
                        x: w - (slantLines[7] + 0.13*w),
                        y: 0
                    },
                    {
                        x: w - (slantLines[7] + 0.13*w),
                        y: slantLines[6]
                    },
                    {
                        x: w,
                        y: slantLines[6]
                    },
                    {
                        x: w,
                        y: h - slantLines[6]
                    },
                    {
                        x: w - slantLines[6],
                        y: h
                    },
                    {
                        x: 0.3*w + slantLines[5],
                        y: h
                    },
                    {
                        x: 0.3*w,
                        y: h - slantLines[5]
                    },
                    {
                        x: 0,
                        y: h - slantLines[5]
                    },
                    {
                        x: 0,
                        y: slantLines[6]
                    }
                ];

                // 中间风险分数的圆弧
                vm.arcPoint = {
                    rx: 0.45*h,   // 圆弧的x轴半径 0.45
                    ry: 0.45*h,   // 圆弧的y轴半径
                    sx: slantLines[6],   // 圆弧开始点的x坐标
                    sy: slantLines[6] - 2,   // 圆弧开始点的y坐标
                    ex: slantLines[6] + 0.82*h,   // 圆弧结束点的x坐标 0.82
                    ey: slantLines[6] - 2   // 圆弧结束点的y坐标

                    // rx: 0.33*h + 0.03*w,   // 圆弧的x轴半径 0.45
                    // ry: 0.33*h + 0.03*w,   // 圆弧的y轴半径
                    // sx: slantLines[6] + 0.02*w + 1,   // 圆弧开始点的x坐标
                    // sy: slantLines[6] - 1,   // 圆弧开始点的y坐标
                    // ex: slantLines[6] + 0.62*h + 0.04*w - 1,   // 圆弧结束点的x坐标 0.82
                    // ey: slantLines[6] - 1   // 圆弧结束点的x坐标
                };

                vm.drawFlarLine(false, slantLines[7] + 0.13*w);
            } else if (direction === 'center-btm') {
                // 中间数据库状态的左上角线框
                vm.points1 = [
                    {
                        x: 0,
                        y: slantLines[0]
                    },
                    {
                        x: slantLines[0],
                        y: 0
                    },
                    {
                        x: 0.22*w + slantLines[0],
                        y: 0
                    },
                    {
                        x: 0.22*w + slantLines[0] + slantLines[1],
                        y: slantLines[1]
                    },
                    {
                        x: 0.45*w + slantLines[0] + slantLines[1],
                        y: slantLines[1]
                    },
                    {
                        x: 0.45*w + slantLines[0] + slantLines[1] + slantLines[2],
                        y: slantLines[1] + slantLines[2]
                    },
                    {
                        x: 0.3*w + slantLines[2]*2 + slantLines[3],
                        y: slantLines[1] + slantLines[2]
                    },
                    {
                        x: 0.3*w + slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: slantLines[2],
                        y: slantLines[1] + slantLines[2]*2 + slantLines[3]
                    },
                    {
                        x: slantLines[2],
                        y: 0.4*h + slantLines[0] + slantLines[2]
                    },
                    {
                        x: 0,
                        y: 0.4*h + slantLines[0]
                    }
                ];
                // 中间数据库状态左上角线框挡住的线条
                // vm.points2 = [
                //     {
                //         x: slantLines[2],
                //         y: slantLines[1] + slantLines[2]*2 + slantLines[3]
                //     },
                //     {
                //         x: slantLines[2],
                //         y: slantLines[1] + slantLines[2]
                //     },
                //     {
                //         x: 0.3*w + slantLines[2]*2 + slantLines[3],
                //         y: slantLines[1] + slantLines[2]
                //     },
                //     {
                //         x: slantLines[2],
                //         y: slantLines[1] + slantLines[2]
                //     }
                // ];
                // 中间数据库状态的右下角主体线框
                vm.points3 = [
                    {
                        x: slantLines[2],
                        y: slantLines[1] + slantLines[2]*2 + slantLines[3]
                    },
                    {
                        x: slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: 0.3*w + slantLines[2] + slantLines[3],
                        y: slantLines[1] + slantLines[2]*2
                    },
                    {
                        x: 0.3*w + slantLines[2]*2 + slantLines[3],
                        y: slantLines[1] + slantLines[2]
                    }
                ];
            }

            var lineIdName = vm.lineDom.attr('id');
            switch (lineIdName)
            {
                case 'line-frame1':
                    vm.points3.push(
                        {
                            x: w,
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: w,
                            y: h - slantLines[4]
                        },
                        {
                            x: w - slantLines[4],
                            y: h
                        },
                        {
                            x: 0.37*w + slantLines[0] + slantLines[5],
                            y: h
                        },
                        {
                            x: 0.37*w + slantLines[0],
                            y: h - slantLines[5]
                        },
                        {
                            x: slantLines[2],
                            y: h - slantLines[5]
                        }
                    );
                    vm.drawFlarLine(true, 0);
                    break;
                case 'line-frame2':
                    vm.points3.push(
                        {
                            x: w - slantLines[0],
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: w,
                            y: slantLines[1] + slantLines[2] + slantLines[0]
                        },
                        {
                            x: w,
                            y: h - slantLines[1]
                        },
                        {
                            x: w - slantLines[1],
                            y: h
                        },
                        {
                            x: 0.42*w + slantLines[0] + slantLines[5],
                            y: h
                        },
                        {
                            x: 0.42*w + slantLines[0],
                            y: h - slantLines[5]
                        },
                        {
                            x: slantLines[2],
                            y: h - slantLines[5]
                        }
                    );
                    vm.drawFlarLine(true, slantLines[0]);
                    break;
                case 'line-frame3':
                    vm.points3.push(
                        {
                            x: w - slantLines[4],
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: w,
                            y: slantLines[1] + slantLines[2] + slantLines[4]
                        },
                        {
                            x: w,
                            y: h - slantLines[0]
                        },
                        {
                            x: w - slantLines[0],
                            y: h
                        },
                        {
                            x: 0.36*w + slantLines[0] + slantLines[1],
                            y: h
                        },
                        {
                            x: 0.36*w + slantLines[0],
                            y: h - slantLines[5]
                        },
                        {
                            x: slantLines[2],
                            y: h - slantLines[5]
                        }
                    );
                    vm.drawFlarLine(true, slantLines[4]);
                    break;
                case 'line-frame4':
                    vm.points3.push(
                        {
                            x: w - slantLines[3],
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: w,
                            y: slantLines[1] + slantLines[2] + slantLines[3]
                        },
                        {
                            x: w,
                            y: h
                        },
                        {
                            x: slantLines[2],
                            y: h
                        }
                    );
                    vm.drawFlarLine(false, slantLines[3]);
                    break;
                case 'line-frame6':
                    vm.points3.push(
                        {
                            x: w - (slantLines[7] + 0.13*w),
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: w - (slantLines[7] + 0.13*w),
                            y: slantLines[1] + slantLines[2] + slantLines[6]
                        },
                        {
                            x: w,
                            y: slantLines[1] + slantLines[2] + slantLines[6]
                        },
                        {
                            x: w,
                            y: h - slantLines[4]
                        },
                        {
                            x: w - slantLines[4],
                            y: h
                        },
                        {
                            x: slantLines[2],
                            y: h
                        }
                    );
                    vm.drawFlarLine(true, slantLines[7] + 0.13*w);
                    break;
                case 'line-frame7':
                    vm.points3.push(
                        {
                            x: 0,
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: 0,
                            y: h - slantLines[4]
                        },
                        {
                            x: slantLines[4],
                            y: h
                        },
                        {
                            x: 0.3*w + slantLines[4],
                            y: h
                        },
                        {
                            x: 0.3*w + slantLines[4] + slantLines[5],
                            y: h - slantLines[5]
                        },
                        {
                            x: w - slantLines[2],
                            y: h - slantLines[5]
                        }
                    );
                    vm.drawFlarLine(true, 0);
                    break;
                case 'line-frame8':
                    vm.points3.push(
                        {
                            x: 0,
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: 0,
                            y: h - slantLines[4]
                        },
                        {
                            x: slantLines[4],
                            y: h
                        },
                        {
                            x: 0.35*w + slantLines[4],
                            y: h
                        },
                        {
                            x: 0.35*w + slantLines[4] + slantLines[5],
                            y: h - slantLines[5]
                        },
                        {
                            x: w - slantLines[2],
                            y: h - slantLines[5]
                        }
                    );
                    vm.drawFlarLine(true, 0);
                    break;
                case 'line-frame9':
                    vm.points3.push(
                        {
                            x: slantLines[0],
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: 0,
                            y: slantLines[0] + slantLines[1] + slantLines[2]
                        },
                        {
                            x: 0,
                            y: h
                        },
                        {
                            x: 0.4*w,
                            y: h
                        },
                        {
                            x: 0.4*w + slantLines[5],
                            y: h - slantLines[5]
                        },
                        {
                            x: w - slantLines[2],
                            y: h - slantLines[5]
                        }
                    );
                    vm.drawFlarLine(true, slantLines[0]);
                    break;
                case 'line-frame10':
                    vm.points3.push(
                        {
                            x: slantLines[4],
                            y: slantLines[1] + slantLines[2]
                        },
                        {
                            x: 0,
                            y: slantLines[1] + slantLines[2] + slantLines[4]
                        },
                        {
                            x: 0,
                            y: h
                        },
                        {
                            x: w - slantLines[2],
                            y: h
                        }
                    );
                    vm.drawFlarLine(false, slantLines[4]);
                    break;
            }
        },
        // 绘制线框发光的角线条
        drawFlarLine: function (lackBtmFlag, slantLineLength) {
            // lackBtmFlag，底边是否到达底部，true代表底边没有到达底部，false代表底边到达底部
            // slantLineLength，缺角线x/y轴长度
            var vm = this;
            // 获取线框容器宽高，减1是因为不让父容器挡到svg的边框
            var w = vm.lineDom.width() - 1;
            var h = vm.lineDom.height() - 1;
            var lackLineCount = 5;  // 线框发光的角线条个数
            // var lineLengths = [2, 50, 100, 150];  // 线框发光的角线条各个长度
            var lineColor = '#00d1ff';      // 线框发光的角线条颜色
            var lineWidth = vm.config.lineWidth;
            var direction = vm.config.direction;
            var lackLineWidth = Number(Math.sqrt(slantLineLength*slantLineLength*2).toFixed(2));   // 缺角线的长度
            var lineIdName = vm.lineDom.attr('id');
            var flarLineWrap = $('#' + lineIdName).find('.flar-line-wrap');
            for (var i=1; i<=lackLineCount; i++) {
                flarLineWrap.append('<div class="flar-line flar-line-' + i + '"></div>');
            }

            var flarLines = flarLineWrap.find('.flar-line');
            var leftValue  = vm.slantLines[2] - 1;
            var rightValue = vm.slantLines[2];
            var bottomValue = vm.slantLines[5];
            var topValue = vm.slantLines[1] + vm.slantLines[2] - 1;
            if (direction === 'left') {
                flarLines.eq(0).css({
                    left: leftValue,
                    bottom: lackBtmFlag ? bottomValue : 0,
                    borderRight: lineWidth + 'px solid transparent',
                    borderBottom: 0.3*h + 'px solid ' + lineColor
                });
                flarLines.eq(1).css({
                    left: leftValue,
                    bottom: lackBtmFlag ? bottomValue : 0,
                    borderRight: 0.2*w + 'px solid transparent',
                    borderBottom: lineWidth + 'px solid ' + lineColor
                });
                flarLines.eq(2).css({
                    right: slantLineLength,
                    top: topValue,
                    borderLeft: 0.3*w + 'px solid transparent',
                    borderTop: lineWidth + 'px solid ' + lineColor
                });
                flarLines.eq(3).css({
                    right: 0,
                    top: topValue + slantLineLength,
                    borderLeft: lineWidth + 'px solid transparent',
                    borderTop: 0.2*h + 'px solid ' + lineColor
                });
                flarLines.eq(4).css({
                    right: slantLineLength - lackLineWidth,
                    top: topValue,
                    width: lackLineWidth,
                    height: lineWidth,
                    backgroundColor: lineColor,
                    transform: 'rotate(45deg)',
                    transformOrigin: 'left top'
                });
            } else if (direction === 'right') {
                flarLines.eq(0).css({
                    right: rightValue,
                    bottom: lackBtmFlag ? bottomValue : 0,
                    borderLeft: lineWidth + 'px solid transparent',
                    borderBottom: 0.3*h + 'px solid ' + lineColor
                });
                flarLines.eq(1).css({
                    right: rightValue,
                    bottom: lackBtmFlag ? bottomValue : 0,
                    borderLeft: 0.2*w + 'px solid transparent',
                    borderBottom: lineWidth + 'px solid ' + lineColor
                });
                flarLines.eq(2).css({
                    left: slantLineLength,
                    top: topValue,
                    borderRight: 0.3*w + 'px solid transparent',
                    borderTop: lineWidth + 'px solid ' + lineColor
                });
                flarLines.eq(3).css({
                    left: 0,
                    top: topValue + slantLineLength,
                    borderRight: lineWidth + 'px solid transparent',
                    borderTop: 0.2*h + 'px solid ' + lineColor
                });
                flarLines.eq(4).css({
                    left: slantLineLength - lackLineWidth,
                    top: topValue,
                    width: lackLineWidth,
                    height: lineWidth,
                    backgroundColor: lineColor,
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'right top'
                });
            } else if (direction === 'center') {
                var lineLength = vm.slantLines[6];  // 风险分数线框的折线长度
                var centerLackLineWidth = Number(Math.sqrt(lineLength*lineLength*2).toFixed(2));
                flarLines.eq(0).css({
                    right: slantLineLength + lineLength*2,
                    top: lineLength - 1,
                    borderLeft: 0.1*w + 'px solid transparent',
                    borderTop: lineWidth + 'px solid ' + lineColor
                });
                flarLines.eq(1).css({
                    right: slantLineLength + lineLength + lineWidth,
                    top: 0,
                    width: centerLackLineWidth,
                    height: lineWidth,
                    backgroundColor: lineColor,
                    transform: 'rotate(-45deg)',
                    transformOrigin: 'right top'
                });
                flarLines.eq(2).css({
                    right: slantLineLength + lineWidth,
                    top: 0,
                    width: lineLength,
                    height: lineWidth,
                    backgroundColor: lineColor
                });
                flarLines.eq(3).css({
                    right: slantLineLength,
                    top: 0,
                    borderLeft: lineWidth + 'px solid transparent',
                    borderTop: 0.8*lineLength + 'px solid ' + lineColor
                });
            } else if (direction === 'center-btm') {
                flarLines.eq(0).css({
                    right: slantLineLength,
                    top: topValue,
                    borderLeft: 0.3*w + 'px solid transparent',
                    borderTop: lineWidth + 'px solid ' + lineColor
                });
                flarLines.eq(1).css({
                    right: slantLineLength,
                    top: topValue,
                    borderLeft: lineWidth + 'px solid transparent',
                    borderTop: 0.8*vm.slantLines[6] + 'px solid ' + lineColor
                });
            }
        },
        // 获取线框坐标
        getPoints: function (points) {
            var polygons = '';
            for (var i = 0; i<points.length; i++) {
                polygons += points[i].x + ' ' + points[i].y + ',';
            }
            return polygons.substr(0, polygons.length -1);
        },
        // 获取圆弧线框
        getArcPath: function () {
            // M 80 80 A 70 70 0 1 0 200 80
            // M = moveto(M X,Y) ：将画笔移动到指定的坐标位置
            // A = elliptical Arc(A RX,RY,XROTATION,FLAG1,FLAG2,X,Y)：弧线
            // A rx ry x-axis-rotation large-arc-flag sweep-flag x y
            // x-axis-rotation 弧形的旋转情况
            // large-arc-flag（角度大小），0表示小角度弧（小于180），1表示大角度弧（大于180）
            // sweep-flag表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧
            var point = this.arcPoint;
            var d = 'M '+ point.sx + ' ' + point.sy + ' A ' + point.rx + ' ' + point.ry + ' 0 1 0 ' + point.ex + ' ' + point.ey;
            return d;
        },
        // 绘制线框
        drawPolygon: function () {
            var vm = this;
            var lineWidth = vm.config.lineWidth;
            vm.setPoints();
            if (vm.config.direction !== 'center') {
                var points1 = vm.getPoints(vm.points1);
                // var points2 = vm.getPoints(vm.points2);
                var points3 = vm.getPoints(vm.points3);
                // 绘制多边形
                vm.polygons.eq(0).attr({
                    points: points1
                });
                // vm.polygons.eq(1).attr({
                //     points: points2
                // });
                vm.polygons.eq(2).attr({
                    points: points3
                });
            } else {
                var points = vm.getPoints(vm.points);
                // 绘制多边形
                vm.polygons.eq(0).attr({
                    points: points
                }).css({
                    'stroke-width': lineWidth
                });
                // 绘制圆弧
                vm.arcPath.eq(0).attr({
                    d: vm.getArcPath()
                }).css({
                    stroke: '#005d8b',
                    fill: '#13063b',
                    'stroke-width': lineWidth
                });
            }

        },
    };

    window.drawLine = lineFrame;

    $.fn.extend({
        drawLine: function(config){
            new lineFrame(config, this);
            return this;
        }
    });
})(jQuery);