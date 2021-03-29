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
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        // messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
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
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      //start ~ and 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
        console.log(currentYOffset - partScrollHeight);
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        const messageA_opacity_in = calcValues(
          values.messageA_opacity_in,
          currentYOffset
        );
        const messageA_opacity_out = calcValues(
          values.messageA_opacity_out,
          currentYOffset
        );
        const messageA_translateY_in = calcValues(
          values.messageA_translateY_in,
          currentYOffset
        );
        const messageA_translateY_out = calcValues(
          values.messageA_translateY_out,
          currentYOffset
        );

        if (scrollRatio <= 0.22) {
          //in
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else {
          //out
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        }

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
