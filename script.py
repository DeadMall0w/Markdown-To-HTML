import helper

source_directory = "E:/git/Markdown-To-HTML/Source"
destination_directory = "E:/git/Markdown-To-HTML/Output"

enable_print = True
enable_all_print = True

# Affiche les informations principales dans la console
def c_print(input):
    if enable_print:
        print(input)

# Affiche toutes les informations dans la console
def a_print(input): 
    if enable_all_print:
        print(input)

# Fonction pour convertir un titre Markdown en balise HTML
def convert_header(line):
    level = 0
    while line[level] == '#':
        level += 1
    a_print(f"Header : {level}, Content : {line[level+1:].strip()}")
    return f"<h{level}>{line[level+1:].strip()}</h{level}>"

# Fonction pour convertir une liste Markdown en balise HTML
def convert_list(line):
    if line.startswith("- "):
        return f"<li>{line[2:].strip()}</li>"
    a_print(f"Liste : {line[2:].strip()}")
    return line

def apply_text_formatting(line):
    # Bold formatting
    line = line.replace('**', '<b>', 1)
    line = line.replace('**', '</b>', 1)
    
    # Italic formatting
    line = line.replace('*', '<i>', 1)
    line = line.replace('*', '</i>', 1)

    return line

# Fonction pour convertir les liens en Markdown en balise HTML
def convert_links(line):
    links = line.split('[[')
    if len(links) > 1:
        new_line = links[0]
        for i in range(1, len(links)):
            splited = links[i].split("]]")
            if helper.file_exists_in_directory(splited[0] + ".md", source_directory):
                a_print(f"Link : {splited[0]} found.")
                new_line += f"""<a href="{splited[0]}.html"> {splited[0]}</a>""" + splited[1]
            else: 
                a_print(f"Link : {splited[0]} not found.")
                new_line += f"""<b>{splited[0]}</b>""" + splited[1]
        line = new_line
    return line

def apply_LaTeX(line):
    lines = line.split("$")
    if len(lines) > 1:
        new_line = lines[0]
        for i in range(0, len(lines)-len(lines)%2):
            if i % 2 == 0:
                new_line += "\\(" + lines[i]
            else:
                new_line += lines[i] + "\\)"
                a_print(f"LaTeX : {lines[i]}")
        line = new_line
    return line

# Fonction pour convertir un paragraphe Markdown en balise HTML
def convert_paragraph(line):
    line = apply_text_formatting(line)
    line = convert_links(line)
    line = apply_LaTeX(line)
    a_print(f"Paragraphe : {line.strip()}")
    return f"<p>{line.strip()}</p>"

# Fonction principale pour convertir le Markdown en HTML
def convert_markdown_to_html(markdown_lines):
    html_lines = []
    for line in markdown_lines:
        if line.startswith("#"):
            html_lines.append(convert_header(line))
        elif line.startswith("- "):
            html_lines.append("<ul>")
            html_lines.append(convert_list(line))
            html_lines.append("</ul>")
        else:
            html_lines.append(convert_paragraph(line))
    return "\n".join(html_lines)

# Fonction pour générer le code CSS
def generate_css():
    return """<style>
        body {
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
            font-size: 18px;
            margin: 30px 40px 10px 25px;
        }

        h1 {
            font-size: 35px;
            color: white;
            margin-left: 10px;
            margin-bottom: 0px;
            margin-top: 15px;
        }

        h2 {
            font-size: 32px;
            color: white;
            margin-left: 10px;
            margin-bottom: 0px;
            margin-top: 10px;
        }

        h3 {
            font-size: 28px;
            color: white;
            margin-left: 10px;
            margin-bottom: 0px;
            margin-top: 10px;
        }

        h4 {
            font-size: 26px;
            color: white;
            margin-left: 10px;
            margin-bottom: 0px;
            margin-top: 10px;
        }

        h5 {
            font-size: 24px;
            color: white;
            margin-left: 10px;
            margin-bottom: 0px;
            margin-top: 10px;
        }

        h6 {
            font-size: 22px;
            color: white;
            margin-left: 10px;
            margin-bottom: 0px;
            margin-top: 5px;
        }

        p {
            font-size: 16px;
            margin-left: 20px;
            margin-bottom: 0px;
            margin-top: 5px;

        }

        ul {
            font-size: 18px;
            margin-left: 20px;
        }

        li {
            font-size: 16px;
            line-height: 0.75;
        }

        a {
            color: rgb(234, 152, 255);
            font-style: italic;
        }

        #Title {
            text-align: center;
            font-size: 50px;
        }
</style>"""

def save_html_file(html_content, path):
    c_print(f"Saving... '{path}'")
    with open(path, "w", encoding="utf-8") as html_file:
        html_file.write(html_content)
    c_print(f"Saved as '{path}'!")

def read_md_file(filename):
    c_print(f"Reading... '{filename}'")
    with open(filename, "r", encoding="utf-8") as md_file:
        md_content = md_file.readlines()
    c_print(f"Read '{filename}'!")
    return md_content

# Fonction principale pour générer le document HTML complet
def generate_html_document(file_name):
    c_print(f"Generating HTML document... '{file_name}'")
    md_content = read_md_file(file_name)
    html_content = convert_markdown_to_html(md_content)
    css_content = generate_css()
    html_document = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>{helper.get_file_name(file_name)}</title>
{css_content}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css" integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq" crossorigin="anonymous">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js" integrity="sha384-y23I5Q6l+B6vatafAwxRu/0oK/79VlbSz7Q9aiSZUvyWYIYsd+qj+o24G5ZU2zJz" crossorigin="anonymous"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js" integrity="sha384-kWPLUVMOks5AQFrykwIup5lo0m3iMkkHrD0uJ4H5cjeGihAutqP0yW0J6dpFiVkI" crossorigin="anonymous" onload="renderMathInElement(document.body);"></script>
</head>
<body>
<h1 id="Title">{helper.get_file_name(file_name)}</h1>
{html_content}
</body>
</html>"""
    save_html_file(html_document, destination_directory + "/" + helper.get_file_name(file_name) + ".html")


generate_html_document("E:\git\Markdown-To-HTML\Source\Hello World !.md")
generate_html_document("E:\git\Markdown-To-HTML\Source\Lien autres docs.md")