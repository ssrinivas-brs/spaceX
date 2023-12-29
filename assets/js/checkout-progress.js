function previousBack() {
  window.history.forward();
}
setTimeout(previousBack, 0);
window.onunload = function () {
  null;
};

// Some random Order ID's
const UNIQUE_ORDER_ID = [
  "1I69VH4N",
  "WO7NA3KC",
  "E3MNQ3OB",
  "ND8LJT9I",
  "X8UKDB0I",
];

// DOM Elements
let cartTableBodyElement = document.getElementById("cart-summary-body");
let cartTotalElement = document.getElementById("cart-total");
const progressContainer = document.getElementsByClassName("step");
const progressPercentage = document.getElementById("progress-percentage");

const form = document.getElementById("stepper-form");
const fieldsets = form.querySelectorAll("fieldset");
const nextBtns = form.querySelectorAll(".next-btn");
const prevBtns = form.querySelectorAll(".prev-btn");
const address = document.getElementById("address");
let currentStep = 0;
// max and warn length for address 
const maxLength = 250;
const warnLength = 10;
const charCount = document.getElementById("charCount");
charCount.textContent = `${maxLength}/${maxLength}`;

// Input validation
function validateStep(item) {
  const inputs = [...item.querySelectorAll("input, textarea")];
  let isEmpty = false;

  for (const input of inputs) {
    const inputField = document.getElementById(input.id);
    const labelText = inputField.parentElement.querySelector("label").innerText;
    if (input.tagName.toLowerCase() === "input") {
      if (inputField.value === "") {
        isEmpty = true;
        alert(`Enter ${labelText}`);
        input.focus();
        break;
      }
      if (inputField.value.length <= 3  && !(inputField.id === "lastName") ) {
        isEmpty = true;
        alert(`${labelText} should be greater than 3 charecters`);
        input.focus();
        break;
      }
      if (inputField.value.length > 16 && !(inputField.id === "email") ) {
        isEmpty = true;
        alert(`${labelText} cannot be greater than 16 charecters`);
        input.focus();
        break;
      }
      if (inputField.type === "email") {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmail = regex.test(inputField.value);
        if (!validEmail) {
          alert(`Enter a valid ${labelText}`);
          input.focus();
          return;
        }
      }
    }

    if (input.tagName.toLowerCase() === "textarea") {
      if (inputField.value === "") {
        isEmpty = true;
        alert(`Enter ${labelText}`);
        input.focus();
        break;
      }
      if (inputField.value.length <= 20) {
        isEmpty = true;
        alert(`${labelText} should be greater than 20 charecters`);
        input.focus();
        break;
      }
    }
  }
  if (!isEmpty) {
    return true;
  }
}
// Hide all fieldsets except the first one
fieldsets.forEach((fieldset, index) => {
  if (index !== currentStep) {
    fieldset.style.display = "none";
  }
  if (currentStep === 0) {
    progressContainer[currentStep].classList.add("active");
  }
});

// Handle the next button click
nextBtns.forEach((nextBtn, index) => {
  nextBtn.addEventListener("click", () => {
    const valid = validateStep(fieldsets[currentStep]);
    if (valid) {
      if (index === 0) {
        progressPercentage.style.width = "35%";
        progressPercentage.setAttribute("aria-valuenow", "35");
        progressPercentage.textContent = "35%";
      }
      if (index === 1) {
        progressPercentage.style.width = "70%";
        progressPercentage.setAttribute("aria-valuenow", "70");
        progressPercentage.textContent = "70%";
      }
      progressContainer[currentStep + 1].classList.add("active");
      fieldsets[currentStep].style.display = "none";
      currentStep++;
      fieldsets[currentStep].style.display = "block";
    }
  });
});

// Handle the previous button click
prevBtns.forEach((prevBtn, index) => {
  prevBtn.addEventListener("click", () => {
    if (index === 0) {
      progressPercentage.style.width = "0%";
      progressPercentage.setAttribute("aria-valuenow", "0");
      progressPercentage.textContent = "0%";
    }
    if (index === 1) {
      progressPercentage.style.width = "35%";
      progressPercentage.setAttribute("aria-valuenow", "35");
      progressPercentage.textContent = "35%";
    }
    fieldsets[currentStep].style.display = "none";
    progressContainer[currentStep].classList.remove("active");
    currentStep--;
    fieldsets[currentStep].style.display = "block";
  });
});

// Function to calculate sub total
function calculateSubtotal(price, qty) {
  const productQty = Number(qty);
  const productPrice = Number(price.substring(1));
  return `$${productPrice * productQty}`;
}

// Get cart items stored in local storage
function getCartItemsFromLocalStore() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  let cartRowContent = "";
  cartItems.map((item, index) => {
    cartRowContent += `
    <tr id=${item.productID} class="cart-row">
    <td scope="row">${index + 1}</td>
    <td scope="row">${item.title}</td>
    <td scope="row" class="cart-product-price">${item.price}</td>
    <td scope="row" cart-quantity-qty>${item.quantity}</td>  
    <td scope="row" class="row-total">${calculateSubtotal(
      item.price,
      item.quantity
    )}</td>  
    </tr>
`;
  });
  cartTableBodyElement.innerHTML = cartRowContent;
  updateTotal();
}

// Function that updates the cart total
function updateTotal() {
  let cartTotal = 0;
  const cartRows = document.getElementsByClassName("cart-row");

  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    const subTotal = cartRow.getElementsByClassName("row-total")[0].innerText;
    const removedDollarSign = Number(subTotal.substring(1));
    cartTotal += removedDollarSign;
  }
  cartTotalElement.textContent = `Total $${cartTotal}`;
}

// Function that returns a random ID
function getRandomOrderID() {
  var randomIndex = Math.floor(Math.random() * UNIQUE_ORDER_ID.length);
  return UNIQUE_ORDER_ID[randomIndex];
}

// Confirm checkout - will send an Email and clears the cart items
async function confirmCheckout(e) {
  e.preventDefault();
  const username = document.getElementById("firstName").value;
  const userEmail = document.getElementById("email").value;

  progressPercentage.style.width = "100%";
  progressPercentage.setAttribute("aria-valuenow", "100");
  progressPercentage.textContent = "100%";

  const cartTableContent =
    document.getElementsByClassName("cart-summary-table")[0].innerHTML;
  const cartTotal = document
    .getElementById("cart-total")
    .innerText.replace(/[^0-9.]/g, "");
  const paramss = {
    name: username,
    order_id: getRandomOrderID(),
    email: userEmail,
    total: cartTotal,
    message: cartTableContent,
  };

  const serviceId = "service_us5ty2u";
  const templateId = "template_jmf8ujl";

  const response = await emailjs.send(serviceId, templateId, paramss);
  if (response.status === 200) {
    window.location.href = "order-success.html";
    localStorage.setItem("cartItems", JSON.stringify([]));
  }
}

getCartItemsFromLocalStore();

document
  .getElementById("confirmBtn")
  .addEventListener("click", confirmCheckout);

address.addEventListener("input", function () {
  const remainingChars = maxLength - address.value.length;

  if (remainingChars <= warnLength) {
    charCount.classList.add("text-danger");
  } else {
    charCount.classList.remove("text-danger");
  }
  if (remainingChars <= 0) {
    address.value = address.value.slice(0, maxLength);
  }

  charCount.textContent = `${Math.max(remainingChars, 0)}/${maxLength}`;
});
