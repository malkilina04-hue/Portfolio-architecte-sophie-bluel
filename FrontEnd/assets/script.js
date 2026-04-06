

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

        // je met les données du travaile dans les balises//
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
