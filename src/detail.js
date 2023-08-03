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
        setImgBtn()
        name.img.map((img, i)=>{
            imgList.push(img)
        })
        const image = document.createElement("img");
        image.setAttribute("src", Object.values(imgList[now])[now]);
        imgBox.appendChild(image)
    }
}

function setImgBtn(){
    const preBtnImage = document.createElement("img");
    const NextBtnImage = document.createElement("img");
    preBtnImage.setAttribute("src", "./assets/img_prev.svg")
    NextBtnImage.setAttribute("src", "./assets/img_next.svg")
    preBtnImage.className = "img_pre_btn";
    NextBtnImage.className = "img_next_btn" 
    const image = document.createElement("img");                    
    imgBox.appendChild(image)
    if(now === 0){
        imgBox.appendChild(NextBtnImage)
        addEventImgNextBtn(image)
    }else if(now === imgList.length - 1){
        imgBox.appendChild(preBtnImage)
        addEventImgPreBtn(image)
        imgBox.removeChild(NextBtnImage)
    }else{
        imgBox.appendChild(NextBtnImage)
        addEventImgNextBtn(image)
        imgBox.appendChild(preBtnImage)
        addEventImgPreBtn(image)
    }
}

function addEventImgPreBtn(image){
    const preBtn = document.querySelector(".img_pre_btn")
    preBtn.addEventListener("click",()=>{
        now = now - 1;  
        image.setAttribute("src", Object.values(imgList[now])[0]);
        setImgBtn()
    });
}

function addEventImgNextBtn(image){
    const nextBtn = document.querySelector(".img_next_btn")
    nextBtn.addEventListener("click", ()=> {
        now = now + 1;
        const image = document.createElement("img");
        image.setAttribute("src", Object.values(imgList[now])[0]);
        setImgBtn()
    })
}

window.onload = () =>{
    getNumber()
    getImage()
}