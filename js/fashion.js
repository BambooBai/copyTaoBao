/**
 * @autor: Eva
 * @Created by Eva on 2018/6/3.
 */
let fashionRender = (function () {
    let fashion = document.getElementById('fashion'),
        listWrap = document.getElementById('list'),
        tbWrapper = fashion.getElementsByClassName('tb-tanx-wrapper')[0];

    let getData = function () {
        return new Promise(resolve => {
            let xhr = new XMLHttpRequest;
            xhr.open('get', 'json/fashion.json', false);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send(null);
        })
    };

    let bindHTML = function (data) {
        let str1 = ``, str2 = ``,
            {imgSrc, list} = data;

        list.forEach(item => {
            let {title, desc, pic1, pic2} = item;
            str1 += `  <li class="item">
                        <div class="info">
                            <h4>${title}</h4>
                            <p class="subtitle">${desc}</p>
                        </div>
                        <div class="img-wrapper-outer">
                            <div class="img-wrapper-outer">
                                <a href="javascript:;" class="fl item-wrapper"><img src="${pic1}" alt=""></a>
                                <a href="javascript:;" class="fl item-wrapper second"><img src="${pic2}" alt=""></a>
                            </div>
                        </div>
                    </li>`;
        });
        str2 = `<img src="${imgSrc}" alt="">`;

        listWrap.innerHTML = str1;
        tbWrapper.innerHTML = str2;

        console.log(str1, str2);

    };
    return {
        init: function () {
            let promise = getData();
            promise.then(bindHTML)

        }
    }
})();
fashionRender.init();