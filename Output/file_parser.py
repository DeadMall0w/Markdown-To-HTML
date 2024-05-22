import os

#source_directory = "E:/git/Markdown-To-HTML/Source"
source_directory = "/home/raphael/Documents/GitHub/Markdown-To-HTML/Source"
destination_directory = "/home/raphael/Documents/GitHub/Markdown-To-HTML/files_parsed.txt"
def parcourir_dossier(dossier, relative_path):
    for element in os.listdir(dossier):
        chemin = os.path.join(dossier, element)
        if os.path.isfile(chemin):
            if chemin.endswith(".md"):
                print(relative_path+"/"+chemin.split('/')[-1])
        elif os.path.isdir(chemin):
            parcourir_dossier(chemin, os.path.join(relative_path, element))

parcourir_dossier(source_directory, "")