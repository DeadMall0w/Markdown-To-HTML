import helper
import os

source_directory = "E:/git/Markdown-To-HTML/Source"
destination_directory = "E:/git/Markdown-To-HTML/Output"

enable_print = False
enable_all_print = False

# Affiche les informations principales dans la console
def c_print(input):
    if enable_print:
        print(input)

# Affiche toutes les informations dans la console
def a_print(input): 
    if enable_all_print:
        print(input)