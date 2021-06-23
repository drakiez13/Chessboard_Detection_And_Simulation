import upload from './api.js'
import render from './renderer.js'

function createChild(name)
{
    let child = document.createElement('h1');
    child.innerHTML = name;
    return child;
}

function renderObjects(data)
{
    let renderDOM = document.getElementById('content');
    renderDOM.innerHTML = '';
    render(renderDOM, data[0].name, 400, 400)
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
    
    function successHandler(data) {
        if (data.length === 0)
        {
            alert("Cannot detect any object");
        }
        else
        {
            renderObjects(data);
        }
    }

    let imageFile = document.getElementById('file-input').files[0];
    upload(imageFile, successHandler, errHandler);
}

document.getElementById('upload-btn').onclick = imgUploadHandler;
document.getElementById('file-input').onchange = displayImg;