// --- Navigation & UI Toggles ---
function sidebar() {
  const menu = document.querySelector('.menu');
  HideCart();
  menu.style.display = 'block';
}

function HideSidebar() {
  const menu = document.querySelector('.menu');
  menu.style.display = 'none'; // Fixed casing
}

function ShowCart() {
  const cart = document.querySelector('.cart');
  cart.style.display = 'block';
}

function HideCart() {
  const cart = document.querySelector('.cart');
  cart.style.display = 'none'; // Fixed casing
}

// 1. List of your 4 images
const images = [
  './images/image-product-1.jpg',
  './images/image-product-2.jpg',
  './images/image-product-3.jpg',
  './images/image-product-4.jpg'
];

let currentIndex = 0; // The active image index
const heroDiv = document.querySelector('.main');

// 2. Function to update the background
function updateBackground() {
  heroDiv.style.backgroundImage = `url('${images[currentIndex]}')`;
}

// 3. Next Button Logic
function nextSlide() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0; // Loop back to the first image
  }
  updateBackground();
}

// 4. Previous Button Logic
function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1; // Loop to the last image
  }
  updateBackground();
}

// --- Quantity Counter Logic ---
const qtyBox = document.querySelector('.qty-button');
const reduceBtn = qtyBox.querySelector('.reduce');
const increaseBtn = qtyBox.querySelector('.increase');
const countEl = qtyBox.querySelector('.count');

let count = 0;

increaseBtn.addEventListener('click', () => {
  count++;
  countEl.textContent = count;
});

reduceBtn.addEventListener('click', () => {
  if (count > 0) {
    count--;
    countEl.textContent = count;
  }
});

// --- Cart Rendering Logic ---
const cartList = document.querySelector('.cart-list');
const checkoutContainer = document.querySelector('.check-out'); // Container for the button
const addToCartBtn = document.querySelector('.add-to-cart-btn');

let cartItem = null; 

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    // Error Fix: Only add to cart if count is greater than 0
    if (count === 0) return;

    const name = addToCartBtn.dataset.name;
    const price = Number(addToCartBtn.dataset.price);
    const image = addToCartBtn.dataset.image;

    if (!cartItem) {
      cartItem = { name, price, qty: count, image };
    } else {
      cartItem.qty += count; // Add the current selection to existing qty
    }

    renderCart();
  });
}

function renderCart() {
  // If cart is empty
  if (!cartItem || cartItem.qty === 0) {
    cartList.innerHTML = '<p class="empty-msg">Your cart is empty</p>';
    if (checkoutContainer) checkoutContainer.style.display = 'none';
    return;
  }

  // If cart has items
  if (checkoutContainer) checkoutContainer.style.display = 'flex';
  
  const total = (cartItem.price * cartItem.qty).toFixed(2);

  cartList.innerHTML = `
    <ul class="cart-items-list">
      <li>
        <div class="cart-item">
          <img class="item-img" src="${cartItem.image}" alt="" />
          <div class="item-detail">
            <p>${cartItem.name}</p>
            <p>$${cartItem.price.toFixed(2)} x ${cartItem.qty} <strong>$${total}</strong></p>
          </div>
          <div class="remove-icon" id="delete-item">
            <img src="./images/icon-delete.svg" alt="delete" />
          </div>
        </div>
      </li>
    </ul>
  `;

  // Re-attach delete listener after rendering
  document.getElementById('delete-item').addEventListener('click', () => {
    cartItem = null;
    renderCart();
  });
}

// Initial call to show "Empty" state on load
renderCart();