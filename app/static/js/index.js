import upload from './api.js'
import render from './renderer.js'

let data = [];
let pos = 0;

let incInfo = e => {
    pos = pos + 1;
    if (pos > data.length)
        pos = 1;
    renderObjects(pos);
}

let decInfo = e => {
    pos = pos -1;
    if (pos < 1)
        pos = data.length;
    renderObjects(pos);
}

let nextbtn = document.getElementById('next-btn');
nextbtn.onclick = incInfo;
let prevbtn = document.getElementById('prev-btn');
prevbtn.onclick = decInfo;

function renderObjects(pos)
{
    let renderDOM = document.getElementById('content');
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

function displayImg(event) {
    let input = document.getElementById('file-input');
    const file = input.files[0]
    if (file) {
        let imgElement = document.createElement('img');
        imgElement.src = URL.createObjectURL(file);
        imgElement.style = `
            max-width: 100%;
            max-height: 100%;
            margin-top: 10px;
        `
        document.getElementById('image-viewer').innerHTML = ''
        document.getElementById('image-viewer').appendChild(imgElement);
    }
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
            data = res;
            pos = 1;
            renderObjects(pos);
        }
    }

    let imageFile = document.getElementById('file-input').files[0];
    upload(imageFile, successHandler, errHandler);
}

document.getElementById('upload-btn').onclick = imgUploadHandler;
document.getElementById('file-input').onchange = displayImg;