"use strict"

import {nameList} from "./list.js"

const numberText = document.querySelector("#number");
const imgBox = document.querySelector("#image");
const query =  window.location.search.split("=")[1].split("-")[1];
const goListBtn = document.querySelector(".view_list")

let now = 0;
const imgList = []

goListBtn.addEventListener("click",()=>{
    window.location.href = "/"
})

function getNumber(){
    numberText.innerText = window.location.search.split("=")[1]
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

function setImage(name){
    if(name.img.length === 1){
        const image = document.createElement("img");
         image.setAttribute("src",name.img[0].url1)
         imgBox.appendChild(image)
    }else{
        name.img.map((img)=>{
            imgList.push(img)
        })
        const posterImage = document.createElement("img");
        posterImage.setAttribute("src", Object.values(imgList[now])[0]);
        imgBox.appendChild(posterImage)
        console.log(posterImage)
        setImgBtn(posterImage)
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
    image.setAttribute("src", Object.values(imgList[now])[0]);
    setImgBtn(image);
}

function onNextBtnClick(image) {
    now = now + 1;
    image.setAttribute("src", Object.values(imgList[now])[0]);
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


window.onload = () =>{
    getNumber()
    getImage()
}