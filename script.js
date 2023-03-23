const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

var allQuotes = [];

// show loading spinner
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// complete loading, remove loading spinner
function removeLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// get single new quote from array
function newQuote() {
  showLoadingSpinner();
  // genrate random quote from allQuote array
  const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];

  // if author is null replace text with "Unknown"
  if (!quote.author) {
    authorText.innerText = "-Unknown";
  } else {
    authorText.innerText = `-${quote.author}`;
  }
  // if quote text length is greater than 120 add long-text class else remove it.
  if (quote.text.length > 120) {
    quoteText.classList.add("long-text");
  } else {
    quoteText.classList.remove("long-text");
  }

  //   set quote text and trun off loading
  quoteText.innerText = quote.text;
  removeLoadingSpinner();
}

// function to fetch quote data from api
async function getQuotes() {
  showLoadingSpinner();
  // quotes api url
  const url = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

  try {
    const response = await fetch(url);

    allQuotes = await response.json();

    newQuote();
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
}

// tweet quote to tweeter
function tweetQuote() {
  // tweet url
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(tweetUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuotes);

// OnLoad (calling getQuote function to load quote)
getQuotes();
