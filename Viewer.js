// Function to fetch and display Markdown content
function fetchAndDisplayMarkdown(filename) {
    fetch(`${filename}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(markdownText => {
            // Convert Markdown to HTML
            const htmlOutput = convertMarkdownToHTML(markdownText);
            
            // Display the HTML output
            document.getElementById('markdownContent').innerHTML = htmlOutput;
        })
        .catch(error => {
            console.error('There was a problem fetching the Markdown file:', error);
        });
}

// Function to convert Markdown to HTML (same as previous example)
function convertMarkdownToHTML(markdownText) {
    let htmlText = markdownText;
    // Add conversion rules here if needed
    return htmlText;
}

// Initial load
fetchAndDisplayMarkdown('Hello World!.md'); // Load a default Markdown file
