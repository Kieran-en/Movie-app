const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTg2NWQ0MDM3ZTEyZWZiOGFlMmRhMDUyNzlhZmVjMCIsIm5iZiI6MTcyMDY5NjkzNS41NDg5NDQsInN1YiI6IjY2OGZiZGNkMmM3MTUzYTZmOWU2YTU5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-YrWb4hyZ8lnwWqpK7bNsFXc5sTnWezWW3Uy30ZEHyY",
  },
};

// extracting movie-id from url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('movie-id');


if (movieId) {
  showDetails(movieId);
} else {
  console.error("No movie ID found in the URL");
}

//fetching movie using extracted id
async function showDetails(movieId) {
  const apiUrlId = `https://api.themoviedb.org/3/movie/${movieId}?api_key=89865d4037e12efb8ae2da05279afec0`;
  try {
    const response = await fetch(apiUrlId, options);
    const movie = await response.json();
    
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "placeholder.jpg";

    
    document.getElementById("container").innerHTML = `
      <div class="navbar">
        <a href="index.html"><i class="fa-solid fa-arrow-left"></i></a>
      </div>
          <div class="tittle">
            <h1>${movie.title}</h1>
          </div>
      <div class="contents">
        <div class="title">    
          <div class="yyyy">
            <div>${movie.release_date.split("-")[0]}</div> .
            <div class="lang">${movie.original_language}</div>. 
            <div>2h30</div>
          </div>
          <img src="${imageUrl}" alt="">
        </div>
        <div class="more">
          <p><b>Release Date:</b> ${movie.release_date.split("-").reverse().join("-")}</p>
          <p><b>Overview:</b> ${movie.overview}</p>
          <p><b>Popularity:</b> ${movie.popularity}</p>
          <p><b>Vote Count:</b> ${movie.vote_count}</p>
          <p class="rating"><b>Rating:</b> ${Math.round(movie.vote_average * 10) / 10}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error("Failed to fetch movie details", error);
  }
  
}

document
  .querySelector(".container")
  .addEventListener("DOMContentLoaded", showDetails);




