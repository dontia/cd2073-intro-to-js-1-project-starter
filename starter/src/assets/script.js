// Array of product objects, each containing details about a specific product
const products = [
  {
    name: "Strawberry",  // Name of the product
    price: 4,  //Price of the product
    quantity: 0,  // Initial quantity in the cart
    productId: 1,  // Unique identifier for the product
    image: "images/strawberry.jpg" // URL of the product image
  },
  {
    name: "Cherry",
    price: 5,
    quantity: 0,
    productId: 2,
    image: "images/cherry.jpg"
  },
  {
    name: "Orange",
    price: 2,
    quantity: 0,
    productId: 3,
    image: "images/orange.jpg"
  }
];


// Empty array to hold the products in the cart
let cart = [];


// Variable to keep track of the total amount paid
let totalPaid = 0;


/**
   * Helper function to find a product by its ID
   * @param {number} productId - The unique identifier of the product
   * @returns {object} - The product object if found, otherwise undefined
   */
function findProductById(productId) {
  return products.find(p => p.productId === productId);
}


/**
 * Function to add a product to the cart
 * @param {number} productId - The unique identifier of the product to be added
 */
function addProductToCart(productId) {
  const product = findProductById(productId);
  if (product) {
    if (!cart.includes(product)) {
      cart.push(product);
    }
    increaseQuantity(productId);
  }
}


/**
 * Function to increase the quantity of a product in the cart
 * @param {number} productId - The unique identifier of the product
 */
function increaseQuantity(productId) {
  const product = findProductById(productId);
  if (product) {
    product.quantity += 1;
  }
}


/**
 * Function to decrease the quantity of a product
 * @param {number} productId - The unique identifier of the product
 */
function decreaseQuantity(productId) {
  const product = findProductById(productId);
  if (product) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      cart = cart.filter(p => p.productId !== productId);
    }
  }
}


/**
 * Function to remove a product from the cart
 * @param {number} productId - The unique identifier of the product to be removed
 */
function removeProductFromCart(productId) {
  cart = cart.filter(p => p.productId !== productId);
}


/**
 * Function to empty the cart
 */
function emptyCart() {
  cart = []; // Clear the cart array
}


// Select the empty cart button element
const emptyCartButton = document.querySelector('.empty-btn button');


// Add event listener to the empty cart button
emptyCartButton.addEventListener('click', () => {
  emptyCart(); // Empty the cart when button is clicked
});


// Generate product elements dynamically and append them to the products container
const productsElement = document.querySelector(".products");


/**
 * Function to calculate the total cost of items in the cart
 * @returns {number} - The total cost of items in the cart
 */
function cartTotal() {
  // Initialize a variable to hold the total
  let total = 0;

  // Iterate through the cart and sum up the product prices multiplied by their quantities
  for (const item of cart) {
    total += item.price * item.quantity;
  }
  return total; // Return the total cost
}


/**
 * Function to handle payment
 * @param {number} amount - The amount paid by the user
 * @returns {number} - The remaining balance or change
 */
function pay(amount) {
  // Add the payment amount to the total paid
  totalPaid += amount;

  // Calculate the remaining balance or change
  let balance = totalPaid - cartTotal();

  // Check if the remaining amount is greater than or equal to zero
  if (balance >= 0) {
    totalPaid = 0;  // Reset for the next payment
    emptyCart();
  }
  return balance;  // Return the balance or change
}


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
