
// je mets works ici pour pouvoir l'utiliser dans toutes les fonctions//
let works = [];

// je vérifie si l'utilisateur est connecté (etape 5.3)//
const token = localStorage.getItem("token");
if (token) {
    // je change login en logout
    const loginItem = document.getElementById("login-item");
    loginItem.textContent = "logout";

    // j'affiche le bandeau mode édition
    const bandeauEdition = document.getElementById("bandeau-edition");
    bandeauEdition.style.display = "block";

    // j'affiche le bouton modifier
    const btnModifier = document.getElementById("btn-modifier");
    btnModifier.style.display = "block";

    // au clic sur logout je déconnecte
    loginItem.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "index.html";
});
}

// je cherche la galerie dans le HTML//
const gallery = document.querySelector(".gallery");

/////////// ETAPE 2 ////////Modifier//
async function getWorks(){
    // j'appelle l'API pour avoir les travaux//
    const reponse = await fetch("http://localhost:5678/api/works");
    // je lis les données reçues du serveur
    works = await reponse.json();
    // j'affiche tous les travaux dans la galerie //
    afficherWorks(works);
}

// je crée une fonction pour afficher les travaux dans la galerie//
function afficherWorks(listeTravaux) {
    // je vide la galerie avant d'afficher //
    gallery.innerHTML = "";
    // pour chaque travail je crée les balises //
    for (const work of listeTravaux) {
        // je crée les 3 balises du HTML de base //
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
/////ETAPE 5.3////
getCategories().then(function() {
    if (token) {
        // je cache les filtres//
        const filters = document.querySelector(".filters");
        filters.style.display = "none";
    }
});


// ///// /ETAPE 6 - MODALE ///////
// je cherche les éléments de la modale //
const modale = document.getElementById("modale");
const btnFermer = document.getElementById("modale-fermer");
const btnModifierModal = document.getElementById("btn-modifier");
// je cherche les boutons et zones de la modale
const btnAjouterPhoto = document.getElementById("btn-ajouter-photo");
const modaleGalerie = document.getElementById("modale-galerie");
const modaleFormulaire = document.getElementById("modale-formulaire");
// au clic sur la flèche je reviens à la galerie //
const btnRetour = document.getElementById("btn-retour");

// j'ouvre la modale au clic sur le bouton modifier //
btnModifierModal.addEventListener("click", function() {
    // je remets la galerie par défaut //
    modaleGalerie.classList.remove("hidden");
    modaleFormulaire.classList.add("hidden");
    // j'ouvre la modale //
    modale.classList.remove("hidden");
    afficherPhotosModale(); // j'affiche les photos //
});

// je ferme la modale au clic sur la croix //
btnFermer.addEventListener("click", function() {
    modale.classList.add("hidden");
    reinitialiserFormulaire();

});

// je ferme la modale au clic en dehors //
modale.addEventListener("click", function(event) {
    if (event.target === modale) {
        modale.classList.add("hidden");
        reinitialiserFormulaire();

    }
});

// au clic sur "Ajouter une photo" j'affiche le formulaire //
btnAjouterPhoto.addEventListener("click", function() {
    modaleGalerie.classList.add("hidden");
    modaleFormulaire.classList.remove("hidden");
});

btnRetour.addEventListener("click", function() {
    modaleFormulaire.classList.add("hidden");
    modaleGalerie.classList.remove("hidden");
});

// j'affiche les photos dans la modale //
function afficherPhotosModale() {
    const modalePhotos = document.getElementById("modale-photos");
    modalePhotos.innerHTML = "";
    
    for (const work of works) {
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        modalePhotos.appendChild(img);
    }
}

////////ETAPE 8////
// je remplis le menu catégorie avec les données de l'API //
async function remplirCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories");
    const categories = await reponse.json();
    const select = document.getElementById("categorie");
    
    for (const categorie of categories) {
        const option = document.createElement("option");
        option.value = categorie.id;
        option.textContent = categorie.name;
        select.appendChild(option);
    }
}

remplirCategories();

// je récupère l'input et la preview //
const input = document.getElementById("input-image");
const preview = document.getElementById("preview");

// quand on sélectionne une image je l'affiche en preview //
input.addEventListener("change", function(event) {
    // je récupère le fichier sélectionné
    const file = event.target.files[0];
    // si pas de fichier je m'arrête //
    if (!file) return;
    // je crée un lien temporaire pour afficher l'image //
    const imageUrl = URL.createObjectURL(file);

    // j'affiche la preview //
    preview.src = imageUrl;
    preview.style.display = "block";

    // je cache l'icône, le bouton et le texte //
    document.getElementById("icone-upload").style.display = "none";
    document.querySelector("#zone-upload label").style.display = "none";
    document.querySelector("#zone-upload p").style.display = "none";
    document.getElementById("zone-upload").style.padding = "0";
    verifierFormulaire();;
});

const form = document.getElementById("formulaire-ajout");
form.addEventListener("submit", async function(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const reponse = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token
        },
        body: formData
    });
    if (reponse.ok) {
        const newWork = await reponse.json();
        works.push(newWork);
        afficherWorks(works);
        modale.classList.add("hidden");
        reinitialiserFormulaire();
    } else {
        console.log("Erreur status:", reponse.status);
    }
});
// je vérifie si le formulaire est complet //
const inputTitre = document.getElementById("titre");
const inputCategorie = document.getElementById("categorie");

function verifierFormulaire() {
    if (input.files[0] && inputTitre.value && inputCategorie.value) {
        document.getElementById("btn-valider").style.backgroundColor = "#1D6154";
    } else {
        document.getElementById("btn-valider").style.backgroundColor = "#ccc";
    }
}

inputTitre.addEventListener("input", verifierFormulaire);
inputCategorie.addEventListener("change", verifierFormulaire);

// je réinitialise le formulaire //
function reinitialiserFormulaire() {
    document.getElementById("formulaire-ajout").reset();
    preview.style.display = "none";
    document.getElementById("icone-upload").style.display = "block";
    document.querySelector("#zone-upload label").style.display = "block";
    document.querySelector("#zone-upload p").style.display = "block";
    document.getElementById("zone-upload").style.padding = "30px";
    document.getElementById("btn-valider").style.backgroundColor = "#ccc";
}
