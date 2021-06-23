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
    render(renderDOM, data[0].name)
}

function displayImg() {
    
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
            displayImg();
        }
    }

    let imageFile = document.getElementById('myFile').files[0];
    upload(imageFile, successHandler, errHandler);
}

document.getElementById('upload-btn').onclick = imgUploadHandler;