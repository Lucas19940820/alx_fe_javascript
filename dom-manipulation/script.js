// Initial set of quotes
let quotes = [
    { text: "Be yourself; everyone else is already taken.", category: "Individuality" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance & Success" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Leadership & Social Justice" }
  ];
  
  // Get references to the DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  
  // Function to display a random quote
  function showRandomQuote() {
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // Clear previous content
    quoteDisplay.innerHTML = '';
    
    // Create a new paragraph to display the quote text
    const quoteTextElement = document.createElement('p');
    quoteTextElement.textContent = `"${randomQuote.text}" - ${randomQuote.category}`;
    
    // Append the paragraph to the quote display area
    quoteDisplay.appendChild(quoteTextElement);
  }
  
  // Function to dynamically create the quote input form
  function createAddQuoteForm() {
    // Create a container for the form
    const formContainer = document.createElement('div');
  
    // Create the input field for the new quote
    const quoteTextInput = document.createElement('input');
    quoteTextInput.setAttribute('id', 'newQuoteText');
    quoteTextInput.setAttribute('placeholder', 'Enter a new quote');
    
    // Create the input field for the quote category
    const categoryInput = document.createElement('input');
    categoryInput.setAttribute('id', 'newQuoteCategory');
    categoryInput.setAttribute('placeholder', 'Enter quote category');
    
    // Create the "Add Quote" button
    const addQuoteButton = document.createElement('button');
    addQuoteButton.textContent = 'Add Quote';
    addQuoteButton.addEventListener('click', addQuote);
    
    // Append the inputs and button to the form container
    formContainer.appendChild(quoteTextInput);
    formContainer.appendChild(categoryInput);
    formContainer.appendChild(addQuoteButton);
    
    // Append the form container to the body (below the existing content)
    document.body.appendChild(formContainer);
  }
  
  // Function to add a new quote
  function addQuote() {
    const quoteText = document.getElementById('newQuoteText').value;
    const quoteCategory = document.getElementById('newQuoteCategory').value;
    
    // Check if both fields are filled
    if (quoteText !== '' && quoteCategory !== '') {
      // Create a new quote object
      const newQuote = {
        text: quoteText,
        category: quoteCategory
      };
      
      // Add the new quote to the quotes array
      quotes.push(newQuote);
      
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
      
      // Optionally display the new quote added
      alert('New quote added successfully!');
    } else {
      alert('Please enter both quote text and category!');
    }
  }
  
  // Event listener for the "Show New Quote" button
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  // Call the function to create the form when the page loads
  createAddQuoteForm();
  