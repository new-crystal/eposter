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
        titleList.innerHTML = `<span class="number">PO-${i+1}</span> <p class="title">${name.title}</p> <p class="name">${name.name}</p>`;
        listContainer.appendChild(titleList)
    })
}

/**리스트 쪼개기 */
function divideList(list){
    console.log(list)
    const titleSet = new Set(list.map((li) => li.title !== ""? `${li.title} ${li.name}` : forList(list) ));
    const allList = document.querySelectorAll(".list")
        allList.forEach((a, i) => {
             // 요소 내용 가져오기
        const innerHTML = a.innerText;
        // 타이틀 추출
        const title = innerHTML.split(`-${i+1} `)[1];
            a.style.display = titleSet.has(title) ? "" : "none";
})}

function forList(list){
    for(let i = 0; i >= list.length; i++){
        console.log(list[i].innerText.split(`-${i+1} `)[0].split("\n")[2])
        return list[i].innerText.split(`-${i+1} `)[0].split("\n")[2];
    }
}

/**search 기능 */
search.addEventListener("input",(e)=>{
    const inputText = e.target.value;
    const titles = document.querySelectorAll(".list")
    const list = [];
    titles.forEach((title)=>{
        list.push(title.innerText)
    })
    const searchList = [];
    list.filter((l)=>{
        if(l.includes("\n\n") && l.includes(inputText)){
            searchList.push(l.replace(/\n\n/g, " "))   
        }else{
            l.includes(inputText) && searchList.push(l)  
        }
    })
    searchList.map((search)=>{
        search.replace(/\n/g, " ")
    })
    searching(searchList)

    if(inputText === ""){
        addEventListeners(nameList)
        sliceList(nameList)(0, 20);
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
    list.forEach((li) => {
        li.style.display = "none";
    });
    const resultList = [];

    searchList.map((search) => {
        list.forEach((li) => {
            if (li.innerText === search) {
                li.style.display = "";
                resultList.push(li);
            }
        });
    });
    addEventListeners(resultList); // 검색 결과에 이벤트 추가
}

window.onload = () => {
    pushTitle();
    addEventListeners(nameList); // 각 박스에 이벤트 추가하면서 nameList 전달
    sliceList(nameList)(0, 20); // 페이지 로드시 첫번째 슬라이스 호출
};
