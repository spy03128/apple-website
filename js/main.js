(() => {

  let yOffset = 0; //window.pageYoffset 대신 사용할 변수


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
  }

  function scrollLoop(){
     
  }

  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () =>{
    yOffset = window.pageYOffset;
    scrollLoop();
  }));


  setLayout();
})();
