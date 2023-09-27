"use strict"
const nameList = JSON.parse(JSON.stringify(data));

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
// const zoomBtn = document.querySelector(".zoom_button")
const header = document.querySelector("#header")
var pageNumber = 1;

header.addEventListener("click",()=>{
    window.location.reload()
})

let currentNumber =  0;
let zoom = false;
let now = 0;
const imgList = []

/**리스트 버튼 -> index 페이지로 이동 */
goListBtn.addEventListener("click",()=>{
    window.location.href = "index.html"
})

/**푸터 이동 버튼 눌렀을 경우*/
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


  /**이미지 양옆 이동 버튼 이벤트 */
function setImgBtn() {
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

    if (pageNum  === 1) {
        imgBox.appendChild(NextBtnImage);
        addEventImgNextBtn(image);
        imgBox.appendChild(preBtnImage);
        imgBox.removeChild(preBtnImage)
    } else if (pageNum === pdfDoc.numPages - 1) {
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
async function onPrevBtnClick() {
      if (pageNum <= 1) {
    return;
      }
  pageNum--;
  queueRenderPage(pageNum);

  }
  
  /**이미지 오른쪽 버튼 클릭 이벤트 */
  async function onNextBtnClick() {
    if (pageNum >= pdfDoc.numPages) {
        return;
      }
      pageNum++;
      queueRenderPage(pageNum);
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
    window.location.href= `detail.html?number=PO-0${currentNumber/1 - 1}`
})

nextButton.addEventListener("click", ()=>{
    window.location.href= `detail.html?number=PO-0${currentNumber/1 + 1}`
})

window.onload = () =>{
    currentNumber = ( window.location.search.split("=")[1].split("-")[1] )* 1
    getNumber()
    // getPage()
}

const url = "/assets/SICEM_2023_E-poster_230816.pdf"

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

var pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8,
    canvas = document.getElementById('the-canvas'),
    ctx = canvas.getContext('2d');

/**
 * Get page info from document, resize canvas accordingly, and render page.
 * @param num Page number.
 */
function renderPage(num) {
  pageRendering = true;
  // Using promise to fetch the page
  pdfDoc.getPage(num).then(function(page) {
    var scale = 1.5;
    
    var viewport = page.getViewport({scale: scale});
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    setImgBtn()
    // Wait for rendering to finish
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        // New page rendering is pending
        renderPage(pageNumPending);
        pageNumPending = null;
      
      }
    });
  });

}

/**
 * If another page rendering in progress, waits until the rendering is
 * finised. Otherwise, executes rendering immediately.
 */
function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  renderPage(pageNum);
});


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