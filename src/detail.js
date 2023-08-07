"use strict"

import {nameList} from "./list.js"

const numberText = document.querySelector("#number");
const imgBox = document.querySelector("#image");
const query =  window.location.search.split("=")[1].split("-")[1];
const goListBtn = document.querySelector(".view_list")
const preNumber = document.querySelector("#preNumber")
const nextNumber = document.querySelector("#nextNumber")
const preButton = document.querySelector(".preBtn")
const nextButton = document.querySelector(".nextBtn")
const nextImg = document.querySelector(".next")
const preImg = document.querySelector(".prev")
const posterImage = document.querySelector(".slide-animation")
const zoomBtn = document.querySelector(".zoom")
let currentNumber =  0;
let zoom = false;
let now = 0;
const imgList = []

goListBtn.addEventListener("click",()=>{
    window.location.href = "/"
})

function getNumber(){
    if(currentNumber === 1){
        numberText.innerText = `PO-0${currentNumber}`;
        nextNumber.innerText = `PO-0${currentNumber + 1}`;
        preImg.style.display = "none"
    }
    else if(1 < currentNumber && currentNumber < 10){
        numberText.innerText = `PO-0${currentNumber}`;
        preNumber.innerText = `PO-0${currentNumber - 1}`;
        nextNumber.innerText = `PO-0${currentNumber + 1}`;
        preImg.style.display = ""
        nextImg.style.display = ""
    }else if(currentNumber === 80){
        console.log("80")
        numberText.innerText = `PO-${currentNumber}`;
        preNumber.innerText = `PO-${currentNumber - 1}`;
        nextImg.style.display = "none"
    }else{
        numberText.innerText = `PO-${currentNumber}`;
        preNumber.innerText = `PO-${currentNumber - 1}`;
        nextNumber.innerText = `PO-${currentNumber + 1}`;
        preImg.style.display = ""
        nextImg.style.display = ""
    }
}

function getImage(){
    nameList.map((name, i)=>{
        if(i < 10){
            if(query === `0${i+1}`){
                setImage(name)
            }
        }else{
            if(query === i+1){
                setImage(name)
            }
        }
    })
}

function setImage(name) {
    while (imgBox.firstChild) {
      imgBox.removeChild(imgBox.firstChild);
    }
  
    if (name.img.length === 1) {
    } else {
      name.img.forEach((img) => {
        imgList.push(img);
      });
    
      posterImage.setAttribute("src", Object.values(imgList[now])[0]);
      posterImage.classList.add("slide-animation"); // slide-animation 클래스 추가
      imgBox.appendChild(posterImage);
      setImgBtn(posterImage);
    }
  }
  
  
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }
  
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
async function onPrevBtnClick(image) {
    now = now - 1;
    zoom = false;
    image.style.transform = "translateX(-100%)";
    await loadImage(Object.values(imgList[now])[0]); // 이미지 로드 기다림
    image.setAttribute("src", Object.values(imgList[now])[0]);
    image.style.transform = "translateX(100%)"; // 이동 방향 반대로 설정
    setTimeout(() => {
      image.style.transform = "translateX(0)"; // 이미지가 왼쪽에서 오른쪽으로 이동되면서 나타나도록 설정
    }, 0); // setTimeout을 0으로 설정하여 현재 이벤트 루프가 끝난 후에 애니메이션이 시작되도록 함
    setImgBtn(image);
  }
  
  async function onNextBtnClick(image) {
    now = now + 1;
    zoom = false;
    image.style.transform = "translateX(100%)";
    await loadImage(Object.values(imgList[now])[0]); // 이미지 로드 기다림
    image.setAttribute("src", Object.values(imgList[now])[0]);
    image.style.transform = "translateX(-100%)"; // 이동 방향 반대로 설정
    setTimeout(() => {
      image.style.transform = "translateX(0)"; // 이미지가 오른쪽에서 왼쪽으로 이동되면서 나타나도록 설정
    },0); // setTimeout을 0으로 설정하여 현재 이벤트 루프가 끝난 후에 애니메이션이 시작되도록 함
    setImgBtn(image);
  }
  
function addEventImgPreBtn(image) {
    const preBtn = document.querySelector(".img_pre_btn");
    preBtn.addEventListener("click", () => onPrevBtnClick(image)); 
}

function addEventImgNextBtn(image) {
    const nextBtn = document.querySelector(".img_next_btn");
    nextBtn.addEventListener("click", () => onNextBtnClick(image));
}

preButton.addEventListener("click", ()=>{
    window.location.href= `/detail.html?number=PO-0${currentNumber/1 - 1}`
})

nextButton.addEventListener("click", ()=>{
    window.location.href= `/detail.html?number=PO-0${currentNumber/1 + 1}`
})

zoomBtn.addEventListener("click",()=>{
    zoom = !zoom;
    if(zoom === false){
        zoomBtn.innerText = "+"
        posterImage.style.transform = "scale(1)"
    }else{
        zoomBtn.innerText = "-"
    }
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
    currentNumber = ( window.location.search.split("=")[1].split("-")[1] )* 1
    getNumber()
    getImage()
}
