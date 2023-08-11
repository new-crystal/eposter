"use strict"

import { nameList } from "./list.js";

const listContainer = document.querySelector("#listContainer")
const search = document.querySelector("#search")
const firstBox = document.querySelector("#first_box")
const secondBox = document.querySelector("#second_box")
const thirdBox = document.querySelector("#third_box")
const fourthBox = document.querySelector("#fourth_box")
const header = document.querySelector("#header")


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

/**리스트 쪼개기 */

async function divideList(list) {
    const blockList = [];
    list.map((li) => {
        blockList.push(`PO-${li.id}`);
    });

    const allList = document.querySelectorAll(".list");
    const allCopyList = [...allList];
    const sliceList = [];
    const restList = allCopyList.filter((li) => !blockList.some(resultLi => resultLi.slice(3) === li.id));
    blockList.map((block) => {
        allCopyList.map((copy) => copy.id === block.slice(3) && sliceList.push(copy));
    });

    // 검색 결과를 먼저 표시하도록 조정
    sliceList.map((slice) => {
        slice.style.display = "";
    });

    restList.map((rest) => (rest.style.display = "none"));
}

/**search 기능 */
search.addEventListener("input",(e)=>{
    const inputText = e.target.value.toLowerCase();
    const searchList = [];
    const allList = document.querySelectorAll(".list");
    firstBox.disabled = false;
    secondBox.disabled = false;
    thirdBox.disabled = false;
    fourthBox.disabled = false;

    allList.forEach((list)=>{
        nameList.map((name)=>{
            if(list.id === name.id){
                list.innerHTML = `<span class="number">PO-${name.id}</span> <p class="title">${name.title}</p> <p class="name">${name.name}</p>`;
            }
        })
    })

    if(inputText.length > 2){
        allList.forEach(element => {
            // element.parentNode.removeChild(element);
            element.style.display = "none"
        });

        const list = [];
        nameList.map((obj)=>{
            list.push(Object.values(obj))
        })
    
 
        list.filter((li)=>{
                    const l = li[0].concat(li[1]).concat(li[2]).concat(li[3])
                    if(l.includes("\n\n") && l.toLowerCase().includes(inputText)){
                        searchList.push(l.replace(/\n\n/g, " ").toLowerCase())   
                    }else if(!l.includes("\n\n") &&l.toLowerCase().includes(inputText)){
                        searchList.push(l.toLowerCase())  
                    }
        })
    }
        if(inputText === ""|| inputText.length <= 2 ){
            addEventListeners(nameList); 
            sliceList(nameList)(0, 20);
        }else{
            searching(searchList)
    }
})




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

    let resultList = [];
    const nonSearchList = [];

    searchList.forEach((search) => {
        list.forEach((li) => {
            const sliceSearch = search.slice(0, 2);
            if (li.id === sliceSearch) {
                resultList.push(li);
            }else{
                nonSearchList.push(li)
            }
        });
    });
    const uniqueArray = [...new Set(nonSearchList)];

    const nonResultList = uniqueArray.filter(li => !resultList.some(resultLi => resultLi.id === li.id));

    nonResultList.map((li)=>{
        li.innerHTML = `<span class="number">&nbsp;</span> <p class="title">&nbsp;</p> <p class="name">&nbsp;</p>`;
        li.style.display="";
    })

    if (searchList.length <= 20) {
        secondBox.disabled = true;
        thirdBox.disabled = true;
        fourthBox.disabled = true;
        secondBox.style.backgroundColor = "#D3D3D3";
        thirdBox.style.backgroundColor = "#D3D3D3";
        fourthBox.style.backgroundColor = "#D3D3D3";
    } else if (searchList.length <= 40) {
        thirdBox.disabled = true;
        fourthBox.disabled = true;
        thirdBox.style.backgroundColor = "#D3D3D3";
        fourthBox.style.backgroundColor = "#D3D3D3";
    } else if (searchList.length <= 60) {
        fourthBox.disabled = true;
        fourthBox.style.backgroundColor = "#D3D3D3";
    }

    const concatList = [...resultList, ...nonResultList]
    
    backgroundColor(concatList);
    addEventListeners(concatList);
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
         window.location.href = `/detail.html?number=PO-${number}`
    }else if(number === "listContainer" && innerNum !== ""){
        window.location.href = `/detail.html?number=PO-${innerNum}`
    }
})

function backgroundColor(listItems){
    listItems.forEach((item, index) => {
        if(index === 0){
           return item.style.backgroundColor = "#EAEDF3"; 
        }else if(index === 1){
            return item.style.backgroundColor = "#fff";
        }else if (index % 2 === 0) {
            return item.style.backgroundColor = "#EAEDF3"; 
        } else {
            return item.style.backgroundColor = "#fff";
        }
      });
}
