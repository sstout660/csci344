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
  showProfileHeader();
  showSuggestions();
  showStories();
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

  // console.log(posts);

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
                        ${getLikeButton(post)}
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${getBookmarkButton(post)}
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

function getLikeButton(post) {
  if (post.current_user_like_id !== undefined) {
    return `
      <button aria-label="Unlike button" onclick="unLike(${post.current_user_like_id})">
        <i class="fas fa-heart text-red-500"></i>
      </button>
    `;
  } else {
    return `
      <button aria-label="Like button" onclick="like(${post.id})">
        <i class="far fa-heart"></i>
      </button>`;
  }
}

async function like(postId) {
  // build the /api/likes/ endpoint
  const endpoint = "/api/likes/";

  const postData = {
    post_id: postId,
  };
  // issue a POST request with fetch(...)
  const response = await fetch(`${rootURL}/api/likes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();

  // include your bearer token in the Authorization header
  // send the post id in the request body
  // inspect the response JSON
  // refresh or redraw the post after the request succeeds
}

async function unLike(likeId) {
  // build the /api/likes/ endpoint
  const endpoint = `${rootURL}/api/likes/${likeId}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
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
    <button class="text-blue-500 link">View all ${post.comments.length} comments</button>
    <p class="text-sm mb-3">
      <strong>${post.comments[0].user.username}</strong>
        ${post.comments[0].text}
    </p>
    `;
  }
  // if there are no comments, return an empty string
  // if there is exactly one comment, render just that comment
  // if there is more than one comment:
  // render a "view all n comments" button
  // render only the most recent comment underneath it
  // return the HTML string for whichever case applies
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id !== undefined) {
    return `
      <button aria-label="unBookmark button" onclick="unBookmark(${post.current_user_bookmark_id})">
        <i class="fas fa-bookmark"></i>
      </button>
    `;
  } else {
    return `
      <button aria-label="Bookmark button" onclick="bookmark(${post.id})">
        <i class="far fa-bookmark"></i>
      </button>`;
  }
}

async function bookmark(postID) {
  const endpoint = "/api/bookmarks/";

  const postData = {
    post_id: postID,
  };

  const response = await fetch(`${rootURL}/api/bookmarks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);
}

async function unBookmark(bookmarkId) {
  const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
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

async function showProfileHeader() {
  // fetch the current user's profile data from /api/profile
  const response = await fetch(`${rootURL}/api/profile/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  // select the container where the profile header should go
  const headerEl = document.querySelector("#profile-header");
  // build an HTML string for the user's image + username
  const html = `
      <img src=${data.thumb_url} class="rounded-full w-16" />
      <h2 class="font-Comfortaa font-bold text-2xl">${data.username}</h2>`;
  // insert that HTML into the DOM
  headerEl.insertAdjacentHTML("beforeend", html);
}

async function showSuggestions() {
  // fetch the suggested accounts from /api/suggestions
  const response = await fetch(`${rootURL}/api/suggestions/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  // console.log(data);
  // select the container where the suggestions should go
  const suggestionsEl = document.querySelector("#suggestions");
  // loop through or map over the returned accounts
  data.forEach((suggestion) => {
    const HTML = suggestionToHTML(suggestion);
    suggestionsEl.insertAdjacentHTML("beforeend", HTML);
  });
  // build an HTML string for each suggested account
  // insert the combined HTML into the DOM
}

function suggestionToHTML(suggestion) {
  return `<section class="flex justify-between items-center mb-4 gap-2">
    <img src=${suggestion.thumb_url} class="rounded-full" />
    <div class="w-[180px]">
      <p class="font-bold text-sm">${suggestion.username}</p>
      <p class="text-gray-500 text-xs">suggested for you</p>
    </div>
    <button class="text-blue-500 text-sm py-2">follow</button>
  </section>`;
}

async function showStories() {
  // fetch the stories from /api/stories
  const response = await fetch(`${rootURL}/api/stories/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);
  // select the stories container
  const storiesEl = document.querySelector("#stories");
  // loop through or map over the returned stories
  // build an HTML string for each story
  data.forEach((story) => {
    const HTML = storyToHTML(story);
    storiesEl.insertAdjacentHTML("beforeend", HTML);
  });
  // insert the combined HTML into the DOM
}

function storyToHTML(story) {
  return `
  <div class="flex flex-col justify-center items-center">
    <img src=${story.user.thumb_url} class="rounded-full border-4 border-gray-300" />
    <p class="text-xs text-gray-500">${story.user.username}</p>
   </div>
  `;
}

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
