# DropShifty

## Cahier des charges

### Présentation
DropShity est un projet réalisé dans le but de simplifier et d'automatiser la pratique du "DropShipping" qui consiste à vendre des produits en passant par des intermédiaires, de ce fait, aucune gestion des stocks ni de logistique à gérer.  
Le but de cette plateforme est de pouvoir y connecter son site e-commerce créé (dans un premier temps) avec WooCommerce, le plugin e-commerce de WordPress.
  
Une fois le site WordPress connecté avec DropShifty via le système d'API fourni par WooCommerce, l'utilisateur n'a plus qu'à renseigner sa clé d'API ChinaBrands pour lier également son compte ChinaBrands à DropShifty.
A partir de ce moment là, DropShifty sert d'intermédiaire entre les deux et va s'occuper de tout ce dont un humain a normalement besoin de s'occuper dans le cas de la gestion d'un site e-commerce en automatisant toutes les tâches.
  
### Fonctionnement
L'utilisateur copie l'URL du produit qu'il souhaite sur ChinaBrands et l'entre dans l'importateur DropShifty, le produit est crawlé puis ajouté à sa liste de produits sur DropShifty mais il est également ajouté automatiquement sur son site WordPress, ou il a la liberté de modifier les informations du produit comme bon lui semble (le titre, le prix, les photos, etc...).

Ainsi le produit est lié avec DropShifty qui va automatiquement le monitorer en fonction de la gestion des stocks, son changement de prix etc... Si le stock passe à 0 sur ChinaBrands, alors le stock passera à "En rupture de stock" sur le site WordPress.
  
Quand un utilisateur passe une commande sur le site WordPress, la commande est envoyée à DropShifty qui va s'occuper de passer la commande sur ChinaBrands, soit automatiquement avec le crédit disponible sur le compte ChinaBrands de l'utilisateur ou manuellement ou l'utilisateur devra recréditer son compte. Ensuite le produit est envoyé à l'adresse du client qui a commandé sur le site WordPress, automatiquement renseignée par DropShifty. Le numéro de suivi est récupéré à l'expédition du produit et est disponible pour que l'utilisateur puisse envoyer le mail avec le numéro au client.

### Spécifications

#### Commerciales
DropShifty proposera plusieurs offres pour ses utilisateurs. Une gratuite leurs permettant un maximum de 50 commandes par mois. Et d'autres offres payantes qui seront prochainement définies.

#### Techniques 
Les spécifications techniques sont à retrouver dans le cahier des charges techniques.

#### Utilisateurs
La création de compte est obligatoire pour accéder aux services de DropShifty avec une validation par email en production, les différents champs requis et disponibles pour l'utilisateur sont visualisables dans le document des modèles de données.

#### Marketing
DropShifty effectuera ses campagnes marketing principalement sur les réseaux sociaux tels que Facebook, Instagram, Twitter.
