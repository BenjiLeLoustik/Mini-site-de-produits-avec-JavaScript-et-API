🛠️ Atelier : Mini-site de produits avec JavaScript et API – 2 pages dynamiques 

🎯 Objectif 

Créer un petit site web de 2 pages en HTML/CSS/JS qui interagit avec l’API https://dummyjson.com/products pour afficher une liste de produits, puis les détails d’un produit sur une page dédiée. 

📄 Page 1 – index.html : Liste des produits 

Récupération des données 
Faites une requête vers : 
👉 https://dummyjson.com/products 

Affichage de la liste de produits 
Pour chaque produit, affichez au minimum : 

🖼️ Une image (thumbnail) 

🏷️ Le nom du produit (title) 

💲 Le prix (price) 

Bonus : ⭐ La note moyenne (rating) 

Bonus : Une balise ou catégorie (category ou tags[0]) 

Navigation vers la fiche produit 
Chaque produit doit être cliquable et rediriger vers detailsProduit.html?id=ID 
(par exemple : detailsProduit.html?id=1) 

Style visuel 
Utilisez un framework CSS comme Bootstrap ou TailwindCSS pour une présentation propre. 

Forme 

📄 Page 2 – detailsProduit.html : Détail du produit 

Récupération de l’ID 

Lisez le paramètre id dans l’URL 

Faites une requête vers : 
👉 https://dummyjson.com/products/{id} 

Affichage des détails du produit 
Affichez les informations suivantes : 

🖼️ Image principale (images[0]) 

🏷️ Nom (title) 

📝 Description (description) 

💲 Prix (price) 

Bonus : 📉 Réduction (discountPercentage) 

⭐ Note (rating) 

🏢 Marque (brand) 

📦 Stock disponible (stock) 

🕓 Disponibilité (availabilityStatus) 

Bonus : 📬 Livraison (shippingInformation) 

Bonus : 💬 Commentaires clients : afficher les 2 ou 3 premiers avis (reviews) 

Nom du client (reviewerName) 

Note (rating) 

Commentaire (comment) 

Bonus : afficher le QR code s’il reste du temps – meta.qrCode 

Forme 

✅ Contraintes 

Le projet doit fonctionner sans frameworks JavaScript (React, Angular, etc. interdits). 

Aucune donnée ne doit être codée en dur (tout vient de l’API). 

Forme 

🧠 Astuces 

Pensez à utiliser URLSearchParams pour récupérer l’ID dans l’URL. 

Utilisez innerHTML ou appendChild() pour générer dynamiquement le contenu. 

Testez avec plusieurs ID pour vérifier la robustesse de la deuxième page. 

 
