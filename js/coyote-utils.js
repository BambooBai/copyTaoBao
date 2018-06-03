let utils = (() => {
    let getCss = (ele, attr) => {
        if ("getComputedStyle" in window) {
            let val = getComputedStyle(ele, null)[attr];
            let reg = /^-?\d+(\.\d+)?(px|pt|rem|em)$/;
            reg.test(val) ? val = parseFloat(val) : null;
            return val;
        }
    };
    let setCss = (ele, attr, val) => {
        if (!isNaN(val) && !/^(opacity|zIndex)$/.test(val)) {
            val += 'px';
        }
        ele.style[attr] = val;
    };
    let setGroupCss = (ele, options = {}) => {
        for (let attr in options) {
            if (!options.hasOwnProperty(attr)) {
                break;
            }
            let item = options[attr];
            setCss(ele, attr, item);
        }
    };
    let css = (...arg) => {
        let len = arg.length,
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        len === 2 && arg[1] instanceof Object ? fn = setGroupCss : null;
        return fn(...arg);
    };
    let offset = (curEle) => {
        let curLef = curEle.offsetLeft,
            curTop = curEle.offsetTop,
            p = curEle.offsetParent;
        while (p && p.tagName.toLocaleLowerCase() !== 'body') {
            curLef += p.clientLeft + p.offsetLeft;
            curTop += p.clientTop + p.offsetTop;
            p = p.offsetParent;
        }
        return {
            left: curLef,
            top: curTop
        }

    };

    let each = (obj, callback) => {
        let len = +obj.length;
        if (len !== len) {
            for (let attr in obj) {
                if (!obj.hasOwnProperty(attr)) {
                    break;
                }
                let item = obj[attr];
                let res = callback && callback.call(item, attr, item);
                if (res === false) {
                    break;
                }
            }
            return;
        }
        for (let i = 0; i < obj.length; i++) {
            let item = obj[i];
            let res = callback && callback.call(item, i, item);
            if (res === false) {
                break;
            }
        }
        return;
    };

    let hasClass = (ele, strClass) => {
        return ele.className.trim().split(/ +/).indexOf(strClass) > -1;
    };

    let addClass = (ele, strClass) => {
        if (hasClass(ele, strClass)) {
            return;
        }
        ele.className += ` ${strClass}`;
    };

    let removeClass = (ele, strClass) => {
        if (!hasClass(ele, strClass)) {
            return;
        }
        let ary = ele.className.trim().split(/ +/);
        ary = ary.filter((item, index) => item !== strClass);
        ele.className = ary.join(" ");
    };

    let getByClass = (oPar, className) => {
        if ("getElementsByClassName" in document) {//如果兼容getElementsByClassName
            return oPar.getElementsByClassName(className);
        }
        let ele = oPar.getElementsByTagName("*");
        let eleAry = [];
        for (let i = 0; i < ele.length; i++) {
            if (hasClass(ele[i], className)) {
                eleAry.push(ele);
            }
        }
        return eleAry;
    };
    return {
        css,
        offset,
        each,
        hasClass,
        addClass,
        removeClass,
        getByClass
    }
})();
let effect = {
    linear: (t, b, c, d) => {
        return t / d * c + b;
    },
    reduce: (t, b, c, d) => {
        return c / d * t * t +b;
    }
};

let animate = (ele, target, duration = 1000, callback) => {
    if (typeof duration === 'function') {
        callback = duration;
        duration = 1000;
    }
    let t = 0,
        begin = {},
        change = {};
    utils.each(target, (attr, item) => {
        begin[attr] = utils.css(ele, attr);
        change[attr] = target[attr] - begin[attr];
    });
    clearInterval(ele.timer);
    ele.timer = setInterval(() => {
        t += 17;
        if (t >= duration) {
            utils.css(ele, target);
            clearInterval(ele.timer);
            callback && callback();
            return;
        }
        let cur = {};
        utils.each(target, (attr, item) => {
            cur[attr] = effect.linear(t, begin[attr], change[attr], duration);
        });
        utils.css(ele, cur);
    }, 17);
};

