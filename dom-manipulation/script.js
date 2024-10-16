// Load quotes from localStorage if available, otherwise use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Be yourself; everyone else is already taken.", category: "Individuality" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance & Success" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Leadership & Social Justice" }
  ];
  
  // Get references to the DOM elements
  const quoteDisplay = document.getElementById('quoteDisplay');
  const newQuoteButton = document.getElementById('newQuote');
  
  // Function to save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
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
  
      // Save updated quotes to localStorage
      saveQuotes();
  
      // Clear the input fields
      document.getElementById('newQuoteText').value = '';
      document.getElementById('newQuoteCategory').value = '';
  
      // Optionally display the new quote added
      alert('New quote added successfully!');
    } else {
      alert('Please enter both quote text and category!');
    }
  }
  
  // Function to export quotes as JSON file
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    // Create a download link and simulate click
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'quotes.json';
    downloadLink.click();
  
    // Revoke the object URL after download
    URL.revokeObjectURL(url);
  }
  
  // Function to import quotes from a JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes); // Merge new quotes with existing
      saveQuotes(); // Save the updated quotes to localStorage
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
  
  // Event listener for the "Show New Quote" button
  newQuoteButton.addEventListener('click', showRandomQuote);
  
  // Call the function to create the form when the page loads
  createAddQuoteForm();
  