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


/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/

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
