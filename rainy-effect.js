function run() {
  var img = document.getElementById("background-image-rain");
  img.crossOrigin = 'Anonymous';

  var rainyDay = new RainyDay({
      image: img
  });
}
window.onload = setTimeout(run, 4000);
