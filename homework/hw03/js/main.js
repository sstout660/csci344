// requires utilities.js to be loaded first:
// included in index.html

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "sstout"; // change to your username :)
let password = "password";

async function initializeScreen() {
  token = await getToken();
  showNav();
  // invoke all of the Part 1 functions here
  showPosts();
}

// Fetch and display the posts:
async function showPosts() {
  // fetch the posts from /api/posts
  const endpoint = `${rootURL}/api/posts/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const posts = await response.json();

  console.log(posts);

  const postsEl = document.querySelector("#posts");
  posts.forEach((post) => {
    const HTML = postToHTML(post);
    postsEl.insertAdjacentHTML("beforeend", HTML);
  });
}

function postToHTML(post) {
  return `
     <section class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        <button><i class="far fa-heart"></i></button>
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        <button><i class="far fa-bookmark"></i></button>
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} Likes</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption} <button class="button">more</button>
                    </p>
                </div>
                ${getComments(post)}
                <p class="uppercase text-gray-500 text-xs">1 day ago</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>
        `;
}

function getComments(post) {
  if (post.comments.length == 0) {
    return "";
  } else if (post.comments.length == 1) {
    return `
        <p class="text-sm mb-3">
                <strong>${post.comments[0].user.username}</strong>
                ${post.comments[0].text}
            </p>
        `;
  } else {
    return `
    <button onclick="">view all </button>
    `;
  }
  // if there are no comments, return an empty string
  // if there is exactly one comment, render just that comment
  // if there is more than one comment:
  //     render a "view all n comments" button
  //     render only the most recent comment underneath it
  // return the HTML string for whichever case applies
}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
