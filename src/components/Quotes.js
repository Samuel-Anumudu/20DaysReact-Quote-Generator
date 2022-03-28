import React from 'react'
import { useState, useEffect } from 'react'
import Loader from '../components/Loader'

const Quotes = () => {
  const [allQuotes, setAllQuotes] = useState([])
  const [quote, setQuote] = useState({
    text: '',
    author: '',
    isLoading: true,
  })

  // Get Quote from API
  const fetchQuotes = async () => {
    const apiUrl = 'https://type.fit/api/quotes'
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()
      const randomQuote = Math.floor(Math.random() * data.length)
      const quoteText = data[randomQuote].text
      const quoteAuthor = data[randomQuote].author
      setQuote(() => {
        return {
          text: quoteText,
          author: quoteAuthor,
          isLoading: false,
        }
      })
      setAllQuotes(data)
    } catch (error) {
      //   Catch Error Here
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  // Generate Random Quotes
  function generateRandomQuote() {
    const randomQuote = Math.floor(Math.random() * allQuotes.length)
    const quoteText = allQuotes[randomQuote].text
    const quoteAuthor = allQuotes[randomQuote].author
    setQuote((prevState) => {
      return {
        ...prevState,
        text: quoteText,
        author: quoteAuthor,
      }
    })
  }

  // Tweet Quote
  function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`
    window.open(twitterUrl, '_blank')
  }

  return (
    <>
      {quote.isLoading ? (
        <Loader />
      ) : (
        <div className="quote-card">
          <div className="quote-text">
            <span className="fas fa-quote-left"></span>
            <span className="quote">{quote.text}</span>
            <h2 className="author">
              {!quote.author ? 'Unknown' : quote.author}
            </h2>
          </div>
          <div className="buttons">
            <button onClick={tweetQuote} className="twitter" title="tweet this">
              <span className="fab fa-twitter"></span>
            </button>
            <button onClick={generateRandomQuote} id="generate-quote">
              New Quote
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Quotes
