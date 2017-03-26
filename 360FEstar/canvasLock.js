var canvasObj = {
    /**宽 */
    width: 300,
    /**高 */
    height: 300,
    /**到屏幕上方距离 */
    top: 60,
    /**到屏幕左边距离 */
    left: 40,
    /**小圆半径 */
    R: 25,
    /**两个圆x轴之间的距离 */
    offsetX: 30,
    /**两个圆y轴之间的距离 */
    offsetY: 30,
    /**九宫格距离canvas边框x轴距离 */
    lenX: 0,
    /**九宫格距离canvas边框y轴距离 */
    lenY: 0,
    /**未选择时圆的属性 */
    circle: {
        /**圆的边框颜色 */
        borderColor: "#d0d0d0",
        /**圆的边框宽度 */
        borderWidth: 2,
        /**圆的填充颜色 */
        contendColor: "#ffffff"
    },
    /**已选择时圆的属性 */
    circleSelected: {
        /**圆的边框颜色 */
        borderColor: "#fd8d00",
        /**圆的边框宽度 */
        borderWidth: 2,
        /**圆的填充颜色 */
        contendColor: "#ffa723"
    },
    /**触摸线的属性 */
    touchLine: {
        /**线的颜色 */
        lineColor: "#df2b1b",
        /**线的宽度*/
        lineWidth: 2
    },

    /**九个圆心的位置 */
    circleCenterPosition: [],

    /**
     * 设置canvas尺寸，位置
     */
    setCanvas: function(options) {
        canvasObj.width = options.width || 300;
        canvasObj.height = options.height || canvasObj.width;
        canvasObj.top = options.top || 60;
        canvasObj.left = options.left || 40;
        canvasObj.R = options.R || 25;
        canvasObj.offsetX = options.offsetX || 30;
        canvasObj.offsetY = options.offsetY || 30;

        canvasObj.circle.borderColor = options.circle.borderColor || "#d0d0d0";
        canvasObj.circle.borderWidth = options.circle.borderWidth || 2;
        canvasObj.circle.contendColor = options.circle.contendColor || "#ffffff";

        canvasObj.circleSelected.borderColor = options.circleSelected.borderColor || "#fd8d00";
        canvasObj.circleSelected.borderWidth = options.circleSelected.borderWidth || 2;
        canvasObj.circleSelected.contendColor = options.circleSelected.contendColor || "#ffa723";
        canvasObj.touchLine.lineColor = options.touchLine.lineColor || "#df2b1b";
        canvasObj.touchLine.lineWidth = options.touchLine.lineWidth || 2;

        canvasObj.lenX = (canvasObj.width - 2 * canvasObj.offsetX - canvasObj.R * 2 * 3) / 2;
        canvasObj.lenY = (canvasObj.height - 2 * canvasObj.offsetX - canvasObj.R * 2 * 3) / 2;
        canvasObj.setCircleCenterPosition();
    },

    /**
     * 初始化canvas，添加监听事件
     */
    initCanvas: function(canvas, handleAction) {
        var context = canvas.getContext("2d");
        canvas.width = canvasObj.width;
        canvas.height = canvasObj.height;
        canvasObj.drawCanvas(context, [], null);
        canvasObj.addEvent(canvas, context, handleAction);
    },

    /**
     * 设置canvas上每个圆点的圆心位置，保存至canvasObj.circleCenterPosition
     */
    setCircleCenterPosition: function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var pos = {
                    X: (canvasObj.offsetY + j * canvasObj.lenY + (j * 2 + 1) * canvasObj.R),
                    Y: (canvasObj.offsetX + i * canvasObj.lenX + (i * 2 + 1) * canvasObj.R)
                };
                canvasObj.circleCenterPosition.push(pos);
            }
        }
    },

    /**
     * 画一个圆
     */
    drawCicle: function(context, point, circle) {
        context.fillStyle = circle.borderColor;
        context.beginPath();
        context.arc(point.X, point.Y, canvasObj.R, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        context.fillStyle = circle.contendColor;
        context.beginPath();
        context.arc(point.X, point.Y, canvasObj.R - circle.borderWidth, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    },

    /**
     * 画触摸线
     */
    drawTouchLine: function(context, selectCircleArr, touchPoint) {
        var circleArr = canvasObj.circleCenterPosition;
        context.beginPath();
        for (var i = 0; i < selectCircleArr.length; i++) {
            var pointIndex = selectCircleArr[i];
            context.lineTo(circleArr[pointIndex].X, circleArr[pointIndex].Y);
        }
        context.lineWidth = canvasObj.touchLine.width;
        context.strokeStyle = canvasObj.touchLine.lineColor;
        context.stroke();
        context.closePath();
        if (touchPoint != null) {
            var lastPointIndex = selectCircleArr[selectCircleArr.length - 1];
            var lastPoint = circleArr[lastPointIndex];
            context.beginPath();
            context.moveTo(lastPoint.X, lastPoint.Y);
            context.lineTo(touchPoint.X - canvasObj.left, touchPoint.Y - canvasObj.top);
            context.stroke();
            context.closePath();
        }
    },

    /**
     * 画图形
     */
    drawCanvas: function(context, selectCircleArr, touchPoint) {
        var circleArr = canvasObj.circleCenterPosition;
        if (selectCircleArr.length > 0) {
            canvasObj.drawTouchLine(context, selectCircleArr, touchPoint);
        }
        for (var i = 0; i < circleArr.length; i++) {
            var point = circleArr[i];
            if (selectCircleArr.indexOf(i) >= 0) {
                canvasObj.drawCicle(context, point, canvasObj.circleSelected);
            } else {
                canvasObj.drawCicle(context, point, canvasObj.circle);
            }
        }
    },

    /**
     * 判断触摸点是否在canvas圆点上，如果在加入到selectCircleArr中
     */
    selectCircle: function(touches, selectCircleArr) {
        for (var i = 0, len = canvasObj.circleCenterPosition.length; i < len; i++) {
            var cur = canvasObj.circleCenterPosition[i];
            var xdiff = Math.abs(cur.X - touches.pageX + canvasObj.left);
            var ydiff = Math.abs(cur.Y - touches.pageY + canvasObj.top);
            //计算触摸点是否在圆内
            var distance = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);
            if (distance < canvasObj.R) {
                if (selectCircleArr.indexOf(i) < 0) {
                    selectCircleArr.push(i);
                }
                break;
            }
        }
    },

    /**
     * 清除canvas上手势
     */
    clearTouched: function(canvas) {
        var context = canvas.getContext("2d");
        context.clearRect(0, 0, canvasObj.width, canvasObj.height);
        canvasObj.drawCanvas(context, [], null);
    },

    /**
     * 添加监听事件
     */
    addEvent: function(canvas, context, handleAction) {
        var selectCircleArr = [];
        canvas.addEventListener("touchstart", function(e) {
            canvasObj.selectCircle(e.touches[0], selectCircleArr);
        }, false);

        canvas.addEventListener("touchmove", function(e) {
            e.preventDefault();
            var touches = e.touches[0];
            canvasObj.selectCircle(touches, selectCircleArr);
            canvasObj.clearTouched(canvas);
            canvasObj.drawCanvas(context, selectCircleArr, { X: touches.pageX, Y: touches.pageY });
        }, false);

        canvas.addEventListener("touchend", function(e) {
            canvasObj.clearTouched(canvas);
            canvasObj.drawCanvas(context, selectCircleArr, null);
            setTimeout(function() {
                handleAction(selectCircleArr.join(""));
                canvasObj.clearTouched(canvas);
                selectCircleArr = [];
            }, 1000);
        }, false);
    },

};