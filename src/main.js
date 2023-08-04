"user strict"
import {nameList} from "./list.js"

const listContainer = document.querySelector("#listContainer")
const search = document.querySelector("#search")
const firstBox = document.querySelector("#first_box")
const secondBox = document.querySelector("#second_box")
const thirdBox = document.querySelector("#third_box")
const fourthBox = document.querySelector("#fourth_box")


/**list에서 a태그로 집어넣기 */
function pushTitle(){
    nameList.map((name, i)=>{
        const titleList = document.createElement("a")
        titleList.className = "list";
        if(i < 9){
            titleList.innerHTML = `<span class="number">PO-0${i+1}</span> <p class="title">${name.title}</p> <p class="name">${name.name}</p>`;
        }else{
            titleList.innerHTML = `<span class="number">PO-${i+1}</span> <p class="title">${name.title}</p> <p class="name">${name.name}</p>`;
        }
       
        listContainer.appendChild(titleList)
    })
}

/**리스트 쪼개기 */
function divideList(list){
    const titleSet = new Set(list.map((li) => 
    {   if(li.id !== undefined && li.innerText === undefined){
           return `PO-${li.id}`;
         }else if(li.innerText !== undefined){
            return li.innerText.split(" ")[0];
         }else{
            if(li.includes("\n")){
               const newLi = li.replace(/\n\n/g, " ")
                return newLi.split(" ")[0];
            }else{
                return li.split(" ")[0];
            }
         }
    }))
    
    const allList = document.querySelectorAll(".list")
        allList.forEach((a) => {
        const innerHTML = a.innerText;
        let titleSplit = innerHTML.split(" ")[0]
        a.style.display = titleSet.has(titleSplit) ? "" : "none";
})}


/**search 기능 */
search.addEventListener("input",(e)=>{
    let inputText = e.target.value.toLowerCase();
    if(inputText === ""){
        inputText = "-"
    }
    const titles = document.querySelectorAll(".list")
    const list = [];
    titles.forEach((title)=>{
        list.push(title.innerText)
    })
    const searchList = [];
    list.filter((l)=>{
        if(l.includes("\n\n") && l.includes(inputText)){
            searchList.push(l.replace(/\n\n/g, " ").toLowerCase())   
        }else if(!l.includes("\n\n") &&l.includes(inputText)){
            l.includes(inputText) && searchList.push(l.toLowerCase())  
        }
    })

    if(searchList.length === 0){
        searching(list)
    }else{
        searching(searchList)
     
}})


function sliceList(list) {
    return (startIndex, endIndex) => {
        const sliced = list.slice(startIndex, endIndex);
        divideList(sliced);
    };
}

function addEventListeners(list) {
    
    const sliceListCallback = sliceList(list);

    sliceListCallback(0, 20);
    updateActiveBox(firstBox);

    firstBox.addEventListener("click", () => {
        sliceListCallback(0, 20);
        updateActiveBox(firstBox);
    });

    secondBox.addEventListener("click", () => {
        sliceListCallback(20, 40);
        updateActiveBox(secondBox);
    });

    thirdBox.addEventListener("click", () => {
        sliceListCallback(40, 60);
        updateActiveBox(thirdBox);
    });

    fourthBox.addEventListener("click", () => {
        sliceListCallback(60, 80);
        updateActiveBox(fourthBox);
    });
}

function updateActiveBox(activeBox) {
    [firstBox, secondBox, thirdBox, fourthBox].forEach((box) => {
        box.style.backgroundColor = "#fff";
        box.style.color = "#000";
    });

    activeBox.style.backgroundColor = "#0086FE";
    activeBox.style.color = "#FFF";
}

function searching(searchList) {

    const list = document.querySelectorAll(".list");
    list.forEach((li) => {
        li.style.display = "none";
    });
    let resultList = [];

    searchList.map((search) => {
        list.forEach((li) => {
            if (li.innerText.toLowerCase() === search) {
                resultList.push(li);
            }
        });
    });
    resultList.forEach((item, index) => {
        if (index % 2 === 0) {
          item.style.backgroundColor = "#EAEDF3"; 
        } else {
          item.style.backgroundColor = "#fff";
        }
      });
      if(resultList.length === 0){
          addEventListeners(searchList); // 검색 결과에 이벤트 추가
      }else{
        addEventListeners(resultList); // 검색 결과에 이벤트 추가

      }
}



window.onload = () => {
    pushTitle();
    addEventListeners(nameList); // 각 박스에 이벤트 추가하면서 nameList 전달
    sliceList(nameList)(0, 20); // 페이지 로드시 첫번째 슬라이스 호출
    const listItems = document.querySelectorAll(".list");

listItems.forEach((item, index) => {
  if (index % 2 === 0) {
    item.style.backgroundColor = "#EAEDF3"; 
  } else {
    item.style.backgroundColor = "#fff";
  }
});

listItems.forEach((list)=>{
    list.addEventListener("mouseover",(e)=>{
        if(e.target.className === "list"){
            e.target.style.color = "#0086FE";
        }else if(e.target.className === "number"){
            e.target.parentNode.style.color = "#0086FE";
        }else if(e.target.className === "title"){
            e.target.parentNode.style.color = "#0086FE";
        }else if(e.target.className === "name"){
            e.target.parentNode.style.color = "#0086FE";
        }
    })
    list.addEventListener("mouseout",(e)=>{
        if(e.target.className === "list"){
            e.target.style.color = "#414042";
        }else{
            e.target.parentNode.style.color = "#414042";
        }
    })
})
};

listContainer.addEventListener("click",(e)=>{
    const number = e.target.parentNode.innerText.split("\n")[0]
     window.location.href = `/detail.html?number=${number}`
})
