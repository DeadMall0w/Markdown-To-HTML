import os

def file_exists_in_directory(filename, directory):
    for root, dirs, files in os.walk(directory):
        if filename in files:
            return True
    return False
