//const { clearScreenDown } = require("readline");

const video = document.getElementById("video");
const snap = document.getElementById("snap");
const canvas = document.getElementById("canvas");
const clear = document.getElementById("clear");
const errorMsgElement = document.querySelector("span#errorMsg");

const constraints = {
  audio: false,
  video: {
    width: 800,
    height: 600
  }
};

// Acceso a la webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}
// Correcto!
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

function takeASnap(){
  const canvas = document.createElement('canvas'); // create a canvas
  const ctx = canvas.getContext('2d'); // get its context
  canvas.width = video.videoWidth; // set its size to the one of the video
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0,0); // the video
  return new Promise((res, rej)=>{
    canvas.toBlob(res, 'image/jpeg'); // request a Blob from the canvas
  });
}



// Load init
init();
// Dibuja la imagen
var context = canvas.getContext("2d");
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 640, 480);
  


  //const formData = new FormData();
 // formData.append("image", video);
 takeASnap()
    .then((blob)=>{
      const data = new FormData();
      data.append('image', blob);
      axios.post('/uploadImage',data, {
        headers: {
          'Content-Type':  `multipart/form-data; boundary=${data._boundary}`
        }
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    });






});
// Reinicia la página
clear.addEventListener("click", function () {
  location.reload();
});
// clearScreenDown;