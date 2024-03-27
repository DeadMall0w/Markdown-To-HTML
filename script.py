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

# Fonction pour convertir un paragraphe Markdown en balise HTML
def convert_paragraph(line):
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
        /*Add CSS here */
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
    with open(filename, "w") as html_file:
        html_file.write(html_content)

def read_md_file(filename):
    with open(filename, "r") as md_file:
        md_content = md_file.readlines()
    return md_content

# Exemple d'utilisation
markdown_filename = "Source/Hello World !.md"  # Nom du fichier Markdown
markdown_lines = read_md_file(markdown_filename)
html_document = generate_html_document(markdown_lines)
save_html_file(html_document, "output.html")
