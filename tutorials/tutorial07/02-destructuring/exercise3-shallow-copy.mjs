const original = {
  name: "Eve",
  age: 20,
  courses: ["CSCI 182", "CSCI 344"],
};

// Use spread operator to create a shallow copy
// Modify the copy's name property
// Modify the copy's courses array (add a new course)
// Print both original and copy to see the difference

let copy = { ...original };
copy.name = "Wall-E";
copy.courses = [...copy.courses, "CSCI225"];

console.log(original);
console.log(copy);
