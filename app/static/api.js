/* Function upload
Take image file encode base64 and pose to api endpoint
return data will be executed in callback if success
handle error with err callback
*/
function upload(file, callback, err) {
    const formData = new FormData();
    if (file == null)
      err("Cannot find file to upload")
    formData.append('imagefile', file);
    fetch('/api/image_upload', {
      method: 'POST',
      body: formData
    }).then(
      response => response.json()
    ).then(
      data => callback(data)
    ).catch(
      error => err(error)
    );
  };