// Initial set of quotes
let quotes = [
  { text: "Be yourself; everyone is already taken", author: "Oscar Wilde" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "In the end, we will remember not the words of our enemies, but the silence of our friends", author: "Martin Luther King Jr" }
];

// Get references to the DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteButton = document.getElementById('addQuoteButton');

// Function to display a random quote
function showRandomQuote() {
  // Generate a random index
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  // Clear previous content
  quoteDisplay.innerHTML = '';
  
  // Create a new paragraph to display the quote text
  const quoteTextElement = document.createElement('p');
  quoteTextElement.textContent = `"${randomQuote.text}" - ${randomQuote.author}`;
  
  // Append the paragraph to the quote display area
  quoteDisplay.appendChild(quoteTextElement);
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById('newQuoteText').value;
  const quoteAuthor = document.getElementById('newQuoteAuthor').value;
  
  // Check if both fields are filled
  if (quoteText !== '' && quoteAuthor !== '') {
    // Create a new quote object
    const newQuote = {
      text: quoteText,
      author: quoteAuthor
    };
    
    // Add the new quote to the quotes array
    quotes.push(newQuote);
    
    // Clear the input fields
    document.getElementById('newQuoteText').value = '';
    document.getElementById('newQuoteAuthor').value = '';
    
    // Optionally display the new quote added
    alert('New quote added successfully!');
  } else {
    alert('Please enter both quote text and author!');
  }
}

// Event listener for the "Show New Quote" button
newQuoteButton.addEventListener('click', showRandomQuote);

// Event listener for the "Add Quote" button
addQuoteButton.addEventListener('click', addQuote);
