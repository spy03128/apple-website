(() => {
  let yOffset = 0; //window.pageYoffset 대신 사용할 변수
  let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된(보고있는) scene(scrollsection)

  const sceneInfo = [
    {
      //0
      type: "sticky",
      heightNum: 5, //브라우저높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
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

  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
    }

    //현재 스크롤값이 이전 섹션 스크롤 값의 합 + 현재 섹션 스크롤값 보다 크면
    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++; //현재 섹션 번호를 1 증가
    }

    //현재 스크롤값이 이전 섹션 스크롤 값의 합보다 작으면
    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return;
      currentScene--; //현재 섹션 번호를 1 감소
    }

    //setAttribute는 선택한 요소의 속상값을 정하는 것
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  }

  window.addEventListener("resize", setLayout); //윈도우 창을 줄였을때 레이아웃 재설정
  window.addEventListener("load", setLayout); //리소스가 다 로드 된다음 setLayout 함수 호출
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
})();
