let currentHeroList;
let heroContainer = document.querySelector('.list');
let heroData = document.querySelector('.hero_cont');
let button = document.querySelector('.button');
let filmsBox = document.querySelector('#films_list');

fetch('https://swapi.dev/api/people/')
    .then(response => response.json())
    .then(obj => currentHeroList = obj.results)
    .then(e => heroesList(currentHeroList));

function heroesList(list) {
    for (let i = 0; i < list.length; i++) {
        (function(i) {
            let hero = document.createElement('div');
            hero.classList.add('hero');
            let heroBox = document.createElement('div');

            let heroName = document.createElement('span');
            heroName.innerText = list[i].name;
            heroBox.classList.add('box');
            heroBox.appendChild(heroName);
            hero.append(heroBox);
            heroBox.addEventListener('click', Hero);
            heroContainer.append(hero);
            hero.style.opacity = '1';
        })(i);
    }
}

function Hero(event) {
    heroContainer.parentElement.classList.toggle('zero_height');
    heroContainer.style.display = 'none';
    heroData.style.display = 'block';
    button.style.display = 'block';
    button.style.position = 'absolute';
    heroContainer.parentElement.classList.toggle('main_height');

    let selectedHero;
    for (let i = 0; i < currentHeroList.length; i++) {
        if (currentHeroList[i].name == event.target.innerText) {
            selectedHero = currentHeroList[i];
            break;
        }
    }

    document.querySelector('#name').innerText = selectedHero.name;
    document.querySelector('#gender').innerText = selectedHero.gender;
    document.querySelector('#birth_year').innerText = selectedHero.birth_year;
    getData(selectedHero.species, document.querySelector('#species'));
    getData(selectedHero.homeworld, document.querySelector('#planet'));
    getFilms(selectedHero);
}

button.addEventListener('click', backToList);
function backToList() {
    heroContainer.parentElement.style.height = '0px';
    heroContainer.style.display = 'flex';
    heroContainer.style.flexDirection = 'column';
    heroData.style.display = 'none';
    button.style.display = 'none';
    heroContainer.parentElement.style.height = '430px';
}
//species, homeworld, films
function getData(hero, info) {
    info.innerText = '';
    if (hero.length != 0) {
        fetch(hero)
            .then(response => response.json())
            .then(obj => {
                if (obj.name) {
                    info.innerText = obj.name;
                } else {
                    info. innerText = obj.title;
                }
            })
    } else {
        info.innerText = 'Human';
    }
}

function getFilms(hero) {
    filmsBox.innerHTML = '';

    for (let i = 0; i < hero.films.length; i++) {
        let li = document.createElement('li');
        getData(hero.films[i], li);
        filmsBox.append(li);
    }
}

