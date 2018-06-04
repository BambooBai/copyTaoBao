/*
 * @Author: zhangyufeng 
 * @Date: 2018-05-22 09:44:01 
 * @Last Modified by:   zhangyufeng 
 * @Last Modified time: 2018-05-22 09:44:01 
 */
let imageRender = (function () {
    let container = document.querySelector(".container"),
        imgList = container.querySelectorAll("img");
    // 获取所有的目标图片
    let dataImg = [...imgList].filter(item => {
        return Boolean(item.getAttribute('data-src'))
    });
    // 给所有的data-src图片设置缓冲背景图片
    dataImg.forEach((item,index) => {
        item.style.background = 'url(./img/default.gif) no-repeat center center';
        item.style.backgroundColor = '#eee';
        let top =0;

        // 当前元素距离body的高度
        while(item.tagName!=='BODY'){
            top += item.offsetTop;
            item = item.offsetParent;
        }
        dataImg[index]['myTop'] = top;
    });
    // 图片懒加载
    let lazyImg = curImg => {
        let trueImg = curImg.getAttribute('data-src'),
            tempImg = new Image(),
            autoTimer = null;
        tempImg.onload = () => {
            autoTimer = setTimeout(() => {
                curImg.src = trueImg;
                tempImg = null;
                curImg.isLoad = true;
                clearTimeout(autoTimer);
            }, 300)
        };
        tempImg.src = trueImg;
    };
    // 图片加载
    let computedImg = () => {

        dataImg.forEach((item,index) => {
            let A = dataImg[index].myTop,
                B = document.documentElement.scrollTop + document.documentElement.clientHeight;
            if (A <= B) {
                if (item.isLoad) return;
                lazyImg(item);
            }
        })
    };

    // 图片放大
    let large =  function () {
        let dataSrc = [...imgList].filter(item => {
            return Boolean(item.getAttribute('data-large'))
        });
    };
    return {
        init: function () {
            window.addEventListener('load',computedImg);
            window.addEventListener('scroll',computedImg);
            // 绑定图片放大方法
            large();
        }
    }
})();
imageRender.init();

