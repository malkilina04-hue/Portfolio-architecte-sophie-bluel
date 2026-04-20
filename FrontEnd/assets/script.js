
// je mets works ici pour pouvoir l'utiliser dans toutes les fonctions//
let works = [];

// je cherche la galerie dans le HTML//
const gallery = document.querySelector(".gallery");

///////////ETAPE 2////////Modifier//
async function getWorks(){
    // j'appelle l'API pour avoir les travaux//
    const reponse = await fetch("http://localhost:5678/api/works");
    // je lis les données reçues du serveur
    works = await reponse.json();
    // // j'affiche tous les travaux dans la galerie//
    afficherWorks(works);
}

// je crée une fonction pour afficher les travaux dans la galerie//
function afficherWorks(listeTravaux) {
    // je vide la galerie avant d'afficher//
    gallery.innerHTML = "";
    // pour chaque travail je crée les balises//
    for (const work of listeTravaux) {
        // je crée les 3 balises du HTML de base//
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        // je met les données du travail dans les balises//
        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;
        // je met les balises dans la galerie//
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

getWorks();

////Etapes 3////
async function getCategories(){
    // j'appelle l'API pour avoir les catégories//
    const reponse = await fetch("http://localhost:5678/api/categories");
    // je lis les données reçues du serveur//
    const categories = await reponse.json();
    // je cherche la div filters dans le HTML//
    const filters = document.querySelector(".filters");
    // je crée le bouton Tous et je le mets dans la div filters//
    const buttonTous = document.createElement("button");
    buttonTous.textContent = "Tous";
    filters.appendChild(buttonTous);
    buttonTous.classList.add("clique");
    // quand on clique sur Tous j'affiche tous les travaux//
    buttonTous.addEventListener("click", function() {
    //je rends tous les boutons blancs et le bouton Tous vert//
    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("clique"));
    buttonTous.classList.add("clique");
        afficherWorks(works);
    });
    // pour chaque catégorie je crée un bouton//
    for (const categorie of categories) {
        const button = document.createElement("button");
        button.textContent = categorie.name;
        filters.appendChild(button);
        // au clic je filtre les travaux par catégorie//
    button.addEventListener("click", function() {
        // étape a : je rends tous les boutons blancs//
    document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("clique"));
        // étape b : je rends le bouton Tous vert//
    button.classList.add("clique");
     // je garde seulement les travaux de cette catégorie//
    const worksFiltres = works.filter(function(work) {
        return work.categoryId === categorie.id;
    });
    afficherWorks(worksFiltres); // j'affiche les travaux filtrés//
});
    }
}

getCategories();

