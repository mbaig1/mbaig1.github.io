function fadeOut(el){
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .01) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

setTimeout(function() {
			fadeOut(document.getElementById('spinner'));
		}, 2000);
