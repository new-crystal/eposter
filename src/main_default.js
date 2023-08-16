"use strict"

import { nameList } from "./list.js";

const listContainer = document.querySelector("#listContainer")
const search = document.querySelector("#search")
const firstBox = document.querySelector("#first_box")
const secondBox = document.querySelector("#second_box")
const thirdBox = document.querySelector("#third_box")
const fourthBox = document.querySelector("#fourth_box")
const header = document.querySelector("#header")
let restElement;
let restLength;

header.addEventListener("click",()=>{
    window.location.reload()
})

/**list에서 a태그로 집어넣기 */
function pushTitle(){
    nameList.map((name)=>{
        const titleList = document.createElement("a")
        titleList.className = "list";
        titleList.id = name.id
        titleList.innerHTML = `<span class="number">PO-${name.id}</span> <p class="title">${name.title}</p> <p class="name">${name.name}</p>`;
        listContainer.appendChild(titleList)
    })
}

/** 리스트 쪼개기 */
async function divideList(list) {
    // console.log(list)

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
    if (list.length < 20 && list.length !== 0) {
        restLength = 20 - list.length;

        for (let i = 0; i < restLength; i++) {
            restElement = document.createElement("a");
            restElement.style.display = "block";
            restElement.style.width = "980px";
            restElement.style.height = "70px";
            restElement.style.margin = "0"
            restElement.className = "restElement"
            if ((list.length + i) % 2 === 0) {
                restElement.style.backgroundColor = "#EAEDF3";
            } else {
                restElement.style.backgroundColor = "#fff";
            }
            listContainer.appendChild(restElement); // 리스트 컨테이너에 a 태그 추가
        }
    }
}

/**search 기능 */
search.addEventListener("input",(e)=>{
    let inputText = e.target.value.toLowerCase();

    if (restElement && restElement.parentNode === listContainer) {
        const rests = document.querySelectorAll(".restElement");
        rests.forEach((rest) => {
            rest.style.display = "none";
            listContainer.removeChild(rest);
        });
    }

    firstBox.disabled = false;
    secondBox.disabled = false;
    thirdBox.disabled = false;
    fourthBox.disabled = false;
    
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

  
    if(inputText === ""){
        addEventListeners(nameList); 
        sliceList(nameList)(0, 20);
    }else{
        searching(searchList)
     
}})


function sliceList(list) {

    return (startIndex, endIndex) => {
        const sliced = list.slice(startIndex, endIndex);
        divideList(sliced);
    };
}

function updateBoxStyles(list, activeBox) {

    [firstBox, secondBox, thirdBox, fourthBox].forEach((box, i) => {
        box.style.backgroundColor = "#fff";
        box.style.color = "#000";
        if(i === 0){firstBox.innerText = "Poster 1-20"}
        if(i === 1){secondBox.innerText = "Poster 21-40"}
        if(i === 2){thirdBox.innerText = "Poster 41-60"}
        if(i === 3){fourthBox.innerText = "Poster 61-80"}
    });

    activeBox.style.backgroundColor = "#0086FE";
    activeBox.style.color = "#FFF";

    if (list.length <= 20 && list.length >= 1) {
        secondBox.disabled = true;
        thirdBox.disabled = true;
        fourthBox.disabled = true;
        secondBox.style.backgroundColor = "#D3D3D3";
        thirdBox.style.backgroundColor = "#D3D3D3";
        fourthBox.style.backgroundColor = "#D3D3D3";
        firstBox.innerText = "Page 1-20"
        secondBox.innerText = ""
        thirdBox.innerText = ""
        fourthBox.innerText = ""
    } else if (list.length <= 40 && list.length > 21) {
        thirdBox.disabled = true;
        fourthBox.disabled = true;
        thirdBox.style.backgroundColor = "#D3D3D3";
        fourthBox.style.backgroundColor = "#D3D3D3";
        firstBox.innerText = "Page 1-20"
        secondBox.innerText = "Page 21-40"
        thirdBox.innerText = ""
        fourthBox.innerText = ""
    } else if (list.length <= 60 && list.length > 41) {
        fourthBox.disabled = true;
        fourthBox.style.backgroundColor = "#D3D3D3";
        firstBox.innerText = "Page 1-20"
        secondBox.innerText = "Page 21-40"
        thirdBox.innerText = "Page 41-60"
        fourthBox.innerText = ""
    }else if (list.length === 80){
        firstBox.disabled = false;
        secondBox.disabled = false;
        thirdBox.disabled = false;
        fourthBox.disabled = false;
    }
}

function addEventListeners(list) {
    const sliceListCallback = sliceList(list);

    sliceListCallback(0, 20);
    updateBoxStyles(list, firstBox);

    firstBox.addEventListener("click", () => {
        sliceListCallback(0, 20);
        updateBoxStyles(list, firstBox);
    });

    secondBox.addEventListener("click", () => { 
        sliceListCallback(20, 40);
        updateBoxStyles(list, secondBox);
    });

    thirdBox.addEventListener("click", () => {
        sliceListCallback(40, 60);
        updateBoxStyles(list, thirdBox);
    });

    fourthBox.addEventListener("click", () => {
        sliceListCallback(60, 80);
        updateBoxStyles(list, fourthBox);
    });
}

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
    backgroundColor(resultList)
    addEventListeners(resultList);
}



window.onload = function loadWindow() {
    pushTitle();
    addEventListeners(nameList);
    sliceList(nameList)(0, 20);
    const listItems = document.querySelectorAll(".list");

    backgroundColor(listItems)

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
    const number = e.target.parentNode.id
    const innerNum = e.target.id;

    if(number !== "listContainer" && innerNum === ""){
         window.location.href = `detail.html?number=PO-${number}`
    }else if(number === "listContainer" && innerNum !== ""){
        window.location.href = `detail.html?number=PO-${innerNum}`
    }
})

function backgroundColor(listItems){
    listItems.forEach((item, index) => {
        if (index % 2 === 0) {
          item.style.backgroundColor = "#EAEDF3"; 
        } else {
          item.style.backgroundColor = "#fff";
        }
      });
}
