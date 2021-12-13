//const apiUrl = "https://api.themoviedb.org/3/movie/550?api_key=96d02017571e08961a0f88fe9a7641c0"

const api_url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=96d02017571e08961a0f88fe9a7641c0"
const image_path = "https://image.tmdb.org/t/p/w1280"
//const query_search = "https://api.themoviedb.org/3/search/movie?api_key={96d02017571e08961a0f88fe9a7641c0}&query=='"
const querySearch = 'https://api.themoviedb.org/3/search/movie?api_key=96d02017571e08961a0f88fe9a7641c0&query="'

// console.log(apiUrl)

const main = document.querySelector("#main")
const form = document.querySelector("#form")
const search = document.querySelector("#search")




getMovies(api_url)

async function getMovies(url){
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
    showMovies(data.results)
}




function showMovies(movies){

    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        
        movieEl.innerHTML = `
        <div id="card">
        <img src="${image_path + poster_path}" alt="${title}">

        <div class = "text">
            <h3>${title}</h3>

            <span>${vote_average}</span>
        </div>

        <div class="overview">
            <h3>Overview</h3>
            ${overview}

        </div>


        </div>`

        main.appendChild(movieEl)

    });
    
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== ''){
        getMovies(querySearch + searchTerm)
        search.value = ''
    }else{
        window.location.reload()
    }

    
})

