import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "pivotal-ui/react/copy-to-clipboard";
import { ThemeProvider } from './themeContext';
import Toggle from './themeToggle';
function Quote() {
  const [quoteText, setQuote] = useState("");
  const [quoteAuthor, setAuthor] = useState("");
  const [quoteGenre, setGenre] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    let url = `https://quote-garden.herokuapp.com/api/v3/quotes/random`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let dataQuotes = data.data;
        let randomQuote = dataQuotes[0];
        console.log(randomQuote);
        console.log(randomQuote.quoteText);
        console.log(randomQuote.quoteAuthor);
        setQuote(randomQuote.quoteText);
        setAuthor(randomQuote.quoteAuthor);
        setGenre(randomQuote.quoteGenre);
      });
  };

  const handleClick = () => {
    getQuote();
  };
  
  return (
    <ThemeProvider>
    <div>
      <div class="dark:bg-indigo-800 bg-blue-200 h-screen w-full flex flex-col justify-center items-center">
        <div class="relative max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto">
          <div class="py-4 px-8 mt-3">
            <div className=" absolute top-3 right-3 ">
            <Toggle />
            </div>
          <h2 className="dark:text-blue-200 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate md:text-center">Quotes Garden</h2>
            <div class="flex flex-col mb-8"></div>
            <div class="relative bg-gray-100 rounded-lg">
              <div class="py-4 px-4">
                <div class="flex flex-col">
                  <h1 class="dark:red text-lg font-semibold mb-3">" {quoteText}"</h1>
                  <div class="flex flex-col text-sm text-gray-500">
                    <span class="mb-1">- {quoteAuthor}</span>
                  </div>
                  
                </div>
                
              </div>
              <div className=" absolute bottom-0 right-0 h-10 w-10">
                  <CopyToClipboard  text={quoteText}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 float-right"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </CopyToClipboard>
              </div>
            </div>
          </div>
          <div className="flex items-center mb-10">
            <div className="flex-grow  px-4 py-2 m-2">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-blue-200 uppercase last:mr-0 mr-1">
                {quoteGenre}
              </span>
            </div>
            
            <div className="flex-grow text-right px-4 py-2 m-2 ">
              
              <button
                onClick={handleClick}
                className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span className="pl-2">New Quote</span>
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default Quote;
