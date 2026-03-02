const fruit1 = {
  name: "Apple",
  price: 1.25,
  description: "Very tasty yes yes",
  category: "Round red bois",
  inStock: true,
};
const fruit2 = {
  name: "Banana",
  price: 0.67,
  description: "Monkey eat banana and monkey never cramps",
  category: "Yellow curvy fellows",
  inStock: true,
};
const fruit3 = {
  name: "Avocado",
  price: 1.75,
  description: "Big and green",
  category: "More fruit",
  inStock: false,
};

const products = [fruit1, fruit2, fruit3];

function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

function createProductCard(object) {
  let html = `<container class="product-card">
  <h2>${object.name}</h2>
    <div class="price">${formatPrice(object.price)}</div>
    <p class="description">${object.description}</p>
    <span class="category">${object.category}</span>
    ${object.inStock ? "<p class='stock-status in-stock'>In Stock</p>" : "<p class='stock-status out-of-stock'>Out of Stock</p>"}
    </container>`;
  return html;
}

function renderProducts() {
  productGrid = document.querySelector("#productGrid");
  productGrid.innerHTML = "";
  let html;
  for (let i = 0; i < products.length; i++) {
    html = createProductCard(products[i]);
    productGrid.insertAdjacentHTML("beforeend", `${html}`);
  }
}

function addItemToList(event) {
  // Prevent the default form submission behavior (which would reload the page)
  event.preventDefault();
  // TODO: Add your code here
  let nameElement = document.querySelector("#productName").value.trim();
  let priceElement = parseFloat(
    document.querySelector("#productPrice").value.trim(),
  );
  let descriptionElement = document
    .querySelector("#productDescription")
    .value.trim();
  let categoryElement = document.querySelector("#productCategory").value.trim();
  let inStockElement = document.querySelector("#productInStock").checked;

  //   console.log(nameElement);
  //   console.log(priceElement);
  //   console.log(descriptionElement);
  //   console.log(categoryElement);
  //   console.log(inStockElement);

  const newItem = {
    name: nameElement,
    price: priceElement,
    description: descriptionElement,
    category: categoryElement,
    inStock: inStockElement,
  };

  console.log(newItem);

  //   let newCard = createProductCard(newItem);
  products.push(newItem);
  renderProducts();

  document.querySelector("#productForm").reset();
}

productForm.addEventListener("submit", addItemToList);
renderProducts();
