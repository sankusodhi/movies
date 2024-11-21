
async function searchMovie() {
    const movieName = document.getElementById('movieName').value;
    const apiKey = '61621865';
    const url = `http://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    const response = await fetch(url);
    const movie = await response.json();

    if (movie.Response === "True") {
        document.getElementById('movieInfo').innerHTML = `
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
            <img src="${movie.Poster}" alt="Movie Poster">
            <p><a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">Watch on IMDb</a></p>
            <button class="share-btn" onclick="shareMovie('${movie.Title}', '${movie.Poster}', '${movie.imdbID}')">Share This Movie</button>
        `;
        document.getElementById('searchContainer').classList.add('hidden');
        document.getElementById('movieInfoContainer').classList.add('visible');
    } else {
        document.getElementById('movieInfo').innerHTML = `<p>Movie not found!</p>`;
    }
}
function shareMovie(title, poster, imdbID) {
    const shareText = `Check out this movie: ${title}!\nIMDB link: https://www.imdb.com/title/${imdbID}`;
    const shareUrl = `https://www.imdb.com/title/${imdbID}`;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText,
            url: shareUrl
        }).catch(err => console.error('Error sharing:', err));
    } else {
        // Fallback to a simple copy-to-clipboard mechanism
        const textToCopy = `${shareText}\n${shareUrl}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Movie link copied to clipboard!');
        }).catch(err => {
            console.error('Copy to clipboard failed', err);
        });
    }
}

