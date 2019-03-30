'use strict'

const apiKey = 'pnXYNmavlSN675lFyoHmKKcXWgTt6qb97PCMnXRK'
const searchURL = 'https://developer.nps.gov/api/v1/parks'

function formatUrlString(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJSON) {
  console.log(responseJSON)
  $('.parks').empty();
  for (let i = 0; i < responseJSON.data.length - 1; i++) {
    $('.parks').append(`
    <li><a href="${responseJSON.data[i].url}">${responseJSON.data[i].fullname}</a></li>
    <li>${responseJSON.data[i].description}</li>
    <li><a href="${responseJSON.data[i].directionsurl}">Directions</a></li>
    <br>
    `)
  }
  $('.results').removeClass('hidden');
}

function getParks(query, results) {
  const params = {
    api_key: apiKey,
    q: query,
    limit: results
  };

  const urlString = formatUrlString(params);
  const url = searchURL + '?' + urlString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then( responseJSON => displayResults(responseJSON))
    .catch(err => {
      $('.errorMessage').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').on('submit', event => {
    event.preventDefault();
    console.log('form submitted')
    const location = $('#location').val();
    const resultAmount = $('#resultAmount').val();
    getParks(location, resultAmount);
  })
}

$(watchForm)