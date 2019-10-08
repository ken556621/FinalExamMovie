(function(){
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = [];
    const catogoryList = document.getElementById('catogoryList');
    const dataPanel = document.getElementById('dataPanel'); 

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
    
    //01.catogory select
    let movieCatogory = [];
    
    function catogorySelect(event){

    }

    //02.gerenateTemplate
    function generateTemplate(){
        let htmlContent = '';
        movieCatogory.forEach(function(movie){
            htmlContent = `
            <div class="col-sm-3">
                <div class="card mb-2">
                    <img class="card-img-top " src="${POSTER_URL}${movie.image}" alt="Card image cap">
                    <div class="card-body movie-item-body">
                        <h5 class="card-title">${movie.title}</h5>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">More</button>
                        <button class="btn btn-danger btn-remove-favorite" data-id="${movie.id}">X</button>
                    </div>
                </div>
            </div>
            `
        })
        dataPanel.innerHTML = htmlContent;
    }

    //03.gerenateMenu
    function generateMenu(){
       const numberList = Object.keys(catogoryListData);
       const typeList = Object.values(catogoryListData);
       let htmlContent = '';
       for(let i = 0;i < numberList.length;i++){
            htmlContent += `
            <ul>
                <li data-id="${numberList[i]}">${typeList[i]}</li>
            </ul>
            `
       }
       catogoryList.innerHTML = htmlContent;
    }
    generateMenu();

    //listen
    catogoryList.addEventListener('click', catogorySelect);







}());