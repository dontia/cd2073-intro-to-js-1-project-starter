// Array of product objects, each containing details about a specific product
const products = [
  {
    name: "🍓 Strawberry", // Name of the product
    price: 4.25,          // Price of the product
    quantity: 0,          // Initial quantity in the cart
    productId: 1,         // Unique identifier for the product
    image: "images/strawberry.jpg" // URL of the product image
  },
  {
    name: "🍒 Cherry",
    price: 5.25,
    quantity: 0,
    productId: 2,
    image: "images/cherry.jpg"
  },
  {
    name: "🍊 Orange",
    price: 2.25,
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
  return parseFloat(total.toFixed(2));
}

// Helper function to format price to two decimal places and as currency
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

// Function to update the cart display
function updateCartDisplay() {
  const cartElement = document.querySelector(".cart");
  let cartHtml = '';
  cart.forEach(function (product) {
    // Calculate and format the total price for each product
    let productTotalPrice = formatPrice(product.price * product.quantity);
    cartHtml += `<div class="cart-product">
      <div>${product.name}</div>
      <div>${productTotalPrice}</div>
      <img src="${product.image}" alt="${product.name}">
      <button onclick="removeProductFromCart(${product.productId})">Remove</button>
      </div>`;
  });

  cartElement.innerHTML = cartHtml;

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
  productsHtml += `<div class="product">
  <div>${product.name}</div>
  <div>${product.price.toFixed(2)}</div>
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
    alert(`Payment successful! Change: $${(amount - totalCost).toFixed(2)}`);
    return amount - totalCost;
  } else {
    alert(`Insufficient amount. You need $${(totalCost - amount).toFixed(2)} more.`);
    return amount;
  }
}

/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
}
