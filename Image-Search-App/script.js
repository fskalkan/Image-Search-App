const form = document.querySelector(".form");
const searchInput = document.querySelector(".search_input");
const searchButton = document.querySelector(".search_btn");
const clearButton = document.querySelector(".clear_btn");
const imagesList = document.querySelector(".images_wrapper");

runEventListener();

function runEventListener() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function clear(e) {
  searchInput.value = "";
  imagesList.innerHTML = "";
}

function search(e) {
  const inputValue = searchInput.value.trim().toLowerCase();

  fetch(`https://api.unsplash.com/search/photos?query=${inputValue}`, {
    method: "GET",
    headers: {
      //! Burada kendi Unsplash API Client-ID'nizi girin! Authorization: "Client-ID YOUR_CLIENT_ID
      Authorization: "Client-ID -",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      const dataValue = data.results;

      imagesList.innerHTML = "";

      Array.from(dataValue).forEach((img) => {
        addToImageUI(img.urls.small);
      });
    })
    .catch((err) => console.log(err));

  searchInput.value = "";
  e.preventDefault();
}

function addToImageUI(url) {
  const div = document.createElement("div");
  div.className = "images_list";

  const img = document.createElement("img");
  img.className = "image";
  img.setAttribute("src", url);
  img.height = "365";
  img.width = "365";

  div.appendChild(img);
  imagesList.appendChild(div);
}
