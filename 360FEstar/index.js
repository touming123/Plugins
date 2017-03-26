(function() {
    var setPasswordTimes = 0;
    var firstInput = "";

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
        if (isSetPassword()) { //设置密码
            setPasswordTimes += 1;
            if (setPasswordTimes === 1) { //第一次设置
                if (gestureString.length >= 5) { //密码长度可用
                    firstInput = gestureString;
                    setTipsContent('请再次输入手势密码');
                } else { //密码长度不可用
                    setTipsContent('密码太短，至少需要5个点');
                    setPasswordTimes = 0;
                }
            } else { //第二次设置
                if (gestureString === firstInput) { //两次密码相同
                    setTipsContent('密码设置成功');
                    setLocalInfo(gestureString);
                    //设置radio为验证密码
                    document.getElementsByTagName('input')[1].checked = 'checked';
                } else {
                    setTipsContent('两次输入的不一致');
                    setPasswordTimes = 0;
                }
            }
        } else { //验证密码
            setPasswordTimes = 0;
            var localInfo = getLocalInfo();
            if (gestureString === localInfo) { //与local比较
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
     * 初始化radio
     */
    function initRadio() {
        //设置默认选中radio
        var localInfo = getLocalInfo();
        var radios = document.getElementsByName('choose');
        if (typeof localInfo === "string") {
            radios[1].checked = 'checked';
        } else {
            radios[0].checked = 'checked';
        }
        //添加radio监听事件
        // for (var i = 0; i < radios.length; i++) {
        //     radios[i].onclick = function() {
        //         canvasObj.clearTouched(canvas);
        //     }
        // }
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
        // var optionsTips = {
        //     firstSetWrong: function() {

        //     },
        //     firstSetRight: function() {

        //     },
        //     secondSetWrong: function() {

        //     },
        //     secondSetRight: function() {

        //     },
        //     checkWrong: function() {

        //     },
        //     checkRight: function() {

        //     }
        // };

        optionsCanvasUI.width = document.body.offsetWidth - 80;
        optionsCanvasUI.height = optionsCanvasUI.width;
        optionsCanvasUI.top = document.getElementById('password').clientHeight;
        optionsCanvasUI.left = 40;

        canvasObj.setCanvas(optionsCanvasUI);
        canvasObj.initCanvas(canvas, handleAction);

        initRadio();
    }

    init();
})();