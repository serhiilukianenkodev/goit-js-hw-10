import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info')
}

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(evt){
    const queryValue = evt.target.value.trim()

    if (!queryValue) {
        clearElems()
        return        
    }

    fetchCountries(queryValue)
    .then(data => {
       
        if (data.length === 1) {
            clearElems();
            showCountry(data[0]);
            return;
        }

        if (data.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            clearElems()
            return}

        clearElems();
        showCountriesList(data);
    }).catch(error => {
    Notify.failure('Oops, there is no country with that name')
    clearElems()
})
}



function showCountriesList(data){
    // console.log(data);
    const markup = data.map(({flags, name}) => {
        return `<li class = "country-item"><img src="${flags.svg}" alt="flag of ${name.official}" class = "country-img">${name.official}</li>`
    }).join('')

    refs.countryListEl.innerHTML= markup;
}

function showCountry(country){
    // console.log(country);
    const {flags: {svg}, name: {official}, capital, languages, population} = country
    const markup = `
    <div class = "country-about">
        <img src="${svg}" alt="flag of ${official}" class = "country-img">
        <p class="country">${official}</p>
    </div>
    <p><span>Capital: </span>${capital}</p>
    <p><span>Population: </span>${population}</p>
    <p><span>Languages: </span>${Object.values(languages).join(', ')}</p>`;

    refs.countryInfoEl.innerHTML = markup;
}

function clearElems() {
    refs.countryListEl.innerHTML = '';
    refs.countryInfoEl.innerHTML = '';
}
