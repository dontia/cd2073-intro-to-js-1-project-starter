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

/* Create a function called emptyCart that empties the products from the cart */

/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/

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
