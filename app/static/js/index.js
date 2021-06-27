import upload from './api.js'
import {render, renderChessBoard} from './renderer.js'
import {scalePoint} from './utils.js';

let data = [];
let chessBoardData = {};
let pos = 0;
let currentImageURL = '';

function renderObjects(pos)
{
    let renderDOM = document.getElementById('single-object-renderer');
    renderDOM.innerHTML = '';

    let width = renderDOM.offsetWidth;
    if (width > 700)
        width = 700;

    let infoElement = document.createElement('h5');
    renderDOM.appendChild(infoElement);

    let numOfObjects = data.length;
    infoElement.innerHTML = pos + "/" + numOfObjects;

    render(renderDOM, data[pos - 1].name, width, width);
}

function simulateChessBoard()
{
    if (chessBoardData.isDetected == 'ok')
    {
        let renderDOM = document.getElementById('chessboard-renderer');
        renderDOM.innerHTML = '';
        let infoElement = document.createElement('h5');
        infoElement.innerHTML = "Chessboard Simulate";
        renderDOM.append(infoElement);

        let width = renderDOM.offsetWidth;
        if (width > 700)
            width = 700;

        renderChessBoard(renderDOM, width, height, chessBoardData.positions);
    }
    else
    {
        console.log("Cannot detect chessboard to simulate!");
    }
}

function displayImg(event) {
    let input = document.getElementById('file-input');
    const file = input.files[0]
    if (file) {
        let imgElement = document.createElement('img');
        currentImageURL = URL.createObjectURL(file);
        imgElement.src = currentImageURL;
        imgElement.style = `
            max-width: 100%;
            max-height: 100%;
            margin-top: 10px;
        `
        document.getElementById('image-viewer').innerHTML = ''
        document.getElementById('image-viewer').appendChild(imgElement);
    }
}

function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

function switchObject(pos)
{
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    const image = new Image();

    let index = pos - 1;

    function drawImageRectangle() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetWidth / this.naturalWidth * this.naturalHeight;
      
        context.drawImage(this, 0, 0, canvas.width, canvas.height);

        let _data = data[index];
        let [xmin, ymin, xmax, ymax] = [_data.xmin, _data.ymin, _data.xmax, _data.ymax];
        [xmin, ymin] = scalePoint(xmin, ymin, canvas.width, canvas.height, this.naturalWidth, this.naturalHeight);
        [xmax, ymax] = scalePoint(xmax, ymax, canvas.width, canvas.height, this.naturalWidth, this.naturalHeight);

        context.beginPath();
        context.rect(xmin, ymin, xmax - xmin, ymax - ymin);
        context.stroke();
    
      }
    
    image.onload = drawImageRectangle;
    image.src = currentImageURL;

    renderObjects(pos);
}

function imgUploadHandler() {
    function errHandler(err) {
        console.log('[Error] ' + err);
    }
    
    function successHandler(res) {
        if (res.length === 0)
        {
            alert("Cannot detect any object");
        }
        else
        {
            data = JSON.parse(res.data);
            chessBoardData = res.chessboard;
            console.log(data.length)
            
            pos = 1;
            document.getElementById('image-viewer').innerHTML = '';
            switchObject(1);
            simulateChessBoard();
        }
    }

    let imageFile = document.getElementById('file-input').files[0];
    upload(imageFile, successHandler, errHandler);
}

document.getElementById('upload-btn').onclick = imgUploadHandler;
document.getElementById('file-input').onchange = displayImg;

let incInfo = e => {
    pos = pos + 1;
    if (pos > data.length)
        pos = 1;
    switchObject(pos);
}

let decInfo = e => {
    pos = pos -1;
    if (pos < 1)
        pos = data.length;
    switchObject(pos);
}

let nextbtn = document.getElementById('next-btn');
nextbtn.onclick = incInfo;
let prevbtn = document.getElementById('prev-btn');
prevbtn.onclick = decInfo;

fitToContainer(document.getElementById('canvas'));