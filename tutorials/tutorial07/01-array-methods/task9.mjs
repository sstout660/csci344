const students = [
  { name: "Alice", age: 20, grade: 85, major: "Computer Science" },
  { name: "Bob", age: 21, grade: 92, major: "Mathematics" },
  { name: "Charlie", age: 19, grade: 78, major: "Computer Science" },
  { name: "Diana", age: 22, grade: 95, major: "Physics" },
  { name: "Eve", age: 20, grade: 88, major: "Computer Science" },
];

// Your code here (hint: use template literals)
const fancyCSList = students
  .filter((item) => item.major === "Computer Science")
  .toSorted((a, b) => a.grade - b.grade)
  .map(
    (item) =>
      `<p><strong>${item.name}:</strong> ${item.grade} (${item.major})</p>`,
  );
console.log(fancyCSList);
