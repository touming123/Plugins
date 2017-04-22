import { Calculate } from './calculate.js';

export function init() {
    console.log('start init');
    let dataObj = document.querySelector('#data');
    let wrap = document.querySelector('.wrap');
    let data = '';
    wrap.addEventListener('click', function(e) {
        let classNames = e.target.className;
        if (classNames.includes('btn')) {
            if (e.target.id === 'clear') {
                dataObj.innerHTML = '';
                data = '';
            } else if (e.target.id === 'result') {
                let result = new Calculate(data).getResult(); //4*(5-3)-2//12-16
                dataObj.innerHTML = result;
                data = result;
            } else {
                dataObj.innerHTML += e.target.innerHTML;
                if (classNames.includes('num')) {
                    data += e.target.innerHTML;
                } else {
                    switch (e.target.id) {
                        case 'add':
                            data += '+';
                            break;
                        case 'sub':
                            data += '-';
                            break;
                        case 'mul':
                            data += '*';
                            break;
                        case 'divide':
                            data += '/';
                            break;
                        default:
                            break;
                    }
                }

            }

        }
    }, false)
}