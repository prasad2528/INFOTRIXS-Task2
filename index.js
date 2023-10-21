let search = document.querySelector(".search-box");
document.querySelector("#search-icon").onclick = () => {
    search.classList.toggle("active");
}
let menu = document.querySelector(".list-items");
document.querySelector("#menu-icon").onclick = () => {
    menu.classList.toggle("active");
}
window.onscroll = () => {
    let navbar = document.querySelector(".navbar");
    navbar.classList.toggle('sticky', window.scrollY > 0);
    menu.classList.remove("active");
}
const businessBtn = document.getElementById("Business");
const entertainmentBtn = document.getElementById("Entertainment");
const generalBtn = document.getElementById("General");
const scienceBtn = document.getElementById("Science");
const sportsBtn = document.getElementById("Sports");
const technologyBtn = document.getElementById("Technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsDetails = document.getElementById("newsDetails");

let newsDataArray = []
    //apis
const apiKey = "1c317660bd974540adb9284e85e5b50d";
const general_news = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const bussiness_news = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const entertainment_news = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const sports_news = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const science_news = "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey=";
const technology_news = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=";
const search_news = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML = "<h4>General</h4>";
    fetchGeneralNews();
};

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>business</h4>";
    fetchBusinessNews();
})

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>entertainment</h4>";
    fetchEntertainmentNews();
})

generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>general</h4>";
    fetchGeneralNews();
})

scienceBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>science</h4>";
    fetchScienceNews();
})

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>sports</h4>";
    fetchSportsNews();
})
technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>technology</h4>";
    fetchTechnologyNews();
})
searchBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>search : " + newsQuery.value + "</h4>";
    fetchQueryNews();
})


const fetchBusinessNews = async() => {
    const response = await fetch(bussiness_news + apiKey);
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        console.log(response, response.status)
    }
    displayNews();
}


const fetchGeneralNews = async() => {
    const response = await fetch(general_news + apiKey);
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        console.log(response, response.status)
    }
    displayNews();
}

const fetchEntertainmentNews = async() => {
    const response = await fetch(entertainment_news + apiKey);
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        console.log(response, response.status)
    }
    displayNews();
}

const fetchScienceNews = async() => {
    const response = await fetch(science_news + apiKey);
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        console.log(response, response.status)
    }
    displayNews();
}

const fetchSportsNews = async() => {
    const response = await fetch(sports_news + apiKey);
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        console.log(response, response.status)
    }
    displayNews();
}

const fetchTechnologyNews = async() => {
    const response = await fetch(technology_news + apiKey);
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        console.log(response, response.status)
    }
    displayNews();
}

const fetchQueryNews = async() => {
    const response = await fetch(search_news + newsQuery.value + "&apiKey=" + apiKey);
    newsDataArray = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArray = myJson.articles;
    } else {
        console.log(response, response.status)
    }
    displayNews();
}

function displayNews() {
    newsDetails.innerHTML = "";
    if (newsDataArray.length == 0) {
        newsDetails.innerHTML = "<h5>NO Data Found</h5>";
        return;
    }
    newsDataArray.forEach(news => {
        let date = news.publishedAt.split("T");
        const col = document.createElement("div");
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        let card = document.createElement("div");
        card.className = "p-2";

        let image = document.createElement("img");
        image.classList.add("image")
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        let cardBody = document.createElement("div");
        let newsHeading = document.createElement("h5");
        newsHeading.classList.add("card-title");
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement("h6");
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        let description = document.createElement("p");
        description.classList.add("description");
        description.innerHTML = news.description;

        let link = document.createElement("a");
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read More"

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card)
        newsDetails.appendChild(col);
    });

}