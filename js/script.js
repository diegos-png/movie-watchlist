const form = document.getElementById("movieForm");
const titleInput = document.getElementById("movieTitle");
const genreSelect = document.getElementById("genreSelect");
const message = document.getElementById("formMsg");
const movieList = document.getElementById("movieList");
const emptyMessage = document.getElementById("emptyListMsg");

const watchlist = {
  movies: [{ title: "The Princess Bride", genre: "Adventure", watched: false }],
  toggleWatched(index) {
    // TODO (Step 4)
  },
  removeMovie(index) {
    // TODO (Step 4)
  }
};

function saveMovies() {
  // TODO (Step 6)
}

function loadMovies() {
  // TODO (Step 6)
}

function renderMovies() {
  // TODO (Step 3)
  movieList.replaceChildren();

  watchlist.movies.forEach((movie, index) => {
    const card = document.createElement("li");
    const title = document.createElement("h3");
    title.textContent = movie.title;

    const details = document.createElement("p");
    details.textContent = movie.watched ? "Watched" : "Not watched";

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.textContent = movie.watched ? "Mark unwatched" : "Mark watched";
    toggleButton.addEventListener("click", () => {
      watchlist.toggleWatched(index)
      saveMovies();
      renderMovies();
    })

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
      watchlist.removeMovie(index);
      saveMovies();
      renderMovies();
    })

    card.append(title, details, toggleButton, removeButton);
    movieList.append(card)
  });

  if (watchlist.movies.length == 0) {
    emptyMessage.textContent = "Your watchlist is empty. Add a movie to get started"
  }
  else if (watchlist.movies.length > 0) {
    emptyMessage.textContent = ""
  }
}

form.addEventListener("submit", (event) => {
  // TODO (Step 5)
});

loadMovies();
renderMovies();