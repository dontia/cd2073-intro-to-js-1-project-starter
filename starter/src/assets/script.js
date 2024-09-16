// Array of product objects, each containing details about a specific product
const products = [
  {
    name: "Strawberry", // Name of the product
    price: 4,          // Price of the product
    quantity: 0,          // Initial quantity in the cart
    productId: 1,         // Unique identifier for the product
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
}

// Function to calculate the total cost of products in the cart
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

// Function to empty the cart
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

// Variable to track total amount paid
let totalPaid = 0;

// Function to handle payment and provide change if the amount is sufficient
function pay(amount) {
  const totalCost = cartTotal();

  // If the amount is less than the total cost, show the alert and return the amount
  if (amount < totalCost) {
    const formattedAdditionalAmount = formatPrice(totalCost - amount);
    alert(`Insufficient amount. You need ${formattedAdditionalAmount} more.`);
    return amount;
  } else {
    remainingBalance = 0; // Reset remaining balance after successful payment
    emptyCart();
    const formattedChange = formatPrice(amount - totalCost);
    alert(`Payment successful! Change: ${formattedChange}`);
    return amount - totalCost; // Return positive change
  }
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
