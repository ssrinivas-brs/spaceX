// To Show the Cart count for the List Product page
let cartCount = document.getElementById("cartCount");
let storedCartItems;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", getStore);
} else {
  getStore();
}

// check for stored items that is stored in the local storage
function getStore() {
  const storedItems = JSON.parse(localStorage.getItem("cartItems"));
  storedCartItems = storedItems;
  if (
    storedCartItems &&
    storedCartItems.length > 0 &&
    storedCartItems !== null
  ) {
    updateCartCountNotification(storedCartItems.length);
  } else {
    updateCartCountNotification(0);
  }
}

// Function that updates the cart count 
function updateCartCountNotification(count) {
  if (count > 0) {
    cartCount.innerText = `CART(${count})`;
  } else {
    cartCount.innerText = `CART(0)`;
  }
}
