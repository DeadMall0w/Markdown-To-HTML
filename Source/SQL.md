# Définition

- Clé primaire : numéros unique qui permet que chaque enregistrement soit unique.

- Clé étrangère : Clé primaire d'un autre tableau pour établir une relation

- Base de donnée relationnelle : VIDE

- Bonne base de donnée : Si il y a besoin de ne faire uniquement 1 seule modification a faire pour changer une valeur dans la base de donnée.
  
  - ex : 2 tables sont présentes : la premiere comporte des livres, et la seconde comporte le nom des auteurs qui ont écrit ces livres.
    
    Un auteur change de nom, si les tables sont  bien faites, il suffit de changer le nom de l'auteur dans la table de l'auteur et pour tous les livres que l'auteur a écrit le nom se mettra a jour. Si elles sont mal faites, pour chaque livre il faudra  changer le nom de l'auteur, representant un grand nombre de modification.

- Pour gerer une base de donnée il faut un logiciel de type SGBD (Systeme de Gestion de Base de Donnée)

# Les instructions

## L'instruction 'SELECT'

Cette instrucion permet de définir quelles sont les clé choisit à afficher.

- Pour selectionner toutes les données d'une  base de donnée
  
```sql
SELECT * FROM ville;
```

- Pour selectionner certaines clés données d'une base de donnée
  
```sql
SELECT nom, code FROM ville;
```

- Pour renomer une clé d'une base de donnée
  
```sql
 SELECT nom AS NOM_VILLE FROM ville;
```

- Pour éliminer les doublons
  
```sql
SELECT DISTINCT code FROM ville;
```

- Pour trier les éléments 
  
```sql
SELECT code FROM ville ORDER BY code;
```

- Pour inverser le sens de tri, on peut utiliser 'DESC'
  
```sql
SELECT code FROM ville ORDER BY code DESC;
```

## L'instruction 'WHERE'

Cette instruction permet de faire un filtrer et de sélectionner des élements uniquement si une condition est validé.

```sql
SELECT * FROM ville WHERE code='59140';
#Selectionne tous les élements où le code = '59140
SELECT nom, code FROM ville WHERE code='67340';
#Selectionne le nom et le code où le code = '59140
SELECT nom, code FROM ville WHERE code='59140' OR code='59260';
```

## L'instruction 'INSERT'

Permet d'ajouter des données dans une table.

```sql
INSERT INTO ville VALUES ('62000','31','62','Calais','50.291048,2.7772211');
```

> ATTENTION : on obtient une erreur lorsque l'on essaye d'ajouter une des données qui sont deja présent.

## L'instruction 'UPDATE'

Permet de mettre a jour des données deja présente dans la table.

```sql
UPDATE ville SET code='62001' WHERE code='62000';
#Remplace dans la table ville, le code par 62001, où le code = 62000
```

## L'instruction 'DELETE'

Permet de supprimer des données présente dans la table.

```sql
DELETE FROM ville WHERE code='62001';
```

## Instruction supplémentaire

> Ces instructions seront sûrement donnée, si elle sont nécessaire à la réalisation de l'exercice lors du BAC. De ce fait, elles ne sont pas très importante mais les connaîtres est toujours un plus.

- Pour avoir a plus petite ou la plus grande valeur
  
```sql
SELECT MIN(code) AS MIN FROM ville;
SELECT MAX(code) AS MAX FROM ville;
```

- Pour avoir le nombre de ligne du tableau
  
```sql
SELECT COUNT(*) AS NbLignes FROM ville;
```

- Pour avoir la somme
  
```sql
SELECT SUM(effectif) AS Somme_effectif FROM ville;
```

- Pour avoir la moyenne

```sql
SELECT AVG(effectif) AS moyenne FROM evolution;```
  
  # Croisement de plusieurs tables
  
  Croiser des tables permet de ne pas avoir des données dupliqué, exemple : ici il y a 2 tables, une premiere table *ville* qui contient un code unique pour chaque vielle ainsi que les noms des villes, leur position géographique, ect... et une autre table *evolution* qui elle contient aussi le meme code, le nom du métier et l'éffectif du métier.
  
  Pour joindre 2 table on peut utiliser l'instruction 'JOIN'
  
```sql
SELECT ville.nom, evolution.effectif FROM ville JOIN evolution ON ville.code = evolution.code;
```
  
  Les autres instructions fonctionnent aussi :
  
```sql
SELECT ville.nom, evolution.effectif FROM ville JOIN evolution ON ville.code = evolution.code WHERE evolution.effectif > 2000 ORDER BY evolution.effectif;
```
