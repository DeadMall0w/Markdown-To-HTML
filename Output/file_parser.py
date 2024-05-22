import os

#source_directory = "E:/git/Markdown-To-HTML/Source"
source_directory = "/home/raphael/Documents/GitHub/Markdown-To-HTML/Source"
destination_directory = "E:/git/Markdown-To-HTML/Output"

def parcourir_dossier(dossier, relative_path):
    for element in os.listdir(dossier):
        chemin = os.path.join(dossier, element)
        if os.path.isfile(chemin):
            if chemin.endswith(".md"):
                print(chemin, relative_path)
        elif os.path.isdir(chemin):
            folder_path = os.path.join(destination_directory, os.path.join(relative_path, element))
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            parcourir_dossier(chemin, os.path.join(relative_path, element))

parcourir_dossier(source_directory, "")