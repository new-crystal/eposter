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
let currentNumber =  0;

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
    else if(1<currentNumber < 10){
        numberText.innerText = `PO-0${currentNumber}`;
        preNumber.innerText = `PO-0${currentNumber - 1}`;
        nextNumber.innerText = `PO-0${currentNumber + 1}`;
        preImg.style.display = ""
        nextImg.style.display = ""
    }else if(currentNumber === 80){
        numberText.innerText = `PO-0${currentNumber}`;
        preNumber.innerText = `PO-0${currentNumber - 1}`;
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
    if (name.img.length === 1) {
      const image = document.createElement("img");
      image.setAttribute("src", name.img[0].url1);
      image.classList.add("slide-animation"); // Add slide-animation class to the image
      imgBox.appendChild(image);
    } else {
      name.img.forEach((img) => {
        imgList.push(img);
      });
      const posterImage = document.createElement("img");
      posterImage.setAttribute("src", Object.values(imgList[now])[0]);
      posterImage.classList.add("slide-animation"); // Add slide-animation class to the image
      imgBox.appendChild(posterImage);
      console.log(posterImage);
      setImgBtn(posterImage);
    }
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
function onPrevBtnClick(image) {
  now = now - 1;
  image.style.transform = "translateX(-100%)"; // Slide animation to the left
  setTimeout(() => {
    image.setAttribute("src", Object.values(imgList[now])[0]);
    image.style.transform = "translateX(0)"; // Reset the transform after the image has changed
    setImgBtn(image);
  }, 300); // Wait for the transition to finish before changing the image
}

function onNextBtnClick(image) {
  now = now + 1;
  image.style.transform = "translateX(100%)"; // Slide animation to the right
  setTimeout(() => {
    image.setAttribute("src", Object.values(imgList[now])[0]);
    image.style.transform = "translateX(0)"; // Reset the transform after the image has changed
    setImgBtn(image);
  }, 300); // Wait for the transition to finish before changing the image
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

window.onload = () =>{
    currentNumber =  window.location.search.split("=")[1].split("-")[1] * 1
    getNumber()
    getImage()
}