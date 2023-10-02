async function searchMovies() {
  const apiKey = "dbbe35e";

  const movieTitle = document.getElementById("movieTitle").value;
  const movieYear = document.getElementById("movieYear").value;

  if (!movieTitle) {
    alert("Please enter a movie title.");
    return;
  }

  if (!movieYear) {
    alert("Please enter a movie Year.");
    return;
  }

  let url = `http://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      const movieResults = document.getElementById("movieResults");
      movieResults.innerHTML = "";

      const movieList = document.createElement("ul");
      movieList.classList.add("movie-list");

      let moviesToDisplay = data.Search;

      if (movieYear) {
        moviesToDisplay = moviesToDisplay.filter(
          (movie) => movie.Year >= movieYear
        );
      }

      const movieItems = moviesToDisplay.map((movie) => {
        const movieItem = document.createElement("li");
        movieItem.classList.add("movie-item");
        movieItem.innerHTML = `
          <h2>${movie.Title}</h2>
          <p>Year: ${movie.Year}</p>
          <img src="${movie.Poster}" alt="${movie.Title} Poster">
        `;
        return movieItem;
      });

      movieItems.forEach((movieItem) => {
        movieList.appendChild(movieItem);
      });

      movieResults.appendChild(movieList);
    } else {
      displayErrorPopup("No movies found!");
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    displayErrorPopup("Error fetching movie data. Please try again later.");
  }
}

function displayErrorPopup(message) {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  const popup = document.createElement("div");
  popup.classList.add("popup");

  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.addEventListener("click", () => {
    popupContainer.remove();
  });

  const errorMessage = document.createElement("p");
  errorMessage.innerText = message;

  popup.appendChild(errorMessage);
  popup.appendChild(closeButton);
  popupContainer.appendChild(popup);
  document.body.appendChild(popupContainer);
}
