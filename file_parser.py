import os

#source_directory = "E:/git/Markdown-To-HTML/Source"
source_directory = "/home/raphael/Documents/GitHub/Markdown-To-HTML/Source"
destination_file = "/home/raphael/Documents/GitHub/Markdown-To-HTML/files_parsed.txt"
s = ""
def parcourir_dossier(dossier, relative_path):
    global s
    for element in os.listdir(dossier):
        chemin = os.path.join(dossier, element)
        if os.path.isfile(chemin):
            if chemin.endswith(".md"):
                print(relative_path+"/"+chemin.split('/')[-1])
                s += relative_path+"/"+chemin.split('/')[-1]+"\n"
        elif os.path.isdir(chemin):
            parcourir_dossier(chemin, os.path.join(relative_path, element))

parcourir_dossier(source_directory, "")
with open(destination_file, 'w', encoding="utf-8") as file:
    file.write(s)

print("file saved as : " + destination_file)
