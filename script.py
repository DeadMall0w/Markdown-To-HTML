# Fonction pour convertir un titre Markdown en balise HTML
def convert_header(line):
    level = 0
    while line[level] == '#':
        level += 1
    return f"<h{level}>{line[level+1:].strip()}</h{level}>"

# Fonction pour convertir une liste Markdown en balise HTML
def convert_list(line):
    if line.startswith("- "):
        return f"<li>{line[2:].strip()}</li>"
    return line

def apply_text_formatting(line):
    # Bold formatting
    line = line.replace('**', '<b>', 1)
    line = line.replace('**', '</b>', 1)
    
    # Italic formatting
    line = line.replace('*', '<i>', 1)
    line = line.replace('*', '</i>', 1)

    return line

def convert_links(lines):
    links = lines.split('[[')
    if len(links) > 1:
        new_lines = links[0]
        for i in range(1, len(links)):
            splited = links[i].split("]]")
            new_lines += f"""<a href="{splited[0]}"> {splited[0]}</a>""" + splited[1]
        lines = new_lines
    return lines
# Fonction pour convertir un paragraphe Markdown en balise HTML
def convert_paragraph(line):
    line = apply_text_formatting(line)
    line = convert_links(line)
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
</style>"""

# Fonction principale pour générer le document HTML complet
def generate_html_document(markdown_lines):
    html_content = convert_markdown_to_html(markdown_lines)
    css_content = generate_css()
    html_document = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Markdown to HTML</title>
{css_content}
</head>
<body>
{html_content}
</body>
</html>"""
    return html_document

# Exemple d'utilisation
def save_html_file(html_content, filename):
    with open(filename, "w", encoding="utf-8") as html_file:
        html_file.write(html_content)

def read_md_file(filename):
    with open(filename, "r", encoding="utf-8") as md_file:
        md_content = md_file.readlines()
    return md_content

# Exemple d'utilisation
markdown_filename = "Source/Hello World !.md"  # Nom du fichier Markdown
markdown_lines = read_md_file(markdown_filename)
html_document = generate_html_document(markdown_lines)
save_html_file(html_document, "output.html")
