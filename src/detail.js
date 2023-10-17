"use strict"

const clinicalList = JSON.parse(JSON.stringify(clinical));
const basicList = JSON.parse(JSON.stringify(basic));
const thyroidList = JSON.parse(JSON.stringify(thyroid));
const boneList = JSON.parse(JSON.stringify(bone));
const pituitaryList = JSON.parse(JSON.stringify(pituitary));

const numberText = document.querySelector("#number");
const detailNumber = document.querySelector(".detail_number");
const detailTitle = document.querySelector(".detail_title");
const imgBox = document.querySelector("#image");
const query =  new URLSearchParams(window.location.search).get("number").split("-")[1]
const goListBtn = document.querySelector(".view_list")
const preNumber = document.querySelector("#preNumber")
const nextNumber = document.querySelector("#nextNumber")
const preButton = document.querySelector(".preBtn")
const nextButton = document.querySelector(".nextBtn")
const nextImg = document.querySelector(".next")
const preImg = document.querySelector(".prev")
const posterImage = document.querySelector(".slide-animation")
const zoomBtn = document.querySelector(".zoom_button")
const header = document.querySelector("#header")
const background_load = document.querySelector(".background_load")

header.addEventListener("click",()=>{
    window.location.reload()
})

posterImage.onload = ()=>{
    background_load.style.display = "none"
}

let nameList;
let currentNumber =  0;
let zoom = false;
let now = 0;
let current = "PO"
let POList = [];
let PEList = [];
let PPList = [];
const imgList = [];
const index = new URLSearchParams(window.location.search).get("index")
const numIndex = Number(index)

/**main list select */
function getList(){
    let title = new URLSearchParams(window.location.search).get("menu");
const titleList = [
    {title:"Diabetes/Obesity/Lipid(clinical)", list:clinicalList},
    {title:"Diabetes/Obesity/Lipid(basic)", list:basicList},
    {title:"Thyroid", list:thyroidList},
    {title:"Bone/Muscle", list:boneList},
    {title:"Pituitary/Adrenal/Gonad", list:pituitaryList},
]

titleList.map((titleObj)=>{
    if(titleObj.title === title){
        nameList = titleObj.list;
    }
})

}

/**리스트 버튼 -> index 페이지로 이동 */
goListBtn.addEventListener("click",()=>{
    const menu = new URLSearchParams(window.location.search).get("menu")
    window.location.href = `list.html?menu=${menu}`
})

/**푸터 이동 버튼 눌렀을 경우*/
function getNumber(){

    const last = nameList.length
    const number = new URLSearchParams(window.location.search).get("number")

    const formatPreNumber = () => {
        if (numIndex !== 0) {
            return nameList[numIndex - 1].id;
        } else {
            return "";
        }
    };
    
    const formatNextNumber = () => {
        if (numIndex + 1 < last) {
            return nameList[numIndex + 1].id;
        } else {
            return "";
        }
    };

    if (numIndex + 1 !== last) {

        const preImgDisplay = numIndex > 0 ? "" : "none";
        const nextImgDisplay = numIndex <= last ? "" : "none";

        detailNumber.innerText = number;
        detailTitle.innerText =  new URLSearchParams(window.location.search).get("menu");
        preNumber.innerText = formatPreNumber();
        nextNumber.innerText = formatNextNumber();

        preImg.style.display = preImgDisplay;
        nextImg.style.display = nextImgDisplay;
    } 
    else if (numIndex + 1 === last) {
        const preImgDisplay = numIndex > 0 ? "" : "none";

        detailNumber.innerText = number;
        detailTitle.innerText =  new URLSearchParams(window.location.search).get("menu");
        preNumber.innerText = formatPreNumber();

        preImg.style.display = preImgDisplay;
        nextImg.style.display = "none";
    }
}



/**전체 리스트에서 이미지 가져오기 */
function getImage(){
  
    nameList.map((name, i)=>{
        if(i === numIndex){
            setImage(name)
        }
    })
   
}

/**이미지의 src에 img 경로 넣어주기 */
function setImage(name) {

    while (imgBox.firstChild) {
      imgBox.removeChild(imgBox.firstChild);
    }
    background_load.style.display = ""

    if (name.img.length === 1) {
        posterImage.setAttribute("src", name.img[0].url1);
        imgBox.appendChild(posterImage);
    } else {
      name.img.forEach((img) => {
        imgList.push(img);
      });
      posterImage.setAttribute("src", Object.values(imgList[now])[0]);

            
      posterImage.onload = ()=>{
        background_load.style.display = "none"
    }
   
      imgBox.appendChild(posterImage);
      setImgBtn(posterImage);
    }
  }
  


  
  /**이미지 양옆 이동 버튼 이벤트 */
function setImgBtn(image) {
    // 기존 버튼들의 이벤트 리스너를 모두 제거
    const prevBtn = document.querySelector(".img_pre_btn");
    if (prevBtn) {
        prevBtn.removeEventListener("click", onPrevBtnClick);
        prevBtn.parentNode.removeChild(prevBtn);
    }

    const nextBtn = document.querySelector(".img_next_btn");
    if (nextBtn) {
        nextBtn.removeEventListener("click", onNextBtnClick);
        nextBtn.parentNode.removeChild(nextBtn);
    }

    // 새로운 버튼 추가
    const preBtnImage = document.createElement("img");
    const NextBtnImage = document.createElement("img");
    preBtnImage.setAttribute("src", "./assets/img_prev.svg");
    NextBtnImage.setAttribute("src", "./assets/img_next.svg");
    preBtnImage.className = "img_pre_btn";
    NextBtnImage.className = "img_next_btn";

    if (now === 0) {
        imgBox.appendChild(NextBtnImage);
        addEventImgNextBtn(image);
        imgBox.appendChild(preBtnImage);
        imgBox.removeChild(preBtnImage)
    } else if (now === imgList.length - 1) {
        imgBox.appendChild(preBtnImage);
        addEventImgPreBtn(image);
        imgBox.appendChild(NextBtnImage);
        imgBox.removeChild(NextBtnImage)
    } else {
        imgBox.appendChild(NextBtnImage);
        addEventImgNextBtn(image);
        imgBox.appendChild(preBtnImage);
        addEventImgPreBtn(image);
    }
}

/**이미지 왼쪽 버튼 클릭 이벤트 */
function onPrevBtnClick(image) {
    if(now > 0){
        now = now - 1;
        zoom = false;
        posterImage.style.display = "";
        image.setAttribute("src", Object.values(imgList[now])[0]); 
        setImgBtn(image);
    }
  }
  
  /**이미지 오른쪽 버튼 클릭 이벤트 */
function onNextBtnClick(image) {
    if(now <= imgList.length - 1){
        now = now + 1;
    }else{
        now = imgList.length - 1
    }
        zoom = false;
        posterImage.style.display = "";
        image.setAttribute("src", Object.values(imgList[now])[0]);
        setImgBtn(image);
  }
  

function addEventImgPreBtn(image) {
    if(now > 0){
        const preBtn = document.querySelector(".img_pre_btn");
        preBtn.addEventListener("click", () => onPrevBtnClick(image)); 
    }
}

document.addEventListener('keydown', function(event) {

    debounce(() => {
        if (event.key === 'ArrowLeft') {
            onPrevBtnClick(posterImage);
         } else if (event.key === 'ArrowRight') {
            onNextBtnClick(posterImage);
        }
     }, 500);
});

function addEventImgNextBtn(image) {
    if(now < imgList.length -1){
        const nextBtn = document.querySelector(".img_next_btn");
        nextBtn.addEventListener("click", () => onNextBtnClick(image));
    }
}


let debounceTimeout;

function debounce(func, delay) {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(func, delay);
}

//footer pre btn event
preButton.addEventListener("click", ()=>{
    const menu =  new URLSearchParams(window.location.search).get("menu");
    const preText = preNumber.innerText;
 
     window.location.href = `detail.html?menu=${menu}&number=${preText}&index=${numIndex - 1}`

})

//footer next btn event
nextButton.addEventListener("click", ()=>{
    const menu = new URLSearchParams(window.location.search).get("menu");
    const nextText = nextNumber.innerText;
   
    window.location.href = `detail.html?menu=${menu}&number=${nextText}&index=${numIndex + 1}`

})


imgBox.addEventListener("mouseover",()=>{
    if(zoom){
        posterImage.style.transform = "scale(1.5)"
    }
})

imgBox.addEventListener("mousemove", function (event) {
    if (zoom) {
        // 이미지 요소의 크기와 위치 정보 가져오기
        const imageRect = posterImage.getBoundingClientRect();
        const imageWidth = imageRect.width;
        const imageHeight = imageRect.height;
 
        // 이미지 요소 내에서의 마우스 커서의 상대적인 위치 계산
        const mouseX = event.clientX - imageRect.left;
        const mouseY = event.clientY - imageRect.top;

        // 마우스 커서의 위치를 기반으로 이미지 위치 계산
        let translateX = ((1 - mouseX / imageWidth) - 0.5) * 50;
        let translateY = ((1 - mouseY / imageHeight) - 0.5) * 50;

        // 이미지가 끝선을 넘어가지 않도록 제한
        translateX = Math.max(-50, Math.min(50, translateX));
        translateY = Math.max(-50, Math.min(50, translateY));

        // 이미지의 위치 조정
        posterImage.style.transform = `scale(2) translate(${translateX}%, ${translateY}%)`;
    }
});


window.onload = () =>{
    getList()
    currentNumber = new URLSearchParams(window.location.search).get("number");
    current = window.location.search.split("=")[2].split("-")[0]
    getNumber()
    getImage()
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