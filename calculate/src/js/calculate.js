import { Compute } from './compute.js';
export class Calculate {
    constructor(data) {
        this.data = data;
        this.result;
        this.express;
        // this.priority = {};
        // this.setPriority();
    }
    setPriority() {
        this.priority.set('', -1);
        this.priority.set('+', 1);
        this.prioirty.set('-', 1);
        this.priority.set('*', 2);
        this.priority.set('/', 2);
    }

    /**
     * opt运算的优先级
     * @param {*} opt 
     */
    getsPriority(opt) {
        if (opt === '+' || opt === '-') {
            return 1;
        } else if (opt === '*' || opt === '/') {
            return 2;
        } else {
            return 0;
        }
    }

    /**
     * 当前运算符的优先级>栈顶运算符优先级,返回true
     * @param {*} opt 
     * @param {*} optStack 
     */
    isPriority(opt, optStack) {
        if (optStack.length === 0) {
            return true;
        } else {
            let opt2 = optStack[optStack.length - 1];
            if (this.getsPriority(opt) - this.getsPriority(opt2) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    /**
     * 得到后缀表达式
     * 计算表达式求值
     */
    getResult() {
        if (true) {
            this.toPostExpression();
            this.calcExpression();
            return this.result;
        } else {
            return 'Input error';
        }

    }

    /** 检验输入的合法性
     * (^[\+\*\/])|([\+\-\*\/]$) 匹配首字符或是最后一个字符是不是运算符
     * ([\+\-\*\/][\+\*\/]+) [+,*,-,/]搭配一个或是多个[+,*,/]
     * ([\*\/](\-)+) [*,/]搭配一个或是多个[-]
     * ([\+\-](\-){2,}) [+,-]搭配两个以上的[-]
     * @type RegExp
     */
    check() {
        //reg = /^(?!.*[^\d+\-*/\(\)])(?!.*\)\d)(?!.*[+\-*/]([+\-*/]|\)))(?!.*\([+*/])(?!.*(\d|\))\()(?=\d|\-|\()(?=.*(\d|\))$)[^\(\)]*(((?'open'\()[^\(\)]*)+((?'-open'\))[^\(\)]*)+)*(?(open)(?!))$/;
        let reg = /(^[\+\*\/])|([\+\-\*\/]$)|([\+\-\*\/][\+\*\/]+)|([\*\/](\-)+)|([\+\-](\-){2,})/;
        return reg.test(this.data);
    }

    /**
     * 根据后缀表达式求值
     * 遍历表达式，如果是运算符则弹出栈顶两个元素进行计算
     */
    calcExpression() {
        let numStack = [],
            express = this.express;
        express.forEach(item => {
            if (!isNaN(item)) {
                numStack.push(item);
            } else {
                let num1 = numStack.pop(),
                    num2 = numStack.pop();
                console.log(numStack);
                let res = this.computeResult(num2, num1, item);
                numStack.push(res); //5 3 -,注意操作符顺序
            }
        });

        this.result = numStack.pop();
    }

    /**
     * 根据运算符求值
     * @param {*} num1 
     * @param {*} num2 
     * @param {*} opt 
     */
    computeResult(num1, num2, opt) {
        let compute = new Compute(num1, num2);
        switch (opt) {
            case '+':
                return compute.add();
                break;
            case '-':
                return compute.sub();
                break;
            case '*':
                return compute.mul();
                break;
            case '/':
                return compute.div();
                break;
            default:
                return 'Error';
                break;
        }
    }

    /**
     * 正则匹配，是否为数字
     * @param {*} item 
     */
    isNum(item) {
        let reg = /\d/;
        return reg.test(item);
    }

    /**
     * 根据中缀表示求后缀表达式
     * 数字直接进栈
     * ) 右括号则将左括号之前的内容全弹出
     * ( 左括号直接进栈， 运算符优先级比栈顶元素大直接进栈
     * 运算符优先级比栈顶元素小，则弹出栈顶运算符，并将当前运算符进栈
     * 遍历结束后，将栈则剩余运算符弹出。
     */
    toPostExpression() {
        let express = [],
            optStack = [];
        this.data = this.data.split('');
        let num = ''; //转化成数字
        this.data.forEach((i) => {
            if (this.isNum(i)) { //数字入栈
                num += i;
                //express.push(parseInt(i));
            } else {
                if (num !== '') {
                    express.push(parseInt(num));
                    num = '';
                }
                if (i === ')') { // 右括号则将左括号之前的内容全弹出
                    let item = optStack.pop();
                    while (item != '(') {
                        express.push(item);
                        item = optStack.pop();
                    }
                } else if (i == '(' || this.isPriority(i, optStack)) {
                    optStack.push(i);
                } else {
                    express.push(optStack.pop());
                    optStack.push(i);
                }
            }
        });
        if (num !== '') {
            express.push(parseInt(num));
            num = '';
        }
        while (optStack.length > 0) {
            express.push(optStack.pop())
        }
        this.express = express;
        console.log(express);
    }
}