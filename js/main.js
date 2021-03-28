(() => {
  let yOffset = 0; //window.pageYoffset 대신 사용할 변수
  let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(보고있는) scene(scrollsection)
  let enterNewScene = false; //새로운 씬이 시작되는 순간 true

  const sceneInfo = [
    {
      //0
      type: "sticky",
      heightNum: 5, //브라우저높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        //dom 객체 요소
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        //값에 해당하는 요소
        messageA_opacity: [0, 1],
      },
    },
    {
      //1
      type: "nomal",
      heightNum: 5, //브라우저높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      //2
      type: "sticky",
      heightNum: 5, //브라우저높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      //3
      type: "sticky",
      heightNum: 5, //브라우저높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    //각 스크롤 section 의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //window.innerHeight : 브라우저 창 높이
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
    yOffset = window.pageYOffset;
    //현재 씬을 자동으로 세팅
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight = totalScrollHeight + sceneInfo[i].scrollHeight;
      //현재 y축 위치와 tatal높이를 비교해서 현재 창의 scene번호 지정

      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }

    //setAttribute는 선택한 요소의 속상값을 정하는 것
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  function calcValues(values, currentYOffset) {
    let rv;
    //현재 씬에서 스크롤된 범위를 비율로 구하기
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYOffset
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }

    //현재 스크롤값이 이전 섹션 스크롤 값의 합 + 현재 섹션 스크롤값 보다 크면
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++; //현재 섹션 번호를 1 증가
      //setAttribute는 선택한 요소의 속상값을 정하는 것
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    //현재 스크롤값이 이전 섹션 스크롤 값의 합보다 작으면
    if (yOffset < prevScrollHeight) {
      enterNewScene = true;

      if (currentScene === 0) return;
      currentScene--; //현재 섹션 번호를 1 감소
      //setAttribute는 선택한 요소의 속상값을 정하는 것
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (enterNewScene) return;

    playAnimation();
  }

  window.addEventListener("resize", setLayout); //윈도우 창을 줄였을때 레이아웃 재설정
  window.addEventListener("load", setLayout); //리소스가 다 로드 된다음 setLayout 함수 호출
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})();
