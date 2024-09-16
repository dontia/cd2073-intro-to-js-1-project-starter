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

// Generate product elements dynamically and append them to the products container
const productsElement = document.querySelector(".products");

products.forEach(function (product) {
  let formattedPrice = formatPrice(product.price);

  const productDiv = createAndAppendElement(productsElement, 'div', 'product');
  createAndAppendElement(productDiv, 'div', null, product.name);
  createAndAppendElement(productDiv, 'div', null, formattedPrice);
  createAndAppendElement(productDiv, 'div', null, `x ${product.quantity}`);

  const productImage = createAndAppendElement(productDiv, 'img', null, null);
  productImage.src = product.image;
  productImage.alt = product.name;

  const addToCartButton = createAndAppendElement(productDiv, 'button', null, 'Add to Cart');
  addToCartButton.addEventListener('click', () => {
    addProductToCart(product.productId);
  });
});

// Variable to track total amount paid
let totalPaid = 0;

// Function to handle payment and provide change if the amount is sufficient
function pay(amount) {
  const totalCost = cartTotal();

  // If the amount is less than the total cost, show the alert and return the amount
  if (amount < totalCost) {
    let formattedAdditionalAmount = formatPrice(totalCost - amount);
    alert(`Insufficient amount. You need ${formattedAdditionalAmount} more.`);
    return amount;
  }

  totalPaid += amount;

  // Calculate the difference between the totalPaid and the cartTotal
  let remaining = totalPaid - totalCost;
  // Check if the remaining amount is greater than or equal to zero
  if (remaining >= 0) {
    // If so, reset the `totalPaid` to zero to prepare it for the next payment
    totalPaid = 0;
    emptyCart();
    // Format the change using formatPrice
    let formattedChange = formatPrice(remaining);
    alert(`Payment successful! Change: ${formattedChange}`);
  }
  // Return the remaining amount
  return remaining;
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
