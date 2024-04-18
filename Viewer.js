function fetchMarkdownFiles(filename) {
    fetch(`Source/${filename}`)
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

// Function to convert Markdown to HTML
function convertMarkdownToHTML(markdownText) {
    // Convert Markdown to HTML (basic implementation)
    // Replace line breaks with <br> tags
    const htmlText = markdownText
        .replace(/\n/g, '<br>') // Replace line breaks with <br> tags
        // You can add more basic Markdown-to-HTML conversion rules here as needed
        // For example, convert bold text:
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert italic text:
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\$\$(.*?)\$\$/g, '<p>\\[$1\\]</p>')
        .replace(/\$(.*?)\$/g, (match, p1) => `<p>\\(${p1}\\)</p>`); // Single-line equations

    // Convert headers (assuming # for h1, ## for h2, etc.)
    //htmlText = htmlText.replace(/^#\s(.*?)$/gm, '<h1>$1</h1>');
    //htmlText = htmlText.replace(/^##\s(.*?)$/gm, '<h2>$1</h2>');
    //htmlText = htmlText.replace(/^###\s(.*?)$/gm, '<h3>$1</h3>');
    //htmlText = htmlText.replace(/^####\s(.*?)$/gm, '<h4>$1</h4>');
    //htmlText = htmlText.replace(/^#####\s(.*?)$/gm, '<h5>$1</h5>');
    //htmlText = htmlText.replace(/^######\s(.*?)$/gm, '<h6>$1</h6>');
    return htmlText;
}

// Initial load
fetchMarkdownFiles('Hello World !.md'); // Load a default Markdown file
