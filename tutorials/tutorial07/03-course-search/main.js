let searchTerm = "";
let openOnly = false;

function getInstructorString(course) {
  return course.Instructors.map((instructor) => instructor.Name).join(
    " &bull; ",
  );
}

function isClassOpen(course) {
  return course.Classification.Open;
}

function doesTermMatch(course) {
  if (searchTerm === "") {
    return true;
  }

  searchTerm = searchTerm.toLowerCase();

  let instructorMatch = getInstructorString(course)
    .toLowerCase()
    .includes(searchTerm);
  let titleMatch = course.Title.toLowerCase().includes(searchTerm);
  let crnMatch = course.CRN == searchTerm;
  let codeMatch = course.Code.toLowerCase().includes(searchTerm);

  return instructorMatch || titleMatch || crnMatch || codeMatch;
}

function dataToHTML(course) {
  return `<section class="course-card">
    <h2>${course.Code}: ${course.Title}</h2>
      ${getOpenClosedHTML(course)}
    <p>
       ${course.Days} &bull; ${course.Location.FullLocation} 201&bull; ${course.Hours} credit hour(s)
    </p>
    <p>
        <strong>${getInstructorString(course)}</strong>
    </p>
</section>`;
}

function getOpenClosedHTML(course) {
  if (!isClassOpen(course)) {
    return `<p class="status closed">
      <i class="fa-solid fa-circle-xmark"></i>
      Closed &bull; ${course.CRN} &bull; Number on Waitlist: ${course.WaitListAvailable}
    </p>`;
  } else {
    return `<p class="status open">
      <i class="fa-solid fa-circle-check"></i>
      Open &bull; ${course.CRN} &bull; Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}
    </p>`;
  }
}

function showMatchingCourses() {
  // 1. Get the .courses container element
  const containerEl = document.querySelector(".courses");
  // 2. Clear it
  containerEl.innerHTML = "";
  // 3. Start with courseList (from course-data.js)
  let matchingCourses = courseList.filter(doesTermMatch);
  if (openOnly) {
    matchingCourses = matchingCourses.filter(isClassOpen);
  }

  if (matchingCourses.length === 0) {
    containerEl.innerHTML = "No courses match your search.";
    return;
  }

  matchingCourses.forEach((course) => {
    const htmlSnippet = dataToHTML(course);
    containerEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });
}

function filterCourses() {
  searchTerm = document.querySelector("#search_term").value;
  openOnly = document.querySelector("#is_open").checked;
  showMatchingCourses();
}

showMatchingCourses();
