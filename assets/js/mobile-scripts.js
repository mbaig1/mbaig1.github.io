window.addEventListener("resize", changeTopImage);

function changeTopImage() {
  var width = document.body.clientWidth;
  var img = document.getElementById("background-image-rain");

  if(width <= 800) {
    img.src = "https://res.cloudinary.com/dzixj0ktk/image/upload/v1540273251/zoomed-in-skyscraper_g72aug.jpg";
  } else {
    img.src = "https://res.cloudinary.com/dzixj0ktk/image/upload/o_65/v1539797933/photo_1_qwxu9e.jpg";
  }

  run();
}

changeTopImage();
