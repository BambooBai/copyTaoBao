let bannerRender = (function () {
  // elements
  let container = document.querySelector(".banner-top");
  let wrapper = container.querySelector(".bn-wrapper");
  let focus = container.querySelector(".bn-focus");
  let arrowLeft = container.querySelector(".bn-arrowLeft");
  let arrowRight = container.querySelector(".bn-arrowRight");
  let slideList = null;
  let focusList = null;

  // query data
  let queryData = function () {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "../json/wg-banner.json");
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          // console.log(data);
          resolve(data);
        }
      };
      xhr.send(null);
    });
  };

  // bind HTML
  let bindHTML = function (data) {
    let strSlide = ``;
    let strFocus = ``;

    data.forEach((item, index) => {
      let {img, desc} = item;
      strSlide += `
      <div class="bn-slide">
        <img src="${img}" alt="${desc}">
      </div>
      `;
      strFocus += `<li class="${index === 0 ? 'active' : ''}"></li>`;

      wrapper.innerHTML = strSlide;
      focus.innerHTML = strFocus;

      slideList = wrapper.querySelectorAll(".bn-slide");
      focusList = focus.querySelectorAll("li");

      // console.log(wrapper);

      wrapper.appendChild(slideList[0].cloneNode(true));
      slideList = wrapper.querySelectorAll(".bn-slide");

      wgUtils.css(wrapper, "width", slideList.length * 520);
    });
  };

  // basic arguments
  let stepIndex = 0; // slide counter
  let autoTimer = null; // auto play timer
  let interval = 2500; // swift interval

  // auto play
  let autoMove = function () {
    stepIndex++;
    if (stepIndex >= slideList.length) {
      wgUtils.css(wrapper, "left", 0);
      stepIndex = 1;
    }
    animate(wrapper, {
      left: -stepIndex * 520
    }, 200);

    changeFocus();
  };

  // change focus
  let changeFocus = function () {
    let tempIndex = stepIndex;
    tempIndex === slideList.length - 1 ? tempIndex = 0 : null;
    [].forEach.call(focusList, (item, index) => {
      item.className = index === tempIndex ? "active" : "";
    });
  };

  // handle container
  let handleContainer = function () {
    container.onmouseenter = function () {
      clearInterval(autoTimer);
      arrowLeft.style.display = arrowRight.style.display = "block";
    };
    container.onmouseleave = function () {
      autoTimer = setInterval(autoMove, interval);
      arrowLeft.style.display = arrowRight.style.display = "none";
    };

    // click
    let queryIndex = function (ele) {
      let ary = [];
      let pre = ele.previousElementSibling;

      while (pre) {
        ary.unshift(pre);
        pre = pre.previousElementSibling;
      }
      return ary.length;
    };

    container.onclick = function (ev) {
      let target = ev.target;
      let tag = target.tagName;
      let par = target.parentNode;

      // focus click
      if (tag === "LI" && par.className.indexOf("bn-focus") > -1) {
        stepIndex = queryIndex(target);
        animate(wrapper, {
          left: -stepIndex * 520
        }, 200);
        changeFocus();
        return;
      }

      // arrow click
      if (tag === "A" && target.className.indexOf("bn-arrow") > -1) {
        // left arrow click
        if (target.className.indexOf("bn-arrowLeft") > -1) {
          stepIndex--;
          if (stepIndex < 0) {
            wgUtils.css(wrapper, "left", -(slideList.length-1)*520);
            stepIndex = slideList.length - 2;
          }
          animate(wrapper, {
            left: -stepIndex * 520
          }, 200);
          changeFocus();
          return;
        }

        // right arrow click
        autoMove();
      }
    };

  };




  return {
    init: function () {
      let promise = queryData();
      promise.then(bindHTML).then(() => {
        autoTimer = setInterval(autoMove, interval);
      }).then(() => {
        handleContainer();
      });
    }
  }
})();

bannerRender.init();