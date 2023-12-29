// JavaScript code for stepper form
const form = document.getElementById("stepper-form");
const fieldsets = form.querySelectorAll("fieldset");
const nextBtns = form.querySelectorAll(".next-btn");
const prevBtns = form.querySelectorAll(".prev-btn");
let currentStep = 0;

// Hide all fieldsets except the first one
fieldsets.forEach((fieldset, index) => {
  if (index !== currentStep) {
    fieldset.style.display = "none";
  }
});

// Handle the next button click
nextBtns.forEach((nextBtn) => {
  nextBtn.addEventListener("click", () => {
    fieldsets[currentStep].style.display = "none";
    currentStep++;
    fieldsets[currentStep].style.display = "block";
  });
});

// Handle the previous button click
prevBtns.forEach((prevBtn) => {
  prevBtn.addEventListener("click", () => {
    fieldsets[currentStep].style.display = "none";
    currentStep--;
    fieldsets[currentStep].style.display = "block";
  });
});
