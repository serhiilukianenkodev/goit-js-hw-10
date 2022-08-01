import './css/styles.css';
import debounce from 'lodash.debounce';
import {fetchCountries} from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(evt){
    const queryValue = evt.target.value.trim()
    console.log(queryValue);

    fetchCountries(queryValue)
    .then(data => {
        console.log(data);
        // console.log(data[0].capital);
    })
}
