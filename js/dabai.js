let dabaiFn=function () {
    let dabaiDiv=document.getElementById('dabai');
    let divL=dabaiDiv.querySelector('ul'),
        liList=divL.getElementsByTagName('li'),
        divR=dabaiDiv.querySelector('.divR'),
        divR_=divR.querySelector('.divR_'),
        divRList=null;
    let queryData=function () {
        return new Promise((reslove,reject)=> {
            let xhr=new XMLHttpRequest();
            xhr.open('GET','json/daBai.json');
            xhr.onreadystatechange=function () {
                if(xhr.readyState===4&&xhr.status===200){
                    reslove(JSON.parse(xhr.responseText));
                }
            }
            xhr.send(null);
        });
    };
    let bindHTML=function (data) {
        data=data.all;
        let strLi=``,
            strContent=``;

        data.forEach((item,index)=>{
            let {name,nameClass}=item;

            strLi+=`  <li class="clearfix">${name}</li>`;
            strContent += ` <div class="divR_item clearfix"><div class="divR_smillClass">`;
            let strWhatlike=`<div class="whatLikeBox"><p>猜你喜欢</p><div class="whatLike clearfix">`;
            //猜你喜欢
            for(let i=0;i<6;i++){
                strWhatlike+=` <a href="https://www.taobao.com/" target="_blank">
                                <img src="img/zf_style${Math.floor(Math.random()*3)+1}.jpg" alt=""><p>猜你喜欢随机${Math.floor(Math.random()*6)+1}</p>
                            </a>`;
            }
            strWhatlike+=`</div></div>`;
            for(let xList in nameClass) {
                if (nameClass.hasOwnProperty(xList)) {
                    strContent += `<div> <p><a href="https://www.taobao.com/" target="_blank">${nameClass[xList][0]} </a><em><a href="https://www.taobao.com/" target="_blank">更多</a></em></p><span>`;
                    for (let i = 1; i < nameClass[xList].length; i++) {
                        strContent += `<a href="https://www.taobao.com/" target="_blank">${nameClass[xList][i]}</a>`;
                    }
                    strContent += `</span></div>`
                }
            }
            strContent += `</div>${strWhatlike}</div>`;

        })
        divL.innerHTML=strLi;
        divR_.innerHTML=strContent;
        divRList=divR_.querySelectorAll('.divR_item');

    };
    let hoverClass=function (i) {
        [].forEach.call(divRList,(item,index)=>{
            if(index===i){
                divR.style.display='block';
                divRList[i].style.display='block';
            }else{
                divRList[index].style.display='none';
            }
        })

    };
    let leaveClass=function () {
        divR.style.display='none';
        [].forEach.call(divRList,(item,index)=>{
            item.style.display='none';
        })

    };
    /**
     * 淘抢购部分
     * */
    let dabaiBuying=document.getElementById('dabaiBuying'),
         timeBox = dabaiBuying.querySelector('.countdown-wrapper'),
        turnBox=dabaiBuying.querySelector('.switch'),
        autoTimer = null,
        _serverTime = null;
    /*
   * 淘抢购：获得服务器时间
   * */
    let getTime=function () {
        if (_serverTime) {
            _serverTime = new Date(_serverTime.getTime() + 1000);
            return _serverTime;
        }

        return new Promise(resolve => {
            let xhr = new XMLHttpRequest();
            xhr.open('HEAD', 'json/dabai.json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 2) {
                    _serverTime = new Date(xhr.getResponseHeader('date'));

                    resolve(_serverTime);

                }
            };
            xhr.send(null);
        });
    };
    /*
    * 淘抢购：倒计时
    * */
    let computedTime=function () {
        let result= getTime();
        result instanceof Promise?result.then(fn):fn(result);
        function fn(result) {
            let endDate=new Date('2018-6-6 20:00'),
                diffDate=endDate-result;
            if(diffDate>=0){
                let hours = Math.floor(diffDate / (1000 * 60 * 60));
                diffDate = diffDate - hours * 3600000;
                let minutes = Math.floor(diffDate / (1000 * 60));
                diffDate = diffDate - minutes * 60000;
                let seconds = Math.floor(diffDate / 1000);

                hours < 10 ? hours = '0' + hours : null;
                minutes < 10 ? minutes = '0' + minutes : null;
                seconds < 10 ? seconds = '0' + seconds : null;
                timeBox.innerHTML = `<span class="hour">${hours}</span>:<span class="minutes">${minutes}</span>:<span class="seconds">${seconds}</span>`;
                return;
            }
            clearInterval(autoTimer);
            let liList=dabaiBuying.querySelectorAll('li'),
                liList_=[...liList];
            liList_.forEach((item,index)=>{
                let progress=item.querySelector('.progress'),
                    desc=item.querySelector('.desc');
                progress.style.visibility='visible';
                desc.style.visibility="visible";
            });

        }
    };

    /*
    * 淘抢购：获取淘抢购数据
    * */
    let queryHhgData=function () {
        return new Promise((resolve,reject)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('GET','json/daBai-hhg.json');
            xhr.onreadystatechange=()=>{
                if(xhr.readyState===4&&xhr.status===200){
                    resolve(JSON.parse(xhr.responseText));
                }
            };
            xhr.send(null);

        });

    };
    /*
    * 淘抢购：绑定淘抢购数据;换一换
    * */
    let hhdNum=0;
    let bindHhgData=function (data) {

        if(hhdNum===data.length)return;
        let ulBox=dabaiBuying.querySelector('ul'),
            str=``;
        for(let i=hhdNum;i<hhdNum+3;i++){
            let item=data[i];
           str+=`<li>
                    <a href="//qiang.taobao.com/?itemId=547184405097"  target="_blank">
                        <div class="img-wrapper">
                            <img src="${item.img}" alt="">
                        </div>
                        <div class="info">
                            <h4>${item.title}</h4>
                            <p class="title">${item.desc}</p>

                            <div class="progress" style="visibility: hidden">
                                <div class="progress-bar" style="width: 4%"></div>
                            </div>
                            <div class="desc" style="visibility: hidden">
                                <span class="percentage">${item.progress}</span>
                                <span class="letter">已抢${item.buyed}件</span>
                            </div>
                            <div class="extra">
                                <span class="yan">￥</span>
                                <span class="cur">${item.curPrice}</span>
                                <span class="price">￥${item.lastPrice}</span>
                            </div>
                        </div>
                    </a>
                </li>`;

        }
        console.log(str);
        ulBox.innerHTML=str;
        hhdNum+=3;
    };



    return{
        init:function () {
            let pro=queryData();
            pro.then(bindHTML).then(()=>{
                for(let i=0;i<liList.length;i++){
                    liList[i].addEventListener('mouseenter',function () {
                        hoverClass(i);
                    });
                }
            }).then(()=>{
                dabaiDiv.addEventListener('mouseleave',leaveClass);
            });
           /**
            * 淘抢购
            * **/
            computedTime();
            autoTimer=setInterval(computedTime,1000);
            let hhgPro=queryHhgData();
            hhgPro.then((result)=>{
                bindHhgData(result);
                let trun=dabaiBuying.querySelector('.switch');
                trun.addEventListener('click',()=>{
                    bindHhgData(result);
                })
            })

        }
    }
}();
dabaiFn.init();