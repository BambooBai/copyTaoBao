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
        }
    }
}();
dabaiFn.init();