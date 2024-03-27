import os

def file_exists_in_directory(filename, directory):
    for root, dirs, files in os.walk(directory):
        if filename in files:
            return True
    return False

def get_file_info(file_path):
    file_name = os.path.basename(file_path).split('.')[0]
    folder_path = os.path.dirname(file_path)
    return file_name, folder_path

def get_file_name(file_path):
    file_name = os.path.basename(file_path).split('.')[0]  # Obtient le nom du fichier sans extension
    return file_name