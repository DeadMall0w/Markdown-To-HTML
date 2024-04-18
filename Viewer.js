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
            const htmlOutput = formatMarkdownToHTML(markdownText, filename);
            
            markdown_content = document.getElementById('markdownContent');
            
            // Display the HTML output
            markdown_content.innerHTML = htmlOutput;
        
            renderMathInElement(markdown_content);

            document.title = filename.slice(0, -3);

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
    return `<h${i}>${line.slice(i)}</h${i}>`;
}


function formatMarkdownToHTML(markdownText, title){
    htmlText = `<h1 id="Title">${title.slice(0, -3)}</h1><br>`;
    htmlText += detectMarkdownExpression(markdownText);
    htmlText = formatSpace(htmlText);
    //htmlText +=
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
        .replace(/\$(.*?)\$/g, (match, p1) => `\\(${p1}\\)`); // Single-line equations
        // Convert single-line equations enclosed by $...$
        //.replace(/\$(.*?)\$/g, '<p class="myLatex">\\($1\\)</p>')
        // Convert multi-line equations enclosed by $$...$$
        //.replace(/\$\$(.*?)\$\$/g, '<p class="myLatex">\\[$1\\]</p>');
}


function closeParagraph(index){
    if (index == 0){
        return "";
    }else if (index == 1) {
        return "</p>";
    } else if (index == 2){
        return "</ul>";
    }
}
// Function to format space, create <p> for text, <h1> for title, ect...
function formatSpace(text) {
    const lines = text.split('<br>');
    
    let htmlOutput = '';

    let last = 0; // Variable pour suivre le dernier type de ligne traitée (0: autre, 1: paragraphe)

    for (const line of lines) {

        if (line.startsWith('#')) { //* Title 
            htmlOutput += closeParagraph(last);  //* Close section according to last section
            htmlOutput += formatHeader(line); //* Create header lvl
            last = 0; //* Set last section to title

        }else if (line.startsWith('- ')) {
            if (last == 2) { //* It's already a list section
                htmlOutput += `<li>${line.slice(2)}</li>`;//* Add the line and add <br>
            } else { //* Create a new text section
                htmlOutput += closeParagraph(last);  //* Close section according to last section
                htmlOutput += `<ul><li>${line.slice(2)}</li>`;
            }
            last = 2; //* Set the last section to text 

        } else if (line.trim() !== '') { //* It's a <p>
            if (last == 1) { //* It's already a text section
                htmlOutput += `${line}<br>`;//* Add the line and add <br>
            } else { //* Create a new text section
                htmlOutput += closeParagraph(last);  //* Close section according to last section
                htmlOutput += `<p>${line}`;
            }
            last = 1; //* Set the last section to text
        } else if (line.trim() == '') {
            last = 0;
        } else {
            htmlOutput += line;
        }
    }

    if (last == 1) {
        htmlOutput += "</p>";
    }
    return htmlOutput;
}

// Initial load
fetchMarkdownFiles('Hello World !.md'); // Load a default Markdown file
