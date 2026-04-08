
///////////ETAPE 2/////////
async function getWorks(){
    // étape 1 : appel à l'API avec fetch //
const reponse = await fetch("http://localhost:5678/api/works");

// on transforme la réponse //
const works = await reponse.json();

// étape 2  : ajouter à la galerie//
const gallery = document.querySelector(".gallery");

// pour chaque travail je crée les balises//
    for (const work of works) {

        // je crée les 3 balises du HTML de base//
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        // je met les données du travail dans les balises//
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;

        // je met les balises dans la gallery//
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}
getWorks()

////Etapes 3////
async function getCategories(){

    // étape 1 : appel à l'API pour récupérer les catégories
    const reponse = await fetch("http://localhost:5678/api/categories");

    // on transforme la réponse
    const categories = await reponse.json();

    // je cherche la div filters dans le HTML
    const filters = document.querySelector(".filters");

    // je crée le bouton Tous
    const buttonTous = document.createElement("button");
    buttonTous.textContent = "Tous";
    filters.appendChild(buttonTous);

    // pour chaque catégorie je crée un bouton
    for (const categorie of categories) {

        // je crée le bouton
        const button = document.createElement("button");
        button.textContent = categorie.name;
        filters.appendChild(button);
    }
}
getCategories();



