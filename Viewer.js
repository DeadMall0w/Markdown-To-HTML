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
    return `<h${i}>${line.slice(1)}</h${i}>`;
}

// Function to convert Markdown to HTML
function formatMarkdownToHTML(text) {
    const lines = text.split('\n');
    
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
