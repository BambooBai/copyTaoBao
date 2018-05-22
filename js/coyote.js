let queryData = (url, resdata) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("get", url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resdata = JSON.parse(xhr.responseText);
                resolve(resdata);
            }
        };
        xhr.send(null);
    });
};
//切换选项卡
let tabsMethod = (curEle, curInd, {actCurClass, actConClass}, callback) => {
    let conList = curEle.parentNode.nextElementSibling.children;
    utils.each(conList, (index, item) => {
        if (index === curInd) {
            utils.addClass(item, actConClass);
            utils.addClass(item.parentNode, actConClass);
            return;
        }
        utils.removeClass(item, actConClass)
    });
    utils.each(curEle.parentNode.children, (index, item) => {
        if (item === curEle) {
            utils.addClass(item, actCurClass);
            return;
        }
        utils.removeClass(item, actCurClass)
    });

    // console.dir(curEle);
};
//选项卡：后期可改为插件
let tabs = (options = {}) => {
    let _default = {
        curEleAry: [],
        method: "mouseenter",
        actCurClass: "active",
        actConClass: "active"
    };
    options = {..._default, ...options};
    utils.each(options.curEleAry, (index, item) => {
        item.tabsMethod = tabsMethod.bind(item, item, index, options);
        item.addEventListener(options.method, item.tabsMethod);
    });
};
//公告
let notice = (() => {
    let noticeTit = document.querySelector("#noticetit"),
        noticeCon = document.querySelector("#noticecon"),
        titList = noticeTit.getElementsByTagName("li");

    let data = [];
    let bindData = data => {
        let titstr = ``, constr = ``;
        utils.each(data, (index, {title = '', content = []}) => {
            titstr += `<li class="${index === 0 ? 'active' : ''}"><a href="javascript:">${title}</a></li>`;
            constr += `<ul class="clearfix ${index === 0 ? 'active' : ''}">`;
            utils.each(content, (index, {hot = 'false', line = 'false', href = '', desc = ''}) => {
                constr += `<li class="${line ? 'block' : 'inline-block'} ${hot ? 'hot' : ''}"><a href="${href}">${desc}</a></li>`;
            });
            constr += '</ul>'
        });
        noticeTit.innerHTML = titstr;
        noticeCon.innerHTML = constr;
    };
    return {
        init: function () {
            let promise = queryData("./json/coyote1.json", data);
            promise.then(bindData).then(() => {
                tabs({
                    curEleAry: titList
                });
            })
        }
    }
})();
//app
let app = (() => {
    let app = document.querySelector("#app"),
        appnav = app.querySelector(".appnav"),
        appnavList = appnav.getElementsByTagName("li"),
        appQR = app.querySelector(".appconQR");
    let data = [];
    let bindData = data => {
        let titstr = ``, constr = ``;
        utils.each(data, (index, {appName = '', img = '', appQR = '', QRalt = '', descQR = ''}) => {
            titstr += `<li class="nav fl"><a href="javascript:"><img src="${img}" alt="${appName}"></a></li>`;
            constr += `<div class="appQR"><img src="${appQR}" alt="QRalt"><p>${descQR}</p></div>`;
        });
        appnav.innerHTML = titstr;
        appQR.innerHTML = constr;
    };
    return {
        init: function () {
            let promise = queryData('./json/coyote3.json', data);
            promise.then(bindData).then(() => {
                tabs({
                    curEleAry: appnavList
                });
            }).then(() => {
                utils.each(appnavList, (index, item) => {
                    item.addEventListener("mouseleave", () => {
                        utils.each(appQR.children, (index, item) => {
                            utils.removeClass(item, 'active');
                        });
                    })
                });
            });
        }
    }
})();
let feature = (() => {
    let features = document.querySelector("#features"),
        featit = features.querySelector(".featurestit"),
        feacon = features.querySelector(".featurescon"),
        titList = featit.getElementsByTagName("li");
    let data = [];
    let bindData = (res) => {
        let str = '', constr = ``;
        utils.each(res, (index, {name, content}) => {
            str += `<li class="conveitem"><a href="javascipt:"><span class="tbh-icon" style="background-position:0 ${-44 * index}px"></span><span class="block">${name}</span></a></li>`;
            if(content.length>0){
                if(index === 0){
                    utils.each(content,(ind, item) => {

                    });
                }
            }
        });
        featit.innerHTML = str;

    };
    return {
        init: function () {
            let promise = queryData('./json/coyote2.json');
            promise.then(bindData);
        }
    }
})();

notice.init();
app.init();
feature.init();