const items = ["Apple", "Banana", "Clementine", "Durian", "Eggplant"];
const itemsEl = document.querySelector("#itemList");

function displayItems() {
  itemsEl.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    itemsEl.insertAdjacentHTML("beforeend", `<li>${items[i]}</li>`);
  }
}

displayItems();
