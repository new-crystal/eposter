"use strict"

const clinicalList = JSON.parse(JSON.stringify(clinical));
const basicList = JSON.parse(JSON.stringify(basic));
const thyroidList = JSON.parse(JSON.stringify(thyroid));
const boneList = JSON.parse(JSON.stringify(bone));
const pituitaryList = JSON.parse(JSON.stringify(pituitary));
const clinical_PE_List = JSON.parse(JSON.stringify(clinical_pe));
const basic_PE_List = JSON.parse(JSON.stringify(basic_pe));
const thyroid_PE_List = JSON.parse(JSON.stringify(thyroid_pe));
const bone_PE_List = JSON.parse(JSON.stringify(bone_pe));
const pituitary_PE_List = JSON.parse(JSON.stringify(pituitary_pe));

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
const blue_go_first_box = document.querySelector("#blue_go_first_box")
const blue_pre_box = document.querySelector("#blue_pre_box")
const blue_next_box = document.querySelector("#blue_next_box")
const blue_go_last_box = document.querySelector("#blue_go_last_box")
const header = document.querySelector("#header")
const headerTitle = document.querySelector(".page_title")
const headerSubTitle = document.querySelector(".page_sub")
const goHomeBtn = document.querySelector(".go_home_btn")
const footerList = document.querySelectorAll(".footer_list")
const text_box = document.querySelectorAll(".text_box")
const name_box = document.querySelectorAll(".name_box")
const number_box = document.querySelectorAll(".number_box")

//mainList
let nameList;

//보여주는 리스트
let showList = []

//현재 페이지네이션 넘버
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

/**나머지 요소와 나머지 요소의 길이 */
let restElement;
let restLength;

blue_pre_box.addEventListener("click",()=>{ preBtnMove()})
blue_next_box.addEventListener("click", ()=>{ nextBtnMove()})
blue_go_first_box.addEventListener("click", ()=>{firstPageMove()})
blue_go_last_box.addEventListener("click", ()=> {lastPageMove()})

/**home button click event */
goHomeBtn.addEventListener("click",()=>{
    location.href= "index.html"
})

/**main list select */
function getList(){
    let title = new URLSearchParams(window.location.search).get("menu");
    let sub = new URLSearchParams(window.location.search).get("sub");
const titleList = [
    {title:"Diabetes/Obesity/Lipid(clinical)",sub:"PosterOral", list:clinicalList},
    {title:"Diabetes/Obesity/Lipid(clinical)",sub:"PosterExhibition", list:clinical_PE_List},
    {title:"Diabetes/Obesity/Lipid(basic)",sub:"PosterOral", list:basicList},
    {title:"Diabetes/Obesity/Lipid(basic)",sub:"PosterExhibition", list:basic_PE_List},
    {title:"Thyroid",sub:"PosterOral", list:thyroidList},
    {title:"Thyroid",sub:"PosterExhibition", list:thyroid_PE_List},
    {title:"Bone/Muscle",sub:"PosterOral", list:boneList},
    {title:"Bone/Muscle",sub:"PosterExhibition", list:bone_PE_List},
    {title:"Pituitary/Adrenal/Gonad",sub:"PosterOral", list:pituitaryList},
    {title:"Pituitary/Adrenal/Gonad",sub:"PosterExhibition", list:pituitary_PE_List},
]

titleList.map((titleObj)=>{
    if(titleObj.title === title && titleObj.sub === sub){
        nameList = titleObj.list;
    }
})
}


/**list page header */
function getHeaderTitle(){
    let title = new URLSearchParams(window.location.search).get("menu");
    let subTitle = new URLSearchParams(window.location.search).get("sub");

   if(title.includes("(")){
    title = title.split("(")[0] +` (`+ title.split("(")[1];
    }
    if(subTitle === "PosterOral"){
        subTitle = "Poster Oral"
    }else if(subTitle === "PosterExhibition"){
        subTitle = "Poster Exhibition"
    }

 headerTitle.innerText = title
 headerSubTitle.innerText = subTitle
}

/**헤더 새로고침 버튼 */
header.addEventListener("click",()=>{
    window.location.reload()
})

/**list에서 a태그로 집어넣기 */
function pushTitle(){
    nameList.map((name, i)=>{
        const titleList = document.createElement("a")
        titleList.className = "list";
        titleList.id = name.id
        titleList.dataset.id = i;
        titleList.innerHTML = `
        <div class="wrap" onclick="goDetailPage('${name.id}','${i}')">
            <div class="number_box">
            <span class="number">${name.id}</span>
            </div>
            <div class="text_box">
                <p class="title">${name.title}</p>
                <div class="name_box">
                    <p class="name">${name.name}</p>
                    <p class="name nation">${name.nation}</p>
                </div>
            </div>
        </div>`;
        listContainer.appendChild(titleList)
    })
}

/** 쪼개진 리스트 보여주기 */
function divideList(list) {
    const set = new Set(list)
    const uniqueList = [...set]
 
    const blockList = [];
    uniqueList.map((li) => {
        if (li.id === undefined) {
            return li.style.display = "";
        } else if (li.id !== undefined) {
            return blockList.push(li.id)
        }
    })

    const allList = document.querySelectorAll(".list")
    allList.forEach((a) => {
        const titleSplit = a.id
        a.style.display = blockList.includes(titleSplit) ? "" : "none";
    })

    if(uniqueList.length === 14){
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
    if(uniqueList.length === 0){
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

    if (uniqueList.length < 14 ) {
        restLength = 14 - uniqueList.length;
        if (restElement) {
            const rests = document.querySelectorAll(".restElement");
            rests.forEach((rest) => {
                if (rest.parentNode === listContainer) {
                     listContainer.removeChild(rest);      
                }
            });
            for (let i = 0; i < restLength; i++) {
                restElement = document.createElement("a");
                restElement.style.display = "block";
                restElement.style.width = "980px";
                restElement.style.margin = "0"
                restElement.className = "restElement"
                if ((uniqueList.length + i) % 2 === 0) {
                    restElement.style.backgroundColor = "#F2F5F8";
                } else {
                    restElement.style.backgroundColor = "#fff";
                }
                listContainer.appendChild(restElement); 
            }
        }else{
            for (let i = 0; i < restLength; i++) {
                restElement = document.createElement("a");
                restElement.style.display = "block";
                restElement.style.width = "980px";
                // restElement.style.height = "88px";
                restElement.style.margin = "0"
                restElement.className = "restElement"
                if ((uniqueList.length + i) % 2 === 0) {
                    restElement.style.backgroundColor = "#F2F5F8";
                } else {
                    restElement.style.backgroundColor = "#fff";
                }
                listContainer.appendChild(restElement);
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
                const l = li[0].concat("/").concat(li[1]).concat("/").concat(li[2]).concat("/").concat(li[3])
                if(l.toLowerCase().includes(inputText)){
                    searchList.push(l.toLowerCase())  
                }
    })

    if(inputText.length < 2 && inputText !== ""){
        addEventListeners(nameList); 
        sliceList(nameList)(0, 14);
    }
    else if(inputText === ""){
        addEventListeners(nameList); 
        sliceList(nameList)(0, 14);
        showListNum(searchList);
        updateBoxStyles("first_box")
        const listItems = document.querySelectorAll(".list");
        changeBackgroundColor(listItems)
        showListNumberAll()  
        blueArrowButton()  
    }
    else{
        searching(searchList)
        showListNum(searchList) 
        updateBoxStyles("first_box")
        showListNumberAll()  
        blueArrowButton() 
    }
})


/**리스트 쪼개기 */
function sliceList(list) {
    return (startIndex, endIndex) => {
        const sliced = list.slice(startIndex, endIndex);
        divideList(sliced);
    };
}


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
            showListNumberAll()
            blueArrowButton()
        });
    }

    boxInfo.forEach(({ element, start, end, boxId }) => {
        addClickListener(element, start, end, boxId);
    });
}

 /**footer pagination 10이상일 경우 추가 */
 function showListNumberAll(){
    footerList.forEach((footer)=>{
        const activeNumber = Number(nowActive);
        const footerNumber = Number(footer.dataset.id);
        if(listNumber > 10 && activeNumber === 6){
            if(footerNumber === 1){
                footer.style.display = "none";
            }else if(footerNumber === 11){
                footer.style.display = "";
            }
        }
        if(listNumber > 10 && activeNumber >= 7){
            if(footerNumber <= 1){
                footer.style.display = "none";
            }else if(footerNumber === 11 ){
                footer.style.display = "";
            }
        }
        // if(listNumber > 10 && activeNumber >= 8){
        //     if(footerNumber <= 3){
        //         footer.style.display = "none";
        //     }else if(footerNumber >= 11){
        //         footer.style.display = "";
        //     }
        // }
       
        if(listNumber > 10 && activeNumber < 6){
            if(footerNumber <= 3){
                footer.style.display = "";
            }else if(footerNumber >= 11){
                footer.style.display = "none";
            }
        }
    }) 
}


/**검색한 리스트 a 태그 리스트로  변환하기
 * searchList = 검색한 줄글 리스트
 * resultList = 검색 결과로 a 태그 리스트
*/
function searching(searchList) {

    const list = document.querySelectorAll(".list");
    
    let resultList = [];
    const searchIdList = searchList.map((search) => search.split("/")[0]);

    list.forEach((li) => {
        const lowID = li.id.toLocaleLowerCase()
        if(searchIdList.includes(lowID)){
            resultList.push(li);      
        }
        });
   

    showList = resultList;
    const listItemsDupArray = Array.from(resultList);
    const set = new Set(listItemsDupArray)
    const listItemsArray = [...set]

    listItemsArray.sort((a, b) => a.dataset.id - b.dataset.id);
    changeBackgroundColor(listItemsArray)
    addEventListeners(listItemsArray);
}


/**윈도우 로드시 
 * 1. 80개 목록 만들기 pushTitle()
 * 2. 자르기 -> sliceList()
 * 3. 뒷 배경 주기 -> backgroundColor()
 * 4. hover event
 */
window.onload = function loadWindow() {
    getList()
    getHeaderTitle()
    pushTitle();
    addEventListeners(nameList);
    sliceList(nameList)(0, 14);
    const listItems = document.querySelectorAll(".list");
    changeBackgroundColor(listItems)
    showListNum(nameList)
    updateBoxStyles("first_box")
    showList = nameList;
    blueArrowButton()

    /**mouse hover event! */
    listItems.forEach((listItem) => {
        listItem.addEventListener('mouseover', () => {
            // 글자색 및 배경색 변경
            const wrapItems = listItem.querySelectorAll(".wrap")
            wrapItems.forEach((item)=>{
                item.style.color = '#0086FE';
            })
            // name_box 내부 요소의 색상 변경
            const nameBoxItems = listItem.querySelectorAll('.name_box p');
            nameBoxItems.forEach((item) => {
                item.style.color = '#0086FE';
            });
        });
    
        listItem.addEventListener('mouseout', () => {
            // 글자색 및 배경색 복원
            const wrapItems = listItem.querySelectorAll(".wrap")
            wrapItems.forEach((item)=>{
                item.style.color = '#262629';
            })
            // name_box 내부 요소의 색상 복원
            const nameBoxItems = listItem.querySelectorAll('.name_box p');
            nameBoxItems.forEach((item) => {
                if(item.classList.value.includes("nation")){
                    item.style.color = "#8E8E9B";
                }else{
                    item.style.color = '#262629';
                }
            });
        });
    });

}


/**클릭 시 상세페이지로 이동 */

function goDetailPage(number, index){
    const menu = new URLSearchParams(window.location.search).get("menu");
 
     window.location.href = `detail.html?menu=${menu}&number=${number}&index=${index}`
}

/**배경색 주기
 * 짝수 -> "#EAEDF3"
 * 홀수 -> "#FFFFFF"
 */
function changeBackgroundColor(listItems){

    const listItemsDupArray = Array.from(listItems);
    const set = new Set(listItemsDupArray)
    const listItemsArray = [...set]

    listItemsArray.sort((a, b) => a.id - b.id);

    listItemsArray.forEach((item, index) => {
        if (index % 2 === 0) {
            item.style.backgroundColor = "#F2F5F8";
            item.childNodes[1].childNodes[1].style.backgroundColor = "#DBE8F6"
        } else {
          item.style.backgroundColor = "#FFF"; 
          item.childNodes[1].childNodes[1].style.backgroundColor = "#E8F2FE"
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
   }
   else{
    listNumber = Math.floor(listNum) + 1
   }
   

   footerList.forEach((footer)=>{
    if(listNumber < 10){
        if(Number(footer.dataset.id) <= Number(listNumber)){
         footer.style.display = "";
        }
        else{
         footer.style.display = "none"
        }
    }
    else if(listNumber > 10){
        if(Number(footer.dataset.id) > 10){
            footer.style.display = "none";
        }
        else if(Number(footer.dataset.id) <= 10){
            footer.style.display = "";
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
        nowActive = footer.previousElementSibling.dataset.id;
        showListNumberAll()
        blueArrowButton()
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
        nowActive = nextFooter.dataset.id
        showListNumberAll()
        blueArrowButton()
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
        nowActive = "1"
        showListNumberAll()
        blueArrowButton()
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
            nowActive = footer.dataset.id;
            showListNumberAll()
            blueArrowButton()
            sliceList(showList)(boxInfo[listNumber - 1].start, boxInfo[listNumber - 1].end);
        }else{
            footer.classList.remove("list_active")
        }
    })
}

/** 화살표 버튼 파란색으로 변경 */
function blueArrowButton(){
    console.log(listNumber)
    if(listNumber !== 1){
        if(Number(nowActive) !== 1){
            blue_pre_box.style.display= ""
            blue_go_first_box.style.display = ""
            go_first_box.style.display = "none"
            pre_box.style.display = "none"
        }
        if(Number(nowActive) === 1){
            pre_box.style.display = "";
            blue_pre_box.style.display = "none"
            go_first_box.style.display = ""
            blue_go_first_box.style.display = "none"

            next_box.style.display = "none"
            blue_next_box.style.display = "";
            go_last_box.style.display = "none";
            blue_go_last_box.style.display = ""
        }
    
        if(Number(nowActive) !== listNumber){
            next_box.style.display = "none"
            blue_next_box.style.display = "";
            go_last_box.style.display = "none";
            blue_go_last_box.style.display = ""

        }
        if(Number(nowActive) === listNumber){ 
            pre_box.style.display = "none";
            blue_pre_box.style.display = ""
            go_first_box.style.display = "none"
            blue_go_first_box.style.display = ""

            next_box.style.display = ""
            blue_next_box.style.display = "none";
            go_last_box.style.display = "";
            blue_go_last_box.style.display = "none"
        }
    }
    else if(listNumber === 1){
        pre_box.style.display = "";
        go_first_box.style.display = "";
        next_box.style.display = ""
        go_last_box.style.display = ""

        blue_pre_box.style.display = "none";
        blue_go_first_box.style.display = "none";
        blue_next_box.style.display = "none"
        blue_go_last_box.style.display = "none"
    } 
   
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

