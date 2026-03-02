let count = 0;
countDisplay = document.querySelector("#counter");
inButton = document.querySelector("#incrementBtn");
decButton = document.querySelector("#decrementBtn");
resButton = document.querySelector("#resetBtn");

function increment() {
  count++;
  updateDisplay();
}

function decrement() {
  count--;
  updateDisplay();
}

function reset() {
  count = 0;
  updateDisplay();
}

function updateDisplay() {
  countDisplay.textContent = count;
  if (count > 0) {
    countDisplay.style.color = "#4CAF50";
  } else if (count < 0) {
    countDisplay.style.color = "#f44336";
  } else {
    countDisplay.style.color = "#666";
  }
}

updateDisplay();
