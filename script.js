let datosCitas;
let citaActual = "";
let autorActual="";

function getCitas() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        datosCitas = JSON.parse(jsonQuotes);
      }
    }
  });
}

function getCitaRandom() {
  return datosCitas.quotes[
    Math.floor(Math.random() * datosCitas.quotes.length)
  ];
}

function getCita() {
  let citaRandom = getCitaRandom();

  citaActual = citaRandom.quote;
  autorActual = citaRandom.author;

  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + citaActual + '" ' + autorActual)
  );

  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(citaRandom.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(citaRandom.author);
  });

}

$(document).ready(function () {
  getCitas().then(() => {
    getCita();
  });

  $('#new-quote').on('click', getCita);
});
