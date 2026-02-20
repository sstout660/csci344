let currentPosition = 0; // Variables to set the position
let gap = 10;
const slideWidth = 400; // The width of each slide - No magic numbers :)

function moveCarousel(direction) {
  const items = document.querySelectorAll(".carousel-item"); // Select all elements with the 'carousel-item' class

  if (direction == "forward") {
    // Logic for forward button
    // minus 2 b/c first 2 slides already showing
    if (currentPosition >= items.length - 2) {
      return false; // Don't rotate the carousel if it is at the end
    }
    currentPosition++; // Otherwise rotate one slide to the right
  } else {
    // Otherwise we want the back button
    if (currentPosition == 0) {
      return false; // Don't rotate the carousel if it is at the beginning
    }
    currentPosition--; // Otherwise rotate one slide to the left
  }

  const offset = (slideWidth + gap) * currentPosition; // Slide position with width and gap

  for (const item of items) {
    item.style.transform = `translateX(-${offset}px)`; // Transform the entire carousel based on the current offset
  }
}
