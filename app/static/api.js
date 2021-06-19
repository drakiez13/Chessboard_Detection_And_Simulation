/* Function upload
Take image file encode base64 and pose to api endpoint
return data will be executed in callback if success
handle error with err callback
*/
function upload(file, callback, err) {
    fetch('http://127.0.0.1:5000/api/image_upload', {
      method: 'POST',
      headers: {
        "Content-Type": "You will perhaps need to define a content-type here"
      },
      body: file
    }).then(
      response => response.json()
    ).then(
      data => callback(data)
    ).catch(
      error => err(error)
    );
  };