//点击关闭弹框
let closeFrame = (ele,classStr) => {
    utils.removeClass(ele.parentNode,classStr);
};
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
        titList = featit.getElementsByTagName("li"),
        aClose = null;
    let typeContit = null,
        typeContitListTel = null,
        typeContitListTour = null,
        typeContitListSav = null;
    let data = [];
    let bindData = (res) => {
        let str = '', constr = ``;
        utils.each(res, (index, {name, content}) => {
            str += `<li class="conveitem"><a href="javascipt:"><span class="tbh-icon" style="background-position:0 ${-44 * index}px"></span><span class="block">${name}</span></a></li>`;
            if(content && content.length>0){
                constr += `<div class="conve"><a href="javascript:" class="close">X</a><div class="convetit">`;
                let typeTit = ``, typeCon = ``;
                typeTit = `<div class="typeContit">`;
                typeCon = `<div class="typeCon clearfix">`;
                if(index === 0 || index === 2){
                    utils.each(content,(ind, {name1,mailList,price,curprice,actBtn,typell,firsel,link=''}) => {
                        typeTit += `<a href="javascript:" class="${ind === 0 ? 'active':''}">${name1}</a>`;
                        typeCon += `<div class="inpcon ${ind === 0 ? 'active':''}">
                             <p><input type="text" class="normalinp" placeholder="${mailList||firsel.options[0]}"><a href="javascript:;" class="normalico"></a></p>
                             <p>`;
                        if(typeof typell !== 'undefined'){
                            /*let typecat = ``;
                            typeCon += ``;
                            utils.each(type,(typeind, {typename,amount}) => {
                                typecat += `<span>${typename}</span>`
                            });*/

                            typeCon += `<input type="text" placeholder="${typell[0].typename}" class="smallinp"><a href="javascript:;"></a>`;
                            typeCon += `<input type="text" placeholder="${typell[0].amount[4]}" class="smallinp"><a href="javascript:;"></a>`;
                        }else{
                            typeCon += `<input class="normalinp" type="text"><a class="price" href="#price" ></a><span class="tarprice" id="price">`;
                            // utils.each(price,(index, item) => {
                            //     typeCon += `<span data-index="${index}">${item}</span>`;
                            // });
                        }

                        typeCon += `</span></p><p>售价： ￥ <span class="redact">49</span></p>
<p class="btnP"><input type="button" class="btnorg actBtn" value="${actBtn}"><a href="">${link}</a></p>
</div>`;
                    });
                }else{
                    utils.each(content,(ind,{name1,radioType=[],starCity,tarCity,starTime,actBtn}) => {
                        typeTit += `<a href="javascript:" class="${ind === 0 ? 'active':''}">${name1}</a>`;
                        typeCon += `<div class="inpcon ${ind === 0 ? 'active':''}">`;
                        if(radioType.length){
                            typeCon += `<p class="clearfix tour">`;
                            utils.each(radioType,(radind,{radioName,name,val}) => {
                                typeCon += `<label for="${name}" class="radlabel"><input type="radio" name="${name}" value="${val}">${radioName}</label>`;
                            });
                            typeCon += `</p>`;
                        }
                        typeCon += `<p class="tour clearfix"><input class="tourInp" type="text" placeholder="${starCity}"><span> --&gt; </span><input class="tourInp" type="text" placeholder="${tarCity}"></p>`;
                        typeCon += `<p class="tour clearfix"><input class="tourInp" type="text" placeholder="${starTime}"></p>`;
                        typeCon += `<p class="btnP"><input type="button" class="btnorg actBtn" value="${actBtn}"></p>
</div>`;
                    });
                }
                typeCon += '</div>';
                typeTit += `</div>`;
                constr += typeTit + typeCon;
                constr += `</div></div>`;
            }
        });
        featit.innerHTML = str;
        feacon.innerHTML = constr;

    };
    return {
        init: function () {
            let promise = queryData('./json/coyote2.json');
            promise.then(bindData).then(() => {
                tabs({
                    curEleAry: titList
                });
            }).then(() => {
                aClose = features.querySelectorAll(".close");
                utils.each(aClose, (index, item) => {
                    item.addEventListener('click',closeFrame.bind(null,item, 'active'));
                });
                typeContit = features.querySelectorAll(".typeContit");
                typeContitListTel = typeContit[0].querySelectorAll("a");
                typeContitListSav = typeContit[2].querySelectorAll("a");
                typeContitListTour = typeContit[1].querySelectorAll("a");
                tabs({
                    curEleAry: typeContitListTel
                });
                tabs({
                    curEleAry: typeContitListSav
                });
                tabs({
                    curEleAry: typeContitListTour
                });

                /*utils.each(titList, (index, item) => {
                    item.addEventListener("mouseleave", () => {
                        utils.each(feacon.children, (index, item) => {
                            utils.removeClass(item, 'active');
                        });
                    })
                });*/
            });
        }
    }
})();

notice.init();
app.init();
feature.init();