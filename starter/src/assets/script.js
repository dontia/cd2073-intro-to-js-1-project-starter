// Array of product objects, each containing details about a specific product
const products = [
  {
    name: "🍓 Strawberry", // Name of the product
    price: 4,          // Price of the product
    quantity: 0,          // Initial quantity in the cart
    productId: 1,         // Unique identifier for the product
    image: "images/strawberry.jpg" // URL of the product image
  },
  {
    name: "🍒 Cherry",
    price: 5,
    quantity: 0,
    productId: 2,
    image: "images/cherry.jpg"
  },
  {
    name: "🍊 Orange",
    price: 2,
    quantity: 0,
    productId: 3,
    image: "images/orange.jpg"
  }
];

// Empty array to hold the products in the cart

let cart = [];

// Helper function to find a product by its ID
function findProductById(productId) {
  return products.find(p => p.productId === productId);
}

// Function to add a product to the cart
function addProductToCart(productId) {
  let product = findProductById(productId);
  if (product) {
    if (!cart.includes(product)) {
      cart.push(product);
    }
    increaseQuantity(productId);
  }
  updateCartDisplay();
}

// Function to increase the quantity of a product in the cart
function increaseQuantity(productId) {
  const product = findProductById(productId);
  if (product) {
    product.quantity += 1;
  }
}

// Function to decrease the quantity of a product
function decreaseQuantity(productId) {
  let product = findProductById(productId);
  if (product) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      cart = cart.filter(p => p.productId !== productId);
    }
  }
}

// Function to remove a product from the cart
function removeProductFromCart(productId) {
  cart = cart.filter(p => p.productId !== productId);
  updateCartDisplay();
}

// Function to calculate the total cost of products in the cart (limit to 2 decimal points)
function cartTotal() {
  const total = cart.reduce((accumulator, product) => {
    return accumulator + product.price * product.quantity;
  }, 0);
  return (total);
}

// Helper function to format price to two decimal places and as currency
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

// Helper function to create and append an element with text content
function createAndAppendElement(parent, tag, className, textContent) {
  const element = document.createElement(tag);
  if (className) {
    element.classList.add(className);
  }
  element.textContent = textContent;
  parent.appendChild(element);
  return element; // Return the created element for further use if needed
}

// Function to update the cart display
function updateCartDisplay() {
  const cartElement = document.querySelector(".cart");

  // Clear the existing content of the cartElement
  cartElement.innerHTML = ''; // Clear existing content 

  cart.forEach(function (product) {
    let productTotalPrice = formatPrice(product.price * product.quantity);

    const cartProductDiv = createAndAppendElement(cartElement, 'div', 'cart-product');
    createAndAppendElement(cartProductDiv, 'div', null, product.name);
    createAndAppendElement(cartProductDiv, 'div', null, productTotalPrice);

    const productImage = createAndAppendElement(cartProductDiv, 'img', null, null);
    productImage.src = product.image;
    productImage.alt = product.name;

    const removeButton = createAndAppendElement(cartProductDiv, 'button', null, 'Remove');
    removeButton.addEventListener('click', () => {
      removeProductFromCart(product.productId);
    });
  });

  // Calculate and display total price
  const totalPrice = cartTotal();
  const cartTotalElement = document.querySelector(".cart-total");
  cartTotalElement.innerHTML = `Total: ${formatPrice(totalPrice)}`;
}

// Function to empty the cart
function emptyCart() {
  cart = []; // Clear the cart array
  updateCartDisplay(); // Update the cart display
}

// Select the empty cart button element
const emptyCartButton = document.querySelector('.empty-btn button');

// Add event listener to the empty cart button
emptyCartButton.addEventListener('click', () => {
  emptyCart(); // Empty the cart when button is clicked
  updateCartDisplay();
});

// Generate HTML for each product and insert it into the products element
const productsElement = document.querySelector(".products");

let productsHtml = '';
products.forEach(function (product) {
  // Use formatPrice to display the product price consistently
  let formattedPrice = formatPrice(product.price);
  productsHtml += `<div class="product">
  <div>${product.name}</div>
  <div>${formattedPrice}</div> 
  <div>x ${product.quantity}</div>
  <img src="${product.image}" alt="${product.name}">
  <button onclick="addProductToCart(${product.productId})">Add to Cart</button>
  </div>`;
});

productsElement.innerHTML = productsHtml;

// Function to handle payment and provide change if the amount is sufficient
function pay(amount) {
  let totalCost = cartTotal();
  if (amount >= totalCost) {
    emptyCart();
    // Format the change using formatPrice
    let formattedChange = formatPrice(amount - totalCost);
    alert(`Payment successful! Change: ${formattedChange}`);
    return amount - totalCost;
  } else {
    // Format the additional amount needed using formatPrice
    let formattedAdditionalAmount = formatPrice(totalCost - amount);
    alert(`Insufficient amount. You need ${formattedAdditionalAmount} more.`);
    return amount;
  }
}
