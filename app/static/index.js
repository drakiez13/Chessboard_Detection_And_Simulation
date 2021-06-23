function createChild(name)
{
    let child = document.createElement('h1');
    child.innerHTML = name;
    return child;

}

function renderObjects(data)
{
    let renderDOM = document.getElementById('render');
    data.forEach(element => {
        renderDOM.appendChild(createChild(element.name));
    });
}

function displayImg() {
    let image=document.getElementById('myFile');
    <img src="image" />
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
