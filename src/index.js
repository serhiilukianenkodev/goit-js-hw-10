import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 1000;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info')
}
// const inputEl = document.querySelector('#search-box')

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(evt){
    const queryValue = evt.target.value.trim()
    console.log(queryValue);

    fetchCountries(queryValue)
    .then(data => {
        // console.log(data);
        showCountriesList(data);
        // console.log(data[0].capital);
    })
}

function showCountriesList(data){
    console.log(data);
    const markup = data.map(({flags, name}) => {
        console.log(flags.svg, name.official);
        return `<li class = "country-item"><img src="${flags.svg}" alt="flag of ${name.official}" class = "country-img">${name.official}</li>`
    }).join('')

    refs.countryListEl.innerHTML= markup;
}

// function 
