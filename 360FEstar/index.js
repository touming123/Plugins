(function () {
    var setPasswordTimes = 0;
    var firstInput = "";

    // var canvasObj = {
    //     /**宽 */
    //     width: 300,
    //     /**高 */
    //     height: 300,
    //     /**到屏幕上方距离 */
    //     top: 60,
    //     /**到屏幕左边距离 */
    //     left: 40,
    //     /**小圆半径 */
    //     R: 25,
    //     /**两个圆x轴之间的距离 */
    //     offsetX: 30,
    //     /**两个圆y轴之间的距离 */
    //     offsetY: 30,
    //     /**九宫格距离canvas边框x轴距离 */
    //     lenX: 0,
    //     /**九宫格距离canvas边框y轴距离 */
    //     lenY: 0,
    //     /**九个圆心的位置 */
    //     circleCenterPosition: [],

    //     /**
    //      * 设置canvas尺寸，位置
    //      */
    //     setCanvas: function (canvas, bodyWidth) {
    //         canvasObj.width = bodyWidth - 80;
    //         canvasObj.height = canvasObj.width;
    //         canvasObj.lenX = (canvasObj.width - 2 * canvasObj.offsetX - canvasObj.R * 2 * 3) / 2;
    //         canvasObj.lenY = (canvasObj.height - 2 * canvasObj.offsetX - canvasObj.R * 2 * 3) / 2;
    //         canvasObj.top = document.getElementById('password').clientHeight;
    //         canvasObj.left = 40;
    //         canvasObj.setCircleCenterPosition();
    //     },

    //     /**
    //      * 初始化canvas，添加监听事件
    //      */
    //     initCanvas: function (canvas) {
    //         var context = canvas.getContext("2d");
    //         canvas.width = canvasObj.width;
    //         canvas.height = canvasObj.height;
    //         canvasObj.addEvent(canvas, context);
    //         canvasObj.drawCanvas(context, [], null);
    //     },

    //     /**
    //      * 设置canvas上每个圆点的圆心位置，保存至canvasObj.circleCenterPosition
    //      */
    //     setCircleCenterPosition: function () {
    //         for (var i = 0; i < 3; i++) {
    //             for (var j = 0; j < 3; j++) {
    //                 var pos = {
    //                     X: (canvasObj.offsetY + j * canvasObj.lenY + (j * 2 + 1) * canvasObj.R),
    //                     Y: (canvasObj.offsetX + i * canvasObj.lenX + (i * 2 + 1) * canvasObj.R)
    //                 };
    //                 canvasObj.circleCenterPosition.push(pos);
    //             }
    //         }
    //     },

    //     /**
    //      * 画一个圆
    //      */
    //     drawCicle: function (context, Point, borderColor, contendColor) {
    //         context.fillStyle = borderColor;
    //         context.beginPath();
    //         context.arc(Point.X, Point.Y, canvasObj.R, 0, Math.PI * 2, true);
    //         context.closePath();
    //         context.fill();
    //         context.fillStyle = contendColor;
    //         context.beginPath();
    //         context.arc(Point.X, Point.Y, canvasObj.R - 2, 0, Math.PI * 2, true);
    //         context.closePath();
    //         context.fill();
    //     },

    //     /**
    //      * 画触摸线
    //      */
    //     drawTouchLine: function (context, selectCircleArr, touchPoint) {
    //         var circleArr = canvasObj.circleCenterPosition;
    //         context.beginPath();
    //         for (var i = 0; i < selectCircleArr.length; i++) {
    //             var pointIndex = selectCircleArr[i];
    //             context.lineTo(circleArr[pointIndex].X, circleArr[pointIndex].Y);
    //         }
    //         context.lineWidth = 2;
    //         context.strokeStyle = "#df2b1b";
    //         context.stroke();
    //         context.closePath();
    //         if (touchPoint != null) {
    //             var lastPointIndex = selectCircleArr[selectCircleArr.length - 1];
    //             var lastPoint = circleArr[lastPointIndex];
    //             context.beginPath();
    //             context.moveTo(lastPoint.X, lastPoint.Y);
    //             context.lineTo(touchPoint.X - canvasObj.left, touchPoint.Y - canvasObj.top);
    //             context.stroke();
    //             context.closePath();
    //         }
    //     },

    //     /**
    //      * 画图形
    //      */
    //     drawCanvas: function (context, selectCircleArr, touchPoint) {
    //         var circleArr = canvasObj.circleCenterPosition;
    //         if (selectCircleArr.length > 0) {
    //             canvasObj.drawTouchLine(context, selectCircleArr, touchPoint);
    //         }
    //         for (var i = 0; i < circleArr.length; i++) {
    //             var Point = circleArr[i];
    //             if (selectCircleArr.indexOf(i) >= 0) {
    //                 canvasObj.drawCicle(context, Point, "#fd8d00", "#ffa723");
    //             } else {
    //                 canvasObj.drawCicle(context, Point, "#d0d0d0", "#ffffff");
    //             }
    //         }
    //     },

    //     /**
    //      * 判断触摸点是否在canvas圆点上，如果在加入到selectCircleArr中
    //      */
    //     selectCircle: function (touches, selectCircleArr) {
    //         for (var i = 0, len = canvasObj.circleCenterPosition.length; i < len; i++) {
    //             var cur = canvasObj.circleCenterPosition[i];
    //             var xdiff = Math.abs(cur.X - touches.pageX + canvasObj.left);
    //             var ydiff = Math.abs(cur.Y - touches.pageY + canvasObj.top);
    //             //计算触摸点是否在圆内
    //             var distance = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
    //             if (distance < canvasObj.R) {
    //                 if (selectCircleArr.indexOf(i) < 0) {
    //                     selectCircleArr.push(i);
    //                 }
    //                 break;
    //             }
    //         }
    //     },

    //     /**
    //      * 清楚canvas上手势
    //      */
    //     clearTouched: function (canvas) {
    //         var context = canvas.getContext("2d");
    //         context.clearRect(0, 0, canvasObj.width, canvasObj.height);
    //         canvasObj.drawCanvas(context, [], null);
    //     },
        
    //     /**
    //      * 添加监听事件
    //      */
    //     addEvent: function (canvas, context) {
    //         var selectCircleArr = [];
    //         canvas.addEventListener("touchstart", function (e) {
    //             canvasObj.selectCircle(e.touches[0], selectCircleArr);
    //         }, false);

    //         canvas.addEventListener("touchmove", function (e) {
    //             e.preventDefault();
    //             var touches = e.touches[0];
    //             canvasObj.selectCircle(touches, selectCircleArr);
    //             context.clearRect(0, 0, canvasObj.width, canvasObj.height);
    //             canvasObj.drawCanvas(context, selectCircleArr, { X: touches.pageX, Y: touches.pageY });
    //         }, false);

    //         canvas.addEventListener("touchend", function (e) {
    //             context.clearRect(0, 0, canvasObj.width, canvasObj.height);
    //             canvasObj.drawCanvas(context, selectCircleArr, null);
    //             if (isSetPassword()) {
    //                 setPasswordTimes += 1;
    //             }
    //             handleAction(selectCircleArr.join(""));
    //             selectCircleArr = [];
    //         }, false);
    //     },

    // };

    /**
     * 设置提示信息
     */
    function setTipsContent(content) {
        var tips = document.getElementById('tips');
        tips.innerHTML = content;
    }

    /**
     * 处理手势密码
     */
    function handleAction(gestureString) {
        if (isSetPassword()) {//设置密码
            if (setPasswordTimes === 1) {//第一次设置
                if (gestureString.length >= 5) {//密码长度可用
                    firstInput = gestureString;
                    setTipsContent('请再次输入手势密码');
                } else {//密码长度不可用
                    setTipsContent('密码太短，至少需要5个点');
                    setPasswordTimes = 0;
                }
            } else {//第二次设置
                if (gestureString === firstInput) {//两次密码相同
                    setTipsContent('密码设置成功');
                    setLocalInfo(gestureString);
                    //设置radio为验证密码
                    document.getElementsByTagName('input')[1].checked = 'checked';
                } else {
                    setTipsContent('两次输入的不一致');
                    setPasswordTimes = 0;
                }
            }
        } else {//验证密码
            setPasswordTimes = 0;
            var localInfo = getLocalInfo();
            if (gestureString === localInfo) {//与local比较
                setTipsContent('密码正确！');
            } else {
                setTipsContent('输入的密码不正确');
            }
        }
    }

    /**
     * 判断是否在设置密码阶段
     */
    function isSetPassword() {
        var radio = document.getElementsByName('choose');
        for (var i = 0; i < radio.length; i++) {
            if (radio[i].checked)
                break;
        }
        if (i === 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 设置localstorage，存储用户密码
     */
    function setLocalInfo(gestureString) {
        localStorage.setItem('PasswordInfo', gestureString);
    }

    /**
     * 读取localstorage中的用户密码
     */
    function getLocalInfo() {
        return localStorage.getItem('PasswordInfo');
    }

    /**
     * 初始化页面
     */
    function init() {
        var canvas = document.getElementById("myCanvas");
        var optionsCanvasUI = {
            width: 300,
            height: 300,
            top: 60,
            left: 40,
            R: 25,
            offsetX: 30,
            offsetY: 30,
            circle: {
                borderColor: "#d0d0d0",
                borderWidth: 2,
                contendColor: "#ffffff"
            },
            circleSelected: {
                borderColor: "#fd8d00",
                borderWidth: 2,
                contendColor: "#ffa723"
            },
            touchLine: {
                lineColor: "#df2b1b",
                lineWidth: 2
            }
           
        };
        var optionsTips = {
            firstSetWrong: function() {

            },
            firstSetRight: function() {

            },
            secondSetWrong: function() {

            },
            secondSetRight: function() {

            },
            checkWrong: function() {

            },
            checkRight: function() {

            }
        };

        optionsCanvasUI.width = document.body.offsetWidth - 80;
        optionsCanvasUI.height = optionsCanvasUI.width;
        optionsCanvasUI.top = document.getElementById('password').clientHeight;
        optionsCanvasUI.left = 40;

        canvasObj.setCanvas(canvas, optionsCanvasUI);
        canvasObj.initCanvas(canvas);
        //设置默认选中radio
        var localInfo = getLocalInfo();
        var radios = document.getElementsByName('choose');
        if (typeof localInfo === "string") {
            radios[1].checked = 'checked';
        } else {
            radios[0].checked = 'checked';
        }
        //添加radio监听事件
        for (var i = 0; i < radios.length; i++) {
            radios[i].onclick = function() {
                canvasObj.clearTouched(canvas);
            }
        }
        
    }

    init();
})();


