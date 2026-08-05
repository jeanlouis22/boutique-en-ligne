
// =========================

// PRODUITS DE DÉMONSTRATION

// =========================

const produits = [

    {

        id: 1,

        nom: "T-shirt Premium",

        prix: 5000,

        categorie: "Vêtements",

        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"

    },

    {

        id: 2,

        nom: "Jean classique",

        prix: 10000,

        categorie: "Vêtements",

        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"

    },

    {

        id: 3,

        nom: "Chaussures tendance",

        prix: 15000,

        categorie: "Chaussures",

        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"

    },

    {

        id: 4,

        nom: "Sac élégant",

        prix: 12000,

        categorie: "Sacs",

        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"

    }

];

// =========================

// AFFICHER LES PRODUITS

// =========================

const listeProduits = document.getElementById("listeProduits");

function afficherProduits(liste = produits) {

    listeProduits.innerHTML = "";

    if (liste.length === 0) {

        listeProduits.innerHTML = "<p>Aucun produit trouvé.</p>";

        return;

    }

    liste.forEach(function(produit) {

        const carte = document.createElement("div");

        carte.className = "produit";

        carte.innerHTML = `

            <div class="produit-image">

                <img src="${produit.image}" alt="${produit.nom}">

                <button class="favori">❤️</button>

            </div>

            <div class="produit-info">

                <p>${produit.categorie}</p>

                <h3>${produit.nom}</h3>

                <div class="note">⭐⭐⭐⭐⭐</div>

                <div class="prix">

                    ${produit.prix.toLocaleString("fr-FR")} FCFA

                </div>

                <div class="stock">

                    📦 En stock

                </div>

        <div class="actions">

    <button

        class="voir-produit"

        onclick="voirProduit(${produit.id})">

        👁️ Voir

    </button>

    <button

        class="bouton-produit"

        onclick="ajouterAuPanier(${produit.id})">

        🛒 Ajouter

    </button>

</div>

            </div>

        `;

        listeProduits.appendChild(carte);

    });

}

// =========================

// PANIER

// =========================

let panier = [];

function ajouterAuPanier(id) {

    const produit = produits.find(function(item) {

        return item.id === id;

    });

    if (!produit) {

        return;

    }

    panier.push(produit);

    mettreAJourPanier();

    alert(

        produit.nom +

        " a été ajouté au panier 🛒"

    );

}

function mettreAJourPanier() {

    const nombrePanier =

        document.getElementById("nombrePanier");

    nombrePanier.textContent = panier.length;

}

// =========================

// RECHERCHE

// =========================

const recherche =

    document.getElementById("recherche");

recherche.addEventListener("input", function() {

    const texte =

        recherche.value.toLowerCase().trim();

    const resultats =

        produits.filter(function(produit) {

            return (

                produit.nom

                    .toLowerCase()

                    .includes(texte)

                ||

                produit.categorie

                    .toLowerCase()

                    .includes(texte)

            );

        });

    afficherProduits(resultats);

});

// =========================

// CATÉGORIES

// =========================

const boutonsCategories =

    document.querySelectorAll(

        ".categories-container button"

    );

boutonsCategories.forEach(function(bouton) {

    bouton.addEventListener("click", function() {

        const categorie =

            bouton.textContent

                .replace("👕", "")

                .replace("👟", "")

                .replace("👜", "")

                .replace("💎", "")

                .trim();

        const resultats =

            produits.filter(function(produit) {

                return produit.categorie === categorie;

            });

        afficherProduits(resultats);

        document

            .getElementById("produits")

            .scrollIntoView({

                behavior: "smooth"

            });

    });

});

// =========================

// INITIALISATION

// =========================

afficherProduits();

mettreAJourPanier();
// =========================

// FENÊTRE PANIER

// =========================

const boutonPanier =

    document.querySelector(".panier");

const fenetrePanier =

    document.getElementById("fenetrePanier");

const fermerPanier =

    document.getElementById("fermerPanier");

const contenuPanier =

    document.getElementById("contenuPanier");

const totalPanier =

    document.getElementById("totalPanier");

// Ouvrir

boutonPanier.addEventListener("click", function() {

    afficherPanier();

    fenetrePanier.style.display = "flex";

});

// Fermer

fermerPanier.addEventListener("click", function() {

    fenetrePanier.style.display = "none";

});

// Cliquer à l'extérieur

window.addEventListener("click", function(event) {

    if (event.target === fenetrePanier) {

        fenetrePanier.style.display = "none";

    }

});

// Affichage du panier

function afficherPanier() {

    contenuPanier.innerHTML = "";

    let total = 0;

    if (panier.length === 0) {

        contenuPanier.innerHTML = "<p>Votre panier est vide.</p>";

    }

    panier.forEach(function(produit) {

        total += produit.prix;

        contenuPanier.innerHTML += `

            <div class="ligne-panier">

                <span>${produit.nom}</span>

                <strong>${produit.prix.toLocaleString("fr-FR")} FCFA</strong>

            </div>

        `;

    });

    totalPanier.textContent =

        "Total : " +

        total.toLocaleString("fr-FR") +

        " FCFA";

}

const envoyerCommande = document.getElementById("envoyerCommande");

envoyerCommande.addEventListener("click", function () {

    if (panier.length === 0) {

        alert("Votre panier est vide.");

        return;

    }

    const nom = document.getElementById("nomClient").value;

    const telephone = document.getElementById("telephoneClient").value;

    const adresse = document.getElementById("adresseClient").value;

    let message = "🛒 *Nouvelle commande*%0A%0A";

    message += "👤 Nom : " + nom + "%0A";

    message += "📞 Téléphone : " + telephone + "%0A";

    message += "📍 Adresse : " + adresse + "%0A%0A";

    let total = 0;

    panier.forEach(function(produit){

        total += produit.prix;

        message += "• " + produit.nom + " - " +

        produit.prix.toLocaleString("fr-FR") +

        " FCFA%0A";

    });

    message += "%0A💰 Total : " +

    total.toLocaleString("fr-FR") +

    " FCFA";

    window.open(

        "https://wa.me/2250596266649?text=" + message,

        "_blank"

    );

})
