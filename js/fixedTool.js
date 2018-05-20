/**
 * @autor: Eva
 * @Created by Eva on 2018/5/15.
 */
let floorRender = (function () {
    let wrapper = document.querySelector('.main'),
        floorList = wrapper.querySelectorAll('.floor'),
        menu = document.querySelector('.fixedtool'),
        boxList = menu.querySelectorAll('.box'),
        topBox = menu.querySelector('.box6'),
        isRun = false,
        step = 5,
        timer = null;

    /**
     * 某个元素是否包含某个样式
     * @param ele
     * @param str
     * @return {boolean}
     */
    let hasClass = (ele, str) => {
        return ele.className.trim().split(/ +/).indexOf(str) > -1 ? true : false;
    };
    let addClass = (ele, str) => {
        if (hasClass(ele, str)) return;
        return ele.className += ` ${str}`;
    };
    let removeClass = (ele, str) => {
        if (!hasClass(ele, str)) return;
        let ary = ele.className.trim().split(/ +/);
        ary = ary.filter(item => item !== str);
        ele.className = ary.join(' ');
    };

    /**
     * 功能：移除目标元素的所有兄弟元素的class样式'active'
     * @param ele => 目标元素
     */
    let removeSiblingClass = function (ele) {
        let sibling = ele.parentNode.children;
        for (let i = 0; i < sibling.length; i++) {
            removeClass(sibling[i], 'active');
        }
    };

    /*当你滚动屏幕的时候，焦点自动切换*/
    let changeFocus = function () {
        let curTop = document.documentElement.scrollTop;
        if (curTop < floorList[1].offsetTop) {
            removeSiblingClass(boxList[0], 'active');
            addClass(boxList[0], 'active');
            return;
        }
        if (curTop >= floorList[1].offsetTop && curTop < floorList[2].offsetTop) {
            removeSiblingClass(boxList[1], 'active');
            addClass(boxList[1], 'active');
            return;
        }
        if (curTop >= floorList[2].offsetTop && curTop < floorList[3].offsetTop) {
            removeSiblingClass(boxList[2], 'active');
            addClass(boxList[2], 'active');
            return;
        }
        if (curTop >= floorList[3].offsetTop && curTop < floorList[4].offsetTop) {
            removeSiblingClass(boxList[3], 'active');
            addClass(boxList[3], 'active');
            return;
        }
        if (curTop >= floorList[4].offsetTop) {
            removeSiblingClass(boxList[4], 'active');
            addClass(boxList[4], 'active');
            return;
        }
    };

    window.addEventListener('scroll', changeFocus);

    /* 滚动效果 */
    let move = function (index) {
        let _top = floorList[index].offsetTop;

        if (isRun) return;
        isRun = true;

        timer = setInterval(function () {
            let curT = document.documentElement.scrollTop || document.body.scrollTop;

            step += 1;
            if (curT < _top) {
                curT += step;
                if (curT >= _top) {
                    document.documentElement.scrollTop = _top;
                    clearInterval(timer);
                    isRun = false;
                    return;
                }
            } else if (curT >= _top) {
                curT -= step;
                if (curT <= _top) {
                    document.documentElement.scrollTop = _top;
                    clearInterval(timer);
                    isRun = false;
                    return;
                }
            }

            document.documentElement.scrollTop = curT;
        }, 17);
        changeFocus();
    };

    /* 给每一个工具绑定点击效果 */
    let bind = function () {
        boxList.forEach((item, index) => {
            item.onclick = move.bind(item, index);
        });
    };

    /* 回到顶部 */
    let toTop = function () {
        let winT = document.documentElement.scrollTop,
            winH = document.documentElement.clientHeight;
        if(winT >= winH) {
            topBox.style.display = 'block';
            return;
        }
        topBox.style.display = 'none';

        if(winT >= winH/2) {
            menu.style.top = '75px';
            return;
        }
        menu.style.top= '50%';
    };

    let isFlag = false;
    topBox.onclick = function () {
        if (isFlag) return;
        isFlag = true;
        let change = document.documentElement.scrollTop - 0,//=>总距离
            duration = 500,//=>总时间
            interval = 17,//=>频率：多久走一次
            step = change / duration * interval;
        let timer = setInterval(() => {
            let curT = document.documentElement.scrollTop;
            if (curT === 0) {
                isFlag = false;
                clearInterval(timer);
                return;
            }
            curT = curT - step;
            document.documentElement.scrollTop = curT;
        }, interval);
    };
    window.addEventListener('scroll', toTop);
    return {
        init: function () {
            bind();
        }
    }
})();
floorRender.init();
