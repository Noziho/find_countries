const searchBar = document.querySelector('#search');
const mainContainer = document.querySelector('#container');
const button = document.querySelector('#button');

function getInformations (response) {
    for (const responseElement of response) {
        let countrieContainer = document.createElement('div');
        countrieContainer.className = "country";
        let name = document.createElement('p');
        let flag = document.createElement('p');
        name.innerText = responseElement.name.common;
        flag.innerText = responseElement.flag;
        countrieContainer.prepend(flag);
        countrieContainer.append(name);
        mainContainer.append(countrieContainer);
    }
}

fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(response => {
        getInformations(response);
    })

let inputData= '';

button.addEventListener('click', (e) => {
  inputData = '';
  searchBar.value = '';
})
searchBar.addEventListener('input', (e) => {
    inputData+= e.data;
    fetch(`https://restcountries.com/v3.1/name/${inputData}`)
        .then(response => response.json())
        .then(response => {
            let countries = document.querySelectorAll('.country');
            for (const country of countries) {
                country.remove();
            }
            getInformations(response);
        })
})

