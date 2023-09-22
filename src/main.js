const nameList = JSON.parse(JSON.stringify(data));

const listContainer = document.querySelector("#listContainer")
const search = document.querySelector("#search")
const first_box = document.querySelector("#first_box")
const second_box = document.querySelector("#second_box")
const third_box = document.querySelector("#third_box")
const fourth_box = document.querySelector("#fourth_box")
const five_box = document.querySelector("#five_box")
const six_box = document.querySelector("#six_box")
const seven_box = document.querySelector("#seven_box")
const eight_box = document.querySelector("#eight_box")
const nine_box = document.querySelector("#nine_box")
const ten_box = document.querySelector("#ten_box")
const eleven_box = document.querySelector("#eleven_box")
const twelve_box = document.querySelector("#twelve_box")
const thirteen_box = document.querySelector("#thirteen_box")
const go_first_box = document.querySelector("#go_first_box")
const pre_box = document.querySelector("#pre_box")
const next_box = document.querySelector("#next_box")
const go_last_box = document.querySelector("#go_last_box")
const header = document.querySelector("#header")
const headerTitle = document.querySelector(".page_title")
const goHomeBtn = document.querySelector(".go_home_btn")
const footerList = document.querySelectorAll(".footer_list")
let showList = []
let nowActive;

const boxInfo = [
    { id:0, element: first_box, start: 0, end: 14, boxId: "first_box" },
    { id:1, element: second_box, start: 14, end: 28, boxId: "second_box" },
    { id:2,  element: third_box, start: 28, end: 42, boxId: "third_box" },
    { id:3,  element: fourth_box, start: 42, end: 56, boxId: "fourth_box" },
    { id:4,  element: five_box, start: 56, end: 70, boxId: "five_box" },
    { id:5,  element: six_box, start: 70, end: 84, boxId: "six_box" },
    { id:6,  element: seven_box, start: 84, end: 98, boxId: "seven_box" },
    { id:7,  element: eight_box, start: 98, end: 112, boxId: "eight_box" },
    { id:8,  element: nine_box, start: 112, end: 126, boxId: "nine_box" },
    { id:9,  element: ten_box, start: 126, end: 140, boxId: "ten_box" },
    { id:10,  element: eleven_box, start: 140, end: 154, boxId: "eleven_box" },
    { id:11,  element: twelve_box, start: 154, end: 168, boxId: "twelve_box" },
    { id:12,  element: thirteen_box, start: 168, end: 182, boxId: "thirteen_box" },
];


let restElement;
let restLength;

pre_box.addEventListener("click",()=>{preBtnMove()})
next_box.addEventListener("click", ()=>{nextBtnMove()})
go_first_box.addEventListener("click", ()=>{firstPageMove()})
go_last_box.addEventListener("click", ()=> {lastPageMove()})

/**home button click event */
goHomeBtn.addEventListener("click",()=>{
    location.href= "index.html"
})

/**list page header */
function getHeaderTitle(){
let title = window.location.search.split("=")[1]

 if(title.includes("(")){
    title = title.split("(")[0] +` (`+ title.split("(")[1];
}

 headerTitle.innerText = title
}

/**헤더 새로고침 버튼 */
header.addEventListener("click",()=>{
    window.location.reload()
})

/**list에서 a태그로 집어넣기 */
function pushTitle(){
    nameList.map((name)=>{
        const titleList = document.createElement("a")
        titleList.className = "list";
        titleList.id = name.id
        titleList.innerHTML = `
        <div class="wrap" onclick="goDetailPage('${name.id}')">
            <span class="number">PO-${name.id}</span>
            <div class="text_box">
                <p class="title">${name.title}</p>
                <div class="name_box">
                    <p class="name">${name.name}</p>
                    <p class="name">${name.affiliation}</p>
                    <p class="name">${name.nation}</p>
                </div>
            </div>
        </div>`;
        listContainer.appendChild(titleList)
    })
}

/** 쪼개진 리스트 보여주기 */
function divideList(list) {
    
    //  console.log(list)
 
    const blockList = [];
    list.map((li) => {
        if (li.id === undefined) {
            return li.style.display = "";
        } else if (li.id !== undefined) {
            return blockList.push(`PO-${li.id}`)
        }
    })

    const allList = document.querySelectorAll(".list")
    allList.forEach((a) => {
        const titleSplit = `PO-${a.id}`
        a.style.display = blockList.includes(titleSplit) ? "" : "none";
    })

    if(list.length === 14){
        if (restElement) {
            const rests = document.querySelectorAll(".restElement");
            rests.forEach((rest) => {
                // rest.style.display = "none";
                if (rest.parentNode === listContainer) {
                    listContainer.removeChild(rest);
                }
            });
        }
    } 
    if(list.length === 0){
        if (restElement) {
            const rests = document.querySelectorAll(".restElement");
            rests.forEach((rest) => {
                // rest.style.display = "none";
                if (rest.parentNode === listContainer) {
                        listContainer.removeChild(rest);      
                }
            });
        }else{
            for (let i = 0; i < 14; i++) {
                restElement = document.createElement("a");
                restElement.style.display = "block";
                restElement.style.width = "980px";
                // restElement.style.height = "88px";
                restElement.style.margin = "0"
                restElement.className = "restElement"
                if ((list.length + i) % 2 === 0) {
                    restElement.style.backgroundColor = "#F2F5F8";
                } else {
                    restElement.style.backgroundColor = "#fff";
                }
                listContainer.appendChild(restElement); // 리스트 컨테이너에 a 태그 추가
            }
        }
    }

    if (list.length < 14 ) {
        restLength = 14 - list.length;
        if (restElement) {
            const rests = document.querySelectorAll(".restElement");
            rests.forEach((rest) => {
                // rest.style.display = "none";
                if (rest.parentNode === listContainer) {
                        listContainer.removeChild(rest);      
                }
            });
            for (let i = 0; i < restLength; i++) {
                restElement = document.createElement("a");
                restElement.style.display = "block";
                restElement.style.width = "980px";
                // restElement.style.height = "88px";
                restElement.style.margin = "0"
                restElement.className = "restElement"
                if ((list.length + i) % 2 === 0) {
                    restElement.style.backgroundColor = "#F2F5F8";
                } else {
                    restElement.style.backgroundColor = "#fff";
                }
                listContainer.appendChild(restElement); // 리스트 컨테이너에 a 태그 추가
            }
        }else{
            for (let i = 0; i < restLength; i++) {
                restElement = document.createElement("a");
                restElement.style.display = "block";
                restElement.style.width = "980px";
                // restElement.style.height = "88px";
                restElement.style.margin = "0"
                restElement.className = "restElement"
                if ((list.length + i) % 2 === 0) {
                    restElement.style.backgroundColor = "#F2F5F8";
                } else {
                    restElement.style.backgroundColor = "#fff";
                }
                listContainer.appendChild(restElement); // 리스트 컨테이너에 a 태그 추가
            }
        }
    }
}

/**search 기능 */
search.addEventListener("input",(e)=>{
    let inputText = e.target.value.toLowerCase();

    if (restElement) {
        const rests = document.querySelectorAll(".restElement");
        rests.forEach((rest) => {
            if (rest.parentNode === listContainer) {
                listContainer.removeChild(rest);
            }
        });
    }

    const list = [];
    nameList.map((obj)=>{
        list.push(Object.values(obj))
    })

    const searchList = [];
    list.filter((li)=>{
                const l = li[0].concat(li[1]).concat(li[2]).concat(li[3])
                if(l.includes("\n\n") && l.toLowerCase().includes(inputText)){
                    searchList.push(l.replace(/\n\n/g, " ").toLowerCase())   
                }else if(!l.includes("\n\n") &&l.toLowerCase().includes(inputText)){
                    searchList.push(l.toLowerCase())  
                }
    })

    // console.log(searchList)
    if(inputText === ""){
        addEventListeners(nameList); 
        sliceList(nameList)(0, 14);
    }else{
        searching(searchList)
        showListNum(searchList)      
}})


/**리스트 쪼개기 */
function sliceList(list) {

    return (startIndex, endIndex) => {
        const sliced = list.slice(startIndex, endIndex);
        divideList(sliced);
    };
}
let menuNumber;

/**탭 스타일 바꾸기 */
function updateBoxStyles(activeBox) {
    footerList.forEach((footer)=>{
        if(footer.id === activeBox){
            nowActive = footer.dataset.id;
            footer.classList.add("list_active")
        }else{
            footer.classList.remove("list_active")
        }
    })
}

/**탭 이벤트 리스너 */
function addEventListeners(list) {
    const sliceListCallback = sliceList(list);
 
    sliceListCallback(boxInfo[0].start, boxInfo[0].end);
   
    function addClickListener(element, start, end, boxId) {
        element.addEventListener("click", () => {
            sliceListCallback(start, end);
            updateBoxStyles(boxId);

            /**footer pagination 10이상일 경우 추가 */
            footerList.forEach((footer)=>{
                if(listNumber > 10 && nowActive === "6"){
                    if(footer.dataset.id === 1){
                        footer.style.display = "none";
                    }else if(footer.dataset.id === 11){
                        footer.style.display = "";
                    }
                }
                if(listNumber > 10 && nowActive === "7"){
                    if(footer.dataset.id === 2){
                        footer.style.display = "none";
                    }else if(footer.dataset.id === 12){
                        footer.style.display = "";
                    }
                }
                if(listNumber > 10 && nowActive === "8"){
                    if(footer.dataset.id === 3){
                        footer.style.display = "none";
                    }else if(footer.dataset.id === 13){
                        footer.style.display = "";
                    }
                }
            })
           
        });
    }


    boxInfo.forEach(({ element, start, end, boxId }) => {
        addClickListener(element, start, end, boxId);
    });
}


/**검색한 리스트 a 태그 리스트로  변환하기
 * searchList = 검색한 줄글 리스트
 * resultList = 검색 결과로 a 태그 리스트
*/
function searching(searchList) {

    const list = document.querySelectorAll(".list");

    let resultList = [];

    searchList.map((search) => {
        list.forEach((li) => {
            const sliceSearch = search.slice(0,2)
            if (li.innerText.includes(sliceSearch)) {
                resultList.push(li);
            }
        });
    });
    showList = resultList;

    backgroundColor(resultList)
    addEventListeners(resultList);
}


/**윈도우 로드시 
 * 1. 80개 목록 만들기 pushTitle()
 * 2. 자르기 -> sliceList()
 * 3. 뒷 배경 주기 -> backgroundColor()
 * 4. hover event
 */
window.onload = function loadWindow() {
    pushTitle();
    addEventListeners(nameList);
    sliceList(nameList)(0, 14);
    const listItems = document.querySelectorAll(".list");
    getHeaderTitle()
    backgroundColor(listItems)
    showListNum(nameList)
    updateBoxStyles("first_box")
    showList = nameList;

listItems.forEach((list)=>{
    list.addEventListener("mouseover",(e)=>{

        if(e.target.className === "list"){
            e.target.style.color = "#0086FE";
        }else if(e.target.className === "number"){
            e.target.style.color = "#0086FE";
            e.target.parentNode.parentNode.style.color = "#0086FE";
        }else if(e.target.className === "title"){
            e.target.style.color = "#0086FE";
            e.target.nextElementSibling.style.color = "#0086FE";
            e.target.parentNode.previousElementSibling.style.color = "#0086FE";
        }else if(e.target.className === "name"){
            e.target.style.color = "#0086FE";
            e.target.previousElementSibling.style.color = "#0086FE";
            e.target.parentNode.previousElementSibling.style.color = "#0086FE";
        }else if(e.target.className === "wrap"){
            e.target.style.color = "#0086FE";
            e.target.parentNode.style.color = "#0086FE";
        }
    })
    list.addEventListener("mouseout",(e)=>{
        if(e.target.className === "list"){
            e.target.style.color = "#414042";
        }else if(e.target.className === "number"){
            e.target.style.color = "#414042";
            e.target.parentNode.parentNode.style.color = "#414042";
        }else if(e.target.className === "title"){
            e.target.style.color = "#414042";
            e.target.nextElementSibling.style.color = "#414042";
            e.target.parentNode.previousElementSibling.style.color = "#414042";
        }else if(e.target.className === "name"){
            e.target.style.color = "#414042";
            e.target.previousElementSibling.style.color = "#414042";
            e.target.parentNode.previousElementSibling.style.color = "#414042";
        }else if(e.target.className === "wrap"){
            e.target.style.color = "#414042";
            e.target.parentNode.style.color = "#414042";
        }
        else{
            e.target.parentNode.parentNode.style.color = "#414042";
        }
    })
})
};

/**클릭 시 상세페이지로 이동 */

function goDetailPage(number){
    const menu = new URLSearchParams(window.location.search).get("menu");
    window.location.href = `detail.html?menu=${menu}&number=PO-${number}`
}

/**배경색 주기
 * 짝수 -> "#EAEDF3"
 * 홀수 -> "#FFFFFF"
 */
function backgroundColor(listItems){
    listItems.forEach((item, index) => {
        if (index % 2 === 0) {
          item.style.backgroundColor = "#F2F5F8"; 
        } else {
          item.style.backgroundColor = "#fff";
        }
      });
}

let listNumber = 0;
/**하단 숫자 리스트 보여주는 함수 */
function showListNum(list){
   const listNum = list.length / 14;
   const restNum = list.length % 14;

   if(restNum === 0){
    listNumber = listNum
   }else{
    listNumber = Math.floor(listNum) + 1
   }


   footerList.forEach((footer)=>{
    if(listNum < 10){
        if(footer.dataset.id <= listNumber){
         footer.style.display = "";
        }
        else{
         footer.style.display = "none"
        }
    }
    else if(listNum > 10){
        if(footer.dataset.id > 10){
            footer.style.display = "none";
        }
    }
   })
}

/**이전으로 버튼 */
function preBtnMove(){
  footerList.forEach((footer)=>{
    if(footer.classList.value.includes("list_active") && footer.id !== "first_box"){
        footer.previousElementSibling.classList.add("list_active")
        footer.classList.remove("list_active")

        boxInfo.map((box)=>{
           if( box.boxId === footer.id ){
            const preId = box.id - 1;
            if(preId > 0){
                sliceList(showList)(boxInfo[preId].start, boxInfo[preId].end)
            }
           }
        })
    }
  })
}

/**다음으로 버튼 */
function nextBtnMove() {
    const activeFooter = document.querySelector(".list_active"); 
  
    if (activeFooter) {
      const nextFooter = activeFooter.nextElementSibling; 

      if (nextFooter && nextFooter.dataset.id <= listNumber) {
        activeFooter.classList.remove("list_active");
        nextFooter.classList.add("list_active");

        const activeBoxInfo = boxInfo.find((box) => box.boxId === activeFooter.id);
  
        if (activeBoxInfo) {
          const nextBoxInfo = boxInfo.find((box) => box.id === activeBoxInfo.id + 1);
          if (nextBoxInfo) {
            sliceList(showList)(nextBoxInfo.start, nextBoxInfo.end);
          }
        }
      }
    }
  }

  /** 처음으로 버튼 */
  function firstPageMove(){
    footerList.forEach((footer)=>{
        first_box.classList.add("list_active")
        if(footer.id !== "first_box"){
            footer.classList.remove("list_active")
            sliceList(showList)(0, 14)
        }
    })
  }
  
/**마지막으로 버튼 */  
function lastPageMove(){

    footerList.forEach((footer)=>{
        if(footer.dataset.id/1 === listNumber){
            footer.classList.add("list_active")
            sliceList(showList)(boxInfo[listNumber - 1].start, boxInfo[listNumber - 1].end);
        }else{
            footer.classList.remove("list_active")
        }
    })
}

    /**우클릭 방지 */
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    }, false);

          /**확대 축소 방지 */
          document.body.addEventListener('touchstart', function(e) {
            if ( (e.touches.length > 1) || e.targetTouches.length > 1) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            }
          }, {passive: false});


           // 텍스트를 길게 터치할 때 복사 이벤트를 막습니다.
 document.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // 기본 동작을 막습니다.
});

// 선택을 방지합니다.
document.addEventListener("selectstart", function (event) {
    event.preventDefault(); // 선택을 방지합니다.
});

