// Get the parms from URL
const productDetails = new URLSearchParams(window.location.search);
const productId = productDetails.get("id");

// product review
const stars = document.querySelectorAll(".star");
const selectedRating = document.querySelector(".selected-rating");
const reviewText = document.getElementById("product-review");
const productReviewElement = document.getElementById("productReviewList");
const productreviewBtn = document.getElementById("product-reviewBtn")

// Init review arr
let productReviewArr = [];
// random names
const usernames = [
  "john_doe",
  "jane_smith",
  "mike123",
  "sara_89",
  "alexander",
  "lucy_lu",
  "sammy12",
  "emily_r",
  "david987",
  "olivia_m",
  "charlie_b",
  "sophia_w",
];

// function that returns a random name
function getRandomName() {
  const randomIndex = Math.floor(Math.random() * usernames.length);
  const randomUsername = usernames[randomIndex];
  return randomUsername;
}

function generateRandomId() {
  const timestamp = Date.now().toString();
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  const randomId = timestamp + randomNum;
  return randomId;
}

// Function that returns the current date and time
function getCurrentDateAndTime(params) {
  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    //   second: 'numeric',
    hour12: true,
  };
  const formattedDateTime = currentDate.toLocaleString("en-US", options);
  return formattedDateTime;
}

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const rating = star.getAttribute("data-rating");
    selectedRating.textContent = rating + " stars";
    stars.forEach((s) => {
      if (s.getAttribute("data-rating") <= rating) {
        s.style.color = "gold";
      } else {
        s.style.color = "#ccc";
      }
    });
  });
});

function updateProductReviewStore(newReview) {
  const storedReviews = localStorage.getItem("productreview");
  const reviews = JSON.parse(storedReviews);
  const updatedProductReview = [...reviews, newReview];
  localStorage.setItem("productreview", JSON.stringify(updatedProductReview));
  getProductReviewFromStore();
}

function getProductReviewFromStore() {
  const items = localStorage.getItem("productreview");
  let reviews = JSON.parse(items);
  if (reviews === null) {
    reviews = localStorage.setItem("productreview", JSON.stringify([]));
    return;
  }
  if (reviews.length > 0) {
    let reviewList = "";
    reviews.map((review, index) => {
      reviewList += `
      <div class="container mt-5">
      <div class="row">
        <div class="col-md-4">
        <div class="mb-3">
            <p><span class="fw-bolder">${review.createdBy}</span> <span class="fs-6 fw-light">${review.createdAt}</span></p>
            <p class="fw-normal">${review.description}</p>
            <hr/>
        </div>
        </div>
      </div>
      </div>
        `;
    });
    productReviewElement.innerHTML = reviewList;
  }
}

// Get produt review from local storage
getProductReviewFromStore();

// Post product review
function postProductReview() {
  if(reviewText.value.length === 0){
    alert("Enter a product review")
    reviewText.focus()
    return
  }
  if(reviewText.value.length < 5){
    alert("Review cannot be less than 5 characters")
    reviewText.focus()
    return
  }
  const rating = selectedRating.textContent;
  const review = reviewText.value;
  const username = getRandomName();
  const createdTime = getCurrentDateAndTime();
  const productReview = {
    id: generateRandomId(),
    productId,
    star: rating,
    description: review,
    createdBy: username,
    createdAt: createdTime,
  };
  updateProductReviewStore(productReview);

  selectedRating.textContent = "0 stars";
  stars.forEach((star) => {
    star.style.color = "#ccc";
  });
  reviewText.value = "";
}

productreviewBtn.addEventListener("click", postProductReview);
