
// Function to fetch and display Markdown content
function fetchMarkdownFiles(filename) {
    console.log(filename);
    fetch(`Source/${filename}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(markdownText => {
            // Reset Table of content list
            TOCList = [];
            // Convert Markdown to HTML
            const htmlOutput = formatMarkdownToHTML(markdownText, filename);
            console.log(htmlOutput);
            markdown_content = document.getElementById('markdownContent');
            
            console.log(markdown_content);
            // Display the HTML output
            markdown_content.innerHTML = htmlOutput;
        
            renderMathInElement(markdown_content);

            hljs.highlightAll();
            document.title = filename.slice(0, -3);
            generateTableOfContents();
        })
        .catch(error => {
            console.error('There was a problem fetching the Markdown file:', filename, error);
        });
}

let TOCList = [];//table of content header list
function formatHeader(line) {
    let i = 0;
    while (line[i] == "#") {
        i += 1;
    }
    const headerText = line.slice(i).trim();
    const headerId = headerText.toLowerCase().replace(/\s+/g, '-'); // Generate an id for the header
    TOCList.push({ level: i, text: headerText, id: headerId });
    return `<h${i} id="${headerId}">${headerText}</h${i}>`;
}

function convertAllMarkdownTableToHTML(text) {
    let convertedText = '';
    let tableBlock = '';
    const lines = text.split('\n');
    let isTableBlock = false;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('|')) {
            if (!isTableBlock) { // Beginning of a table block
                isTableBlock = true;
            }
            tableBlock += trimmedLine + '\n';
        } else {
            if (isTableBlock) { // End of table block
                isTableBlock = false;
                convertedText += convertMarkdownTableToHTML(tableBlock);
                tableBlock = '';
            }
            convertedText += '\n'+line + '\n';
        }
    });

    if (isTableBlock) { // If there's a table block at the end of the text
        convertedText += convertMarkdownTableToHTML(tableBlock);
    }

    return convertedText;
}

function convertMarkdownTableToHTML(markdown) {
    const lines = markdown.split('\n').filter(line => line.trim() !== '');
    let html = '<table>';
    let headerProcessed = false;

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('|')) {
            const cells = trimmedLine.slice(1, -1).split('|').map(cell => cell.trim());
            if (!headerProcessed) {
                html += '<thead><tr>';
                cells.forEach(header => {
                    html += `<th>${header}</th>`;
                });
                html += '</tr></thead><tbody>';
                headerProcessed = true;
            } else {
                if (cells.every(cell => cell.match(/^-+$/))) {
                    return; // Skip the separator line
                }
                html += '<tr>';
                cells.forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            }
        }
    });

    html += '</tbody></table>';
    return html;
}

function formatMarkdownToHTML(markdownText, title) {
    let htmlText = `<h1 id="Title">${title.slice(0, -3)}</h1><br>`;
    htmlText += convertAllMarkdownTableToHTML(markdownText); // First convert tables
    htmlText = detectMarkdownExpression(htmlText); // Then detect other markdown expressions
    htmlText = formatSpace(htmlText); // Finally format spaces and headers
    console.log(htmlText);
    return htmlText;
}

const notePaths = {};

function loadNotePaths() {
    fetch('files_parsed.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const lines = data.split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    const parts = line.split('/');
                    const noteName = parts[parts.length - 1].replace('.md', '').trim();
                    notePaths[noteName] = line.trim();
                }
            });
        })
        .catch(error => console.error('Error loading note paths:', error));
}

function detectMarkdownExpression(markdownText) {
    return markdownText
        .replace(/\n/g, '<br>') // Replace line breaks with <br> tags
        // You can add more basic Markdown-to-HTML conversion rules here as needed
        // For example, convert bold text:
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert italic text:
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\$\$(.*?)\$\$/g, '<p>\\[$1\\]</p>')
        .replace(/\$(.*?)\$/g, (match, p1) => `\\(${p1}\\)`)
        // Convert internal links:
        .replace(/\[\[(.*?)\]\]/g, (match, p1) => {
            const notePath = notePaths[p1.trim()];
            if (notePath) {
                return `<a href="#" onclick="fetchMarkdownFiles('${notePath}')">${p1.trim()}</a>`;
            } else {
                return `<a href="#" class="notFound">${p1.trim()}</a>`;
            }
        });
}

function closeParagraph(index) {
    if (index == 0) {
        return "";
    }else if (index == 1) {
        return "</p>";
    } else if (index == 2) {
        return "</ul>";
    }
}

// Function to format space, create <p> for text, <h1> for title, ect...
function formatSpace(text) {
    const lines = text.split('<br>');
    
    let htmlOutput = '';
    
    let currentSection = 0; // Variable pour suivre le dernier type de ligne traitée (0: autre, 1: paragraphe, 2:list, 3:code bloc)
    
    for (const line of lines) {
        console.log(line);
        if (currentSection == 3){
            if (line.startsWith('```')){
                currentSection = 0; //* end of code block
                htmlOutput += `</pre></code>`
            }else{
                htmlOutput += line+"<br>";
            }
        }
        else if (line.startsWith('#')) { //* Title 
            htmlOutput += closeParagraph(currentSection);  //* Close section according to last section
            htmlOutput += formatHeader(line); //* Create header lvl
            currentSection = 0; //* Set current section to title
        // } else if (line.startsWith('|')) { //* Table
        //     htmlOutput += closeParagraph(currentSection);  //* Close section according to last section
        //     htmlOutput += convertMarkdownTableToHTML(line); //* Convert markdown table to HTML
        //     currentSection = 0; //* Set current section to table
        } else if(line.startsWith('```')){
            currentSection = 3; //* Set current section to code bloc
            htmlOutput += `<pre><code class="language-${line.slice(3)}">`;
        } else if (line.startsWith('- ')) {
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
            htmlOutput += closeParagraph(currentSection);  //* Close section according to last section
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
loadNotePaths();

// Explorer section
document.addEventListener('DOMContentLoaded', () => {
    fetch('files_parsed.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const filePaths = data.split('\n').filter(path => path.trim() !== '');
            const sortedPaths = filePaths.sort();
            const fileTree = buildFileTree(sortedPaths);
            const explorerList = document.getElementById('fileExplorer');
            renderFileTree(fileTree, explorerList);
        })
        .catch(error => console.error('Error loading file paths:', error));
});

function buildFileTree(paths) {
    const tree = {};

    paths.forEach(path => {
        const parts = path.split('/');
        let currentLevel = tree;

        parts.forEach(part => {
            if (!currentLevel[part]) {
                currentLevel[part] = {};
            }
            currentLevel = currentLevel[part];
        });
    });
    return tree;
}

function buildPath(tree, key) {
    let path = key;
    let parent = tree;
    while (parent) {
        const parentKey = Object.keys(parent)[0]; // Obtenir le parent de la clé actuelle
        if (parentKey) {
            path = `${parentKey}/${path}`; // Construire le chemin complet avec le parent
            parent = parent[parentKey];
        } else {
            parent = null;
        }
    }
    return path;
}

function renderFileTree(tree, parentElement, currentPath = '') {
    if (!parentElement) {
        console.error('Parent element is null');
        return;
    }

    Object.keys(tree).forEach(key => {
        const li = document.createElement('li');
        li.textContent = key;

        if (Object.keys(tree[key]).length > 0) {
            const ul = document.createElement('ul');
            renderFileTree(tree[key], ul, `${currentPath}${key}/`);
            li.appendChild(ul);
        } else {
            const filePath = `${currentPath}${key}`; // Construire le chemin complet du fichier
            li.onclick = () => fetchMarkdownFiles(filePath);
            li.classList.add('file');
        }

        parentElement.appendChild(li);
    });
}

// Table of contents
function generateTableOfContents() {
    const tocContainer = document.getElementById('tableOfContents');
    let tocHTML = '<h2>Table of Contents</h2><ul>';

    TOCList.forEach(item => {
        tocHTML += `<li class="TOCElement toc-level-${item.level}"><a href="#${item.id}">${item.text}</a></li>`;
    });

    tocHTML += '</ul>';
    tocContainer.innerHTML = tocHTML;
}
