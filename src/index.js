import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')

inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(evt){
    const queryValue = evt.target.value.trim()
    console.log(queryValue);

    fetch(`https://restcountries.com/v3.1/name/${queryValue}?fields=name,capital,population,flags,languages`)
    .then(responce => responce.json())
    .then(data => {
        console.log(data);
        // console.log(data[0].capital);
    })
}

