// DOM Elements 
let cartCount = document.getElementById("cartCount");
let cartTableBody = document.getElementById("cartTableBody");
let cartContainer = document.getElementById("cart-container");
let checkoutBtn = document.getElementById("checkoutBtn");
let storedCartItems;

// Check the Document ready state and then trigger getStore function
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", getStore);
} else {
  getStore();
}

// Init Event Listeners
function initEventListeners() {
  const removeCartItemButton =
    document.getElementsByClassName("remove-cart-item");
  for (let i = 0; i < removeCartItemButton.length; i++) {
    const button = removeCartItemButton[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
}

// Get stored items from Local Storage
function getStore() {
  const storedItems = JSON.parse(localStorage.getItem("cartItems"));
  storedCartItems = storedItems;
  if (
    storedCartItems &&
    storedCartItems.length > 0 &&
    storedCartItems !== null
  ) {
    updateCartCountNotification(storedCartItems.length);
    cartTable();
  } else {
    updateCartCountNotification(0);
    cartEmpty();
  }
}

// Function that builds the cart table
function cartTable() {
  if (storedCartItems.length > 0) {
    let cartRowContent = `<thead>
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Quantity</th>
      <th  class="text-end" scope="col">Total</th>
    </tr>
  </thead>`;
    storedCartItems.map((item) => {
      cartRowContent += `
        <tr id=${item.productID} class="cart-row">
            <td class="col-sm-8 col-md-6">
                <div class="media d-flex text-start">
                    <a class="thumbnail pull-left" href="#"> 
                        <img class="media-object" src=${item.imageURL} /> 
                    </a>
                    <div class="media-body ps-4">
                        <h5 class="media-heading cart-product-title">${item.title}</h5>
                        <span class="cart-product-price">${item.price}</span>
                    </div>
                </div>
            </td>

            <td class="col-sm-1 col-md-1" style="text-align: center">
                <input class="cart-quantity-input form-control" type="number" value=${item.quantity} />
                <button type="button" class="btn btn-link remove-cart-item">
                  <span class="fa fa-remove"></span>Remove
                </button>
            </td>

            <td class="col-sm-1 col-md-1 text-end fw-bold row-total"></td>    
        </tr>
    `;
    });
    cartTableBody.innerHTML = cartRowContent;
    updateCartTotal();
    initEventListeners();
  } else {
    cartEmpty();
  }
}

// When order is placed or no items in the cart table then this function is called
function cartEmpty() {
  cartContainer.innerHTML = `
  <div class='empty-cart mb-5'>
    <h1><strong>Your cart is empty</strong></h1>
    <a href='list.html' class='btn btn-dark btn-lg rounded-0 btn-block' type='button' >Continue Shopping</a>
  </div>
  `;
}

// Function that updates the price amount when quantity is changed
function quantityChanged(e) {
  let input = e.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// Function to update cart total
function updateCartTotal() {
  let cartTotal = 0;
  const cartRows = document.getElementsByClassName("cart-row");
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    const priceElement =
      cartRow.getElementsByClassName("cart-product-price")[0].innerText;
    const qtyElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
      .value;
    const rowTotalElement = cartRow.getElementsByClassName("row-total")[0];
    const price = parseFloat(priceElement.replace("$", ""));
    const qty = Number(qtyElement);
    const rowTotal = Math.round(price * qty * 100) / 100;
    cartTotal = cartTotal + rowTotal;
    document.getElementsByClassName("sub-total")[0].innerText = `$${
      Math.round(cartTotal * 100) / 100
    }`;
    rowTotalElement.innerText = `$${rowTotal}`;
  }
}

// Function that updates the cart count in the Nav Bar
function updateCartCountNotification(count) {
  if (count > 0) {
    cartCount.innerText = `CART(${count})`;
  } else {
    cartCount.innerText = `CART(0)`;
  }
}

// This function removes an item from the cart table
function removeCartItem(e) {
  const buttonClicked = e.target;
  const productId = buttonClicked.parentElement.parentElement.id;
  const storedItems = JSON.parse(localStorage.getItem("cartItems"));
  const filteredItems = storedItems.filter(
    (item) => item.productID != productId
  );
  localStorage.setItem("cartItems", JSON.stringify(filteredItems));
  updateCartCountNotification(filteredItems.length);
  storedCartItems = filteredItems;
  buttonClicked.parentElement.parentElement.remove();
  cartTable();
}

// When checkout button is clicked, this function is called
function orderCheckout() {
  window.location.href = 'checkout-progress.html';
}

// Event Listener for Checkout button
checkoutBtn.addEventListener("click", orderCheckout);
