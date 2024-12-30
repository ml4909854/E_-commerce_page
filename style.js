// script.js
const cart = [];

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', (event) => {
    const productElement = event.target.closest('.product');
    const productId = productElement.dataset.id;
    const productPrice = parseFloat(productElement.dataset.price);
    const productName = productElement.querySelector('h2').textContent;

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
  });
});

// Function to update the cart display
function updateCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = ''; // Clear existing cart items

  let subtotal = 0;

  cart.forEach((item, index) => {
    subtotal += item.price * item.quantity;

    // Create a cart item row
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span>${item.name} (₹${item.price} x ${item.quantity})</span>
      <div>
        <button class="decrease" data-index="${index}">-</button>
        <button class="increase" data-index="${index}">+</button>
        <button class="remove" data-index="${index}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  // Update subtotal
  document.getElementById('subtotal').textContent = `Subtotal: ₹${subtotal}`;

  // Add event listeners for cart buttons
  document.querySelectorAll('.decrease').forEach((button) => {
    button.addEventListener('click', decreaseQuantity);
  });

  document.querySelectorAll('.increase').forEach((button) => {
    button.addEventListener('click', increaseQuantity);
  });

  document.querySelectorAll('.remove').forEach((button) => {
    button.addEventListener('click', removeItem);
  });
}

// Decrease quantity of an item
function decreaseQuantity(event) {
  const index = event.target.dataset.index;
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // Remove item if quantity is 0
  }
  updateCart();
}

// Increase quantity of an item
function increaseQuantity(event) {
  const index = event.target.dataset.index;
  cart[index].quantity += 1;
  updateCart();
}

// Remove an item from the cart
function removeItem(event) {
  const index = event.target.dataset.index;
  cart.splice(index, 1); // Remove item from cart
  updateCart();
}
