(function(){
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = [];
    const catogoryList = document.getElementById('catogoryList');
    const dataPanel = document.getElementById('dataPanel'); 
    let movieCatogory = [];

    catogoryListData = {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
      };
    
    //API 取得資料
    axios.get(INDEX_URL).then((response) => {
        data.push(...response.data.results);
    })
    
    //01.gerenateTemplate
    function generateTemplate(){
        let htmlContent = '';
        movieCatogory.forEach(function(movie){
            htmlContent += `
            <div class="col-sm-4">
                <div class="card mb-2">
                    <img class="card-img-top " src="${POSTER_URL}${movie.image}" alt="Card image cap">
                    <div class="card-body movie-item-body">
                        <h5 class="card-title">${movie.title}</h5>
                    </div>
                    <div class="card-footer">
                        ${gerenateMovieTypeTag(movie.genres)}
                    </div>
                </div>
            </div>
            `
        })
        dataPanel.innerHTML = htmlContent;
    }

    //02.gerenateMovieTypeTag
    function gerenateMovieTypeTag(tags){
        let movieTypeTag = '';
        tags.forEach(function(tag){
            movieTypeTag += `
            <span class="bg-primary rounded">${catogoryListData[tag]}</span>
            `
        })
        return movieTypeTag
    }

    //03.gerenateMenu
    function generateMenu(){
       const numberList = Object.keys(catogoryListData);
       const typeList = Object.values(catogoryListData);
       let htmlContent = '';
       for(let i = 0;i < numberList.length;i++){
            htmlContent += `
            <ul class="list-group">
                <li class="list-group-item" data-id="${numberList[i]}">${typeList[i]}</li>
            </ul>
            `
       }
       catogoryList.innerHTML = htmlContent;
    }
    generateMenu();

    //04.catogory select
    function catogorySelect(event){
        movieCatogory = [];
        data.forEach(function(movie){
            movie.genres.filter(function(type){
                if(Number(type) === Number(event.target.dataset.id)){
                    movieCatogory.push(movie)
                }
            })
        })
        generateTemplate();
    }

    //listen
    catogoryList.addEventListener('click', function(){
        catogorySelect(event)
    });
}());