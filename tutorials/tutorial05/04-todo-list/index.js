function addTodo() {
  // 1) Get the input element
  inputEl = document.querySelector("#todoInput");
  val = inputEl.value;

  ul = document.querySelector("ul");
  ul.insertAdjacentHTML("beforeend", "<li>" + val + "</li>");
  val = "";
  // 2) Get the value from the input (use .value property)
  // 3) Get the ul element (the todo list)
  // 4) Use insertAdjacentHTML('beforeend', '<li>...</li>') to add the item
  //    Make sure to include the todo text in the <li>
  // 5) Clear the input field (set .value to empty string)
}
