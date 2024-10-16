// Load quotes from localStorage if available, otherwise use default quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "Be yourself; everyone else is already taken.", category: "Individuality" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance & Success" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Leadership & Social Justice" }
];

// Get references to the DOM elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const categoryFilter = document.getElementById('categoryFilter');

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to fetch quotes from the mock server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverQuotes = await response.json();

        // Simulate converting server quotes to our format
        const formattedServerQuotes = serverQuotes.map(item => ({
            text: item.title,
            category: "Server Updates" // Assign a default category for fetched quotes
        }));

        // Handle syncing with local data
        syncQuotes(formattedServerQuotes);
    } catch (error) {
        console.error('Error fetching quotes from server:', error);
    }
}

// Function to sync quotes
function syncQuotes(serverQuotes) {
    const newQuotes = [];

    serverQuotes.forEach(serverQuote => {
        // Check for conflicts: if the quote already exists in local storage
        const existingQuote = quotes.find(quote => quote.text === serverQuote.text);
        if (!existingQuote) {
            newQuotes.push(serverQuote); // Only add if not already existing
        } else {
            // Conflict resolution: Notify user and keep existing quote
            alert(`Conflict detected: "${existingQuote.text}" already exists. Keeping the local version.`);
        }
    });

    // Append new quotes to the local storage
    if (newQuotes.length > 0) {
        quotes.push(...newQuotes);
        saveQuotes();
        alert(`${newQuotes.length} new quotes added from the server!`);
    }
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
async function addQuote() {
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

        // Send new quote to the server
        await postNewQuote(newQuote);

        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Repopulate categories in the dropdown if a new category is introduced
        const existingCategories = [...new Set(quotes.map(quote => quote.category))];
        if (!existingCategories.includes(quoteCategory)) {
            populateCategories();
        }

        alert('New quote added successfully!');
    } else {
        alert('Please enter both quote text and category!');
    }
}

// Function to post a new quote to the server
async function postNewQuote(quote) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quote),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        console.log('New quote added on server:', responseData);
    } catch (error) {
        console.error('Error posting new quote:', error);
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

// Function to populate the category filter dropdown
function populateCategories() {
    // Clear existing options
    categoryFilter.innerHTML = '';

    // Get unique categories from the quotes array
    const categories = [...new Set(quotes.map(quote => quote.category))];

    // Add an "All Categories" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Categories';
    categoryFilter.appendChild(allOption);

    // Populate the dropdown with categories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = categoryFilter.value;

    // Clear the current quote display
    quoteDisplay.innerHTML = '';

    // Filter quotes based on the selected category
    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);

    // Display the filtered quotes
    filteredQuotes.forEach(quote => {
        const quoteTextElement = document.createElement('p');
        quoteTextElement.textContent = `"${quote.text}" - ${quote.category}`;
        quoteDisplay.appendChild(quoteTextElement);
    });

    // Save selected category to localStorage
    localStorage.setItem('selectedCategory', selectedCategory);
}

// Restore the last selected filter when the page loads
function restoreSelectedCategory() {
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = savedCategory;
    filterQuotes();
}

// Event listener for the "Show New Quote" button
newQuoteButton.addEventListener('click', showRandomQuote);

// Start periodic data fetching from the server
function startQuoteSync() {
    fetchQuotesFromServer();
    setInterval(fetchQuotesFromServer, 60000); // Check every 60 seconds
}

// Call functions to populate categories and restore last selected filter on page load
window.onload = function() {
    populateCategories();
    restoreSelectedCategory();
    createAddQuoteForm();
    startQuoteSync(); // Start syncing quotes with the server
};
