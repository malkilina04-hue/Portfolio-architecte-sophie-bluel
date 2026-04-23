////////////ETAPE 5.2/////////

// je cherche le formulaire dans le HTML//
const formulaire = document.querySelector("#login form");

// j'écoute quand on clique sur "Se connecter"//
formulaire.addEventListener("submit", async function(event) {
    // j'empêche la page de se recharger//
    event.preventDefault();

    // je récupère ce que l'utilisateur a tapé//
    const email = event.target.querySelector("[name=email]").value;
    const password = event.target.querySelector("[name=password]").value;

    // j'envoie les données au serveur avec fetch en POST//
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password })
    });

    // si la connexion est réussie//
    if (reponse.ok) {
        // je récupère le token//
        const data = await reponse.json();
        // je stocke le token dans localStorage//
        localStorage.setItem("token", data.token);
        // je redirige vers la page d'accueil//
        window.location.href = "index.html";
    } else {
        // si l'identifiant ou mot de passe sont incorrects j'affiche un message d'erreur//
        alert("Identifiants ou mot de passe incorrects");
    }
});


