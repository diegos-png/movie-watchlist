const form = document.getElementById("movieForm");
const titleInput = document.getElementById("movieTitle");
const genreSelect = document.getElementById("genreSelect");
const message = document.getElementById("formMsg");
const movieList = document.getElementById("movieList");
const emptyMessage = document.getElementById("emptyListMsg");

const watchlist = {
  movies: [],
  markFinished(index) {
    this.movies[index].watched = !this.movies[index].watched;
  },
  toggleWatched(index) {
    // TODO (Step 4)
    this.markFinished(index);
  },
  removeMovie(index) {
    // TODO (Step 4)
    this.movies.splice(index, 1)
  }
};

function saveMovies() {
  // TODO (Step 6)
  let jsonString = JSON.stringify(watchlist.movies)

  localStorage.setItem("movies", jsonString)
}

function loadMovies() {
  // TODO (Step 6)

  let storedData = localStorage.getItem("movies")
  if (!storedData) {
    return
  }
  try {
    let parsedData = JSON.parse(storedData)

    watchlist.movies = parsedData
  }
  catch {
    watchlist.movies = []
  }


}

function renderMovies() {
  // TODO (Step 3)
  movieList.replaceChildren();

  watchlist.movies.forEach((movie, index) => {
    const card = document.createElement("li");
    const title = document.createElement("h3");
    title.textContent = movie.title;

    const details = document.createElement("p");
    details.textContent = `${movie.genre} • ${movie.watched ? "Watched" : "Not watched"}`

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
  event.preventDefault();

  // saving title and genred
  const addMovieTitle = titleInput.value.trim()
  const addGenreSelect = genreSelect.value

  if (addMovieTitle == "") {
    message.textContent = "Enter a movie title."
    return;
  }
  else if (addGenreSelect == "Choose a genre") {
    message.textContent = "Choose a genre."
    return;
  }
  else {
    watchlist.movies.push({ title: addMovieTitle, genre: addGenreSelect, watched: false })
    message.textContent = ""
    titleInput.value = ""
  }
  saveMovies();
  renderMovies();
});

loadMovies();
renderMovies();
genreSelect.selectedIndex = 0