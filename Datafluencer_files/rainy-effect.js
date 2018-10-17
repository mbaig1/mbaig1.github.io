function run() {
  var img = document.getElementById("background-image-rain");

  var rainyDay = new RainyDay({
      image: img
  });

  rainyDay.rain([ [1, 2, 4000] ]);
  rainyDay.rain([ [3, 3, 0.88], [5, 5, 0.9], [6, 2, 1] ], 100);

  img.src = "https://res.cloudinary.com/dzixj0ktk/image/upload/o_65/v1539797933/photo_1_qwxu9e.jpg";
}
window.onload = setTimeout(run, 1000);
