let slide_index = 1;

// Goto Nnxt slide
function nextSlide() {
  const n = 1;
  displaySlides((slide_index += n));
}

// Goto previous slide
function prevSlide() {
  const n = -1;
  displaySlides((slide_index += n));
}

// Display slides
function displaySlides(n) {
  let i;
  let slides = document.getElementsByClassName("showSlide");
  if (n > slides.length) {
    slide_index = 1;
  }
  if (n < 1) {
    slide_index = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slide_index - 1].style.display = "block";
}

// Event Listeners
document.getElementById("nextSlide").addEventListener("click", nextSlide);
document.getElementById("prevSlide").addEventListener("click", prevSlide);

displaySlides(slide_index); //Init function

// Set Interval that call nextslide function every 5 seconds
// setInterval(nextSlide, 5000)
