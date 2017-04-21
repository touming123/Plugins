export class Compute {
    constructor(num1, num2) {
        this.num1 = num1;
        this.num2 = num2;
    }
    getNumPoint(num) {
        if (num.toString().includes('.')) {
            return num.toString().split('.')[1].length;
        } else {
            return 0;
        }
    }

    /**
     * 加法
     */
    add() {
        let p1 = this.getNumPoint(this.num1),
            p2 = this.getNumPoint(this.num2);
        let m = Math.pow(10, Math.max(p1, p2));
        let res = (this.num1 * m + this.num2 * m) / m;
        return res;

    }

    /**
     * 减法
     */
    sub() {
        this.num2 = -this.num2;
        this.add();
    }

    /**
     * 乘法
     */
    mul() {
        let p1 = this.getNumPoint(this.num1),
            p2 = this.getNumPoint(this.num2);
        this.num1 *= Math.pow(10, p1);
        this.num2 *= Math.pow(10, p2);
        let m = Math.pow(10, p1 + p2);
        let res = this.num1 * this.num2 / m;
        return res;
    }

    /**
     * 除法
     */
    div() {
        let p1 = this.getNumPoint(this.num1),
            p2 = this.getNumPoint(this.num2);
        this.num1 *= Math.pow(10, p1);
        this.num2 *= Math.pow(10, p2);
        let m = Math.pow(10, p2 - p1);
        let res = this.num1 / this.num2 * m;
        return res;
    }
}