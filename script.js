const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=8&sort_by=popularity.desc";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTg2NWQ0MDM3ZTEyZWZiOGFlMmRhMDUyNzlhZmVjMCIsIm5iZiI6MTcyMDY5NjkzNS41NDg5NDQsInN1YiI6IjY2OGZiZGNkMmM3MTUzYTZmOWU2YTU5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-YrWb4hyZ8lnwWqpK7bNsFXc5sTnWezWW3Uy30ZEHyY",
  },
};

async function displayMovies() {
  const response = await fetch(apiUrl, options);
  const data = await response.json();
  console.log(data);
  

  // setting variables for html content of different movie categories
  let actionHtmlContent = "";
  let crimeHtmlContent = "";
  let dramaHtmlContent = "";
  let romanceHtmlContent = "";
  let adventureHtmlContent = "";

  //Browsing through the api
  data.results.forEach((element) => {
    const imageUrl = element.poster_path
      ? `https://image.tmdb.org/t/p/w500${element.poster_path}`
      : "placeholder.jpg"; // Use a placeholder if the image is missing

    //setting cards format
    const cardContent = `<div class="cards">
    <a href=details.html?movie-id=${element.id}>
              <div class="card-img">
                <img src="${imageUrl}" alt="" />
              </div>
              <div class="card-content">
                <div class="movie-title">
                  <p>${element.title}</p>
                </div>
                <div class="year-time">
                  <em><p class="year">${
                    element.release_date.split("-")[0]
                  }</p></em>
                  <p class="time">2 h 30min</p>
                </div>
                <div class="rating-age">
                  <p class="rating">Rating: ${
                    Math.round(element.vote_average * 10) / 10
                  }</p>
                  <div class="age">
                    <p>${element.original_language}</p>
                  </div>
                </div>
              </div>
              </a>
            </div>`;
            

    //setting conditions for classifying movies according to their genres
    if (element.genre_ids.includes(28)) {
      actionHtmlContent += cardContent;
    }

    if (element.genre_ids.includes(80)) {
      crimeHtmlContent += cardContent;
    }
    if (element.genre_ids.includes(18)) {
      dramaHtmlContent += cardContent;
    }
    if (element.genre_ids.includes(10749)) {
      romanceHtmlContent += cardContent;
    }
    if (element.genre_ids.includes(12)) {
      adventureHtmlContent += cardContent;
    }
  });

  //adding the content to their various genres in webpage
  const actionGrid = document.getElementById("action-grid");
  if (actionGrid) {
    actionGrid.innerHTML = actionHtmlContent;
  }

  const crimeGrid = document.getElementById("crime-grid");
  if (crimeGrid) {
    crimeGrid.innerHTML = crimeHtmlContent;
  }

  const dramaGrid = document.getElementById("drama-grid");
  if (crimeGrid) {
    dramaGrid.innerHTML = dramaHtmlContent;
  }
  const romanceGrid = document.getElementById("romance-grid");
  if (crimeGrid) {
    romanceGrid.innerHTML = romanceHtmlContent;
  }
  const adventureGrid = document.getElementById("adventure-grid");
  if (crimeGrid) {
    adventureGrid.innerHTML = adventureHtmlContent;
  }
}

async function searchMovie(movieName) {
  const apiName = `https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=89865d4037e12efb8ae2da05279afec0`;
  const response = await fetch(apiName);
  const data = await response.json();
  console.log(data);

  let result = document.getElementById("result");
  let searchHtmlContent = "";


  data.results.forEach((element) => {
    const imageUrl = element.poster_path ? `https://image.tmdb.org/t/p/w500${element.poster_path}` : "placeholder.jpg"; // Use a placeholder if the image is missing

    const cardContent = `<div class="cards">
    <a href=details.html?movie-id=${element.id}>
              <div class="card-img">
                <img src="${imageUrl}" alt="" />
              </div>
              <div class="card-content">
                <div class="movie-title">
                  <p>${element.title}</p>
                </div>
                <div class="year-time">
                  <em><p class="year">${
                    element.release_date.split("-")[0]
                  }</p></em>
                  <p class="time">2 h 30min</p>
                </div>
                <div class="rating-age">
                  <p class="rating">Rating: ${
                    Math.round(element.vote_average * 10) / 10
                  }</p>
                  <div class="age">
                    <p>${element.original_language}</p>
                  </div>
                </div>
              </div>
              </a>
            </div>`;

    searchHtmlContent += cardContent;
    
  });

  const resultContainer = document.querySelector(".result-container");
  if (resultContainer) {
    resultContainer.innerHTML = searchHtmlContent;
    resultContainer.classList.add("grids");
  }
}

searchBtn.addEventListener("click", () => {
  const movieName = searchInput.value;
  searchMovie(movieName);
});

searchInput.addEventListener("keypress", e =>{
  if (e.key === "Enter"){
    const movieName = searchInput.value;
    searchMovie(movieName);
  }
})


console.log(displayMovies());

document
  .querySelector(".container")
  .addEventListener("DOMContentLoaded", displayMovies);

// to implement the display more info, use the api url to fetch according to name and ceate a function that
// is going to collect the movie title from the selected element