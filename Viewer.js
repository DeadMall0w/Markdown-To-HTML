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
            console.log(htmlOutput);
            markdown_content = document.getElementById('markdownContent');
            
            // Display the HTML output
            markdown_content.innerHTML = htmlOutput;
        
            renderMathInElement(markdown_content);

            hljs.highlightAll();
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
        .replace(/\$(.*?)\$/g, (match, p1) => `\\(${p1}\\)`);
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

    let currentSection = 0; // Variable pour suivre le dernier type de ligne traitée (0: autre, 1: paragraphe, 2:list, 3:code bloc)

    for (const line of lines) {
        if (currentSection == 3){
            if (line.startsWith('```')){
                currentSection = 0; //* end of code block
                console.log("End of code block: " + line)
                htmlOutput += `</pre></code>`
            }else{
                htmlOutput += line+"<br>";
                console.log(line+"<br>");
            }
        }
        else if (line.startsWith('#')) { //* Title 
            htmlOutput += closeParagraph(currentSection);  //* Close section according to last section
            htmlOutput += formatHeader(line); //* Create header lvl
            currentSection = 0; //* Set current section to title

        }else if(line.startsWith('```')){
            console.log(line);
            currentSection = 3; //* Set current section to code bloc
            htmlOutput += `<pre><code class="language-${line.slice(3)}">`;


        }else if (line.startsWith('- ')) {
            if (currentSection == 2) { //* It's already a list section
                htmlOutput += `<li>${line.slice(2)}</li>`;//* Add the line and add <br>
            } else { //* Create a new text section
                htmlOutput += closeParagraph(currentSection);  //* Close section according to last section
                htmlOutput += `<ul><li>${line.slice(2)}</li>`;
            }
            currentSection = 2; //* Set the current section to text 

        } else if (line.trim() !== '') { //* It's a <p>
            if (currentSection == 1) { //* It's already a text section
                htmlOutput += `${line}<br>`;//* Add the line and add <br>
            } else { //* Create a new text section
                htmlOutput += closeParagraph(currentSection);  //* Close section according to last section
                htmlOutput += `<p>${line}`;
            }
            currentSection = 1; //* Set the current section to text
        } else if (line.trim() == '') {
            currentSection = 0;
        } else {
            htmlOutput += line;
        }
    }

    if (currentSection == 1) {
        htmlOutput += "</p>";
    }
    return htmlOutput;
}

// Initial load
fetchMarkdownFiles('Hello World !.md'); // Load a default Markdown file
