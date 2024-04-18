// Function to fetch and display Markdown content
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
            const htmlOutput = formatMarkdownToHTML(markdownText);
            
            // Display the HTML output
            document.getElementById('markdownContent').innerHTML = htmlOutput;
        })
        .catch(error => {
            console.error('There was a problem fetching the Markdown file:', error);
        });
}

function formatHeader(line){
    i = 0;
    while (line[i] == "#"){
        i+=1;
    }
    console.log(i);
    return `<h${i}>${line.slice(i)}</h${i}>`;
}


function formatMarkdownToHTML(markdownText){
    htmlText = detectMarkdownExpression(markdownText);
    htmlText = formatSpace(htmlText);
    return htmlText;
}

function detectMarkdownExpression(markdownText){
    return markdownText
        .replace(/\n/g, '<br>') // Replace line breaks with <br> tags
        // You can add more basic Markdown-to-HTML conversion rules here as needed
        // For example, convert bold text:
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert italic text:
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\$\$(.*?)\$\$/g, '<p>\\[$1\\]</p>')
        .replace(/\$(.*?)\$/g, (match, p1) => `<p>\\(${p1}\\)</p>`); // Single-line equations
}

// Function to format space, create <p> for text, <h1> for title, ect...
function formatSpace(text) {
    const lines = text.split('<br>');
    
    let htmlOutput = '';

    for (const line of lines) {
        if (line.startsWith('#')) {
            htmlOutput += formatHeader(line);
        } else if (line.trim() !== '') {
            htmlOutput += `<p>${line}</p>`;
        }else{
            htmlOutput += line
        }
    }

    return htmlOutput;
}

// Initial load
fetchMarkdownFiles('Hello World !.md'); // Load a default Markdown file
