var map = L.map("map").setView([50.6507677472234, 3.0814033292192113], 12);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

//on peut faire une requéte HTTP en AJAX ave les méthodes fetch ou
//we can make an HTTP request in AJAX with the fetch methods

// on utilise fetch de la maniére suivante:
//we use fetch in the following way:

const url =
  "https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone";

fetch(url)
  .then((res) => res.json())
  .then((res) => {
    //traitment Js
    //Js processing
    const lieux = res.records;

    // on fait une boucle pour lire les inofs du tableau (lieu)
    //we make a loop to read the info from the array (location)
    for (let lieu of lieux) {
      console.log(lieu.fields.title);
      console.log(lieu.fields.geolocalisation);

      let marker = L.marker(lieu.fields.geolocalisation).addTo(map);
      marker.on("click", () => add());

      //declaring and opening the poitners information by clicking on them
      //déclarer et ouvrir les informations sur les poitrines en cliquant dessus
      let addDiv = document.querySelector(".favMenu");
      function add() {
        console.log(res.title);
        addDiv.style.display = "flex";

        addDiv.innerHTML = `
        
        <div class="favData">
        <img id="img" src="Assets/images/pic1.png" alt="">
        <div class="titreAdresses">
        <h1>
        ${lieu.fields.title} 
        </h1>
        <p class="titreDescription">${lieu.fields.contact}</p>
        <p class="titreInfos">${lieu.fields.infos}</p>
        </div>
        <button class = "btnEnregistrer" > Enregistrer </button>
        <button class="btnFermer">X</button> `;
      }
    }
    //Closing the favorites button
    //Fermeture du bouton des favoris
    let addDiv = document.querySelector(".favMenu");
    addDiv.addEventListener("click", (e) => {
      if (e.target.className === "btnFermer") {
        addDiv.style.display = "none";
      } else if (e.target.className === "btnEnregistrer") {
        // Storing the data in localStorage as follows
        // Stockage des données dans localStorage comme suit
        const liste = "favorities";
        const favString = localStorage.getItem(liste);
        const favorities = JSON.parse(favString) || [];
        let title = document.querySelector(".titreAdresses").innerHTML;
        let contact = document.querySelector(".titreDescription").innerHTML;
        let infos = document.querySelector(".titreInfos").innerHTML;
        const newFavorities = { title, contact, infos };
        favorities.push(newFavorities);
        localStorage.setItem(liste, JSON.stringify(favorities));
      }
    });
  })
  .catch((Error) => console.log("Error de type :" + Error));

// addDiv.addEventListener("click", (e) => {
//   if (e.target.className === "btn2") {
//     addDiv.style.display = "none";
//   } else if (e.target.className === "btn1") {
//     // localStorage.setItem("titre", lieu.fields.title);
//     // localStorage.setItem("adresse", lieu.fields.contact);

//     const liste = "favorities";
//     const favString = localStorage.getItem(liste);
//     const favorities = JSON.parse(favString) || [];
//     let title = lieu.fields.title;
//     let contact = lieu.fields.contact;
//     let infos = lieu.fields.infos;

//     const newFavorities = { title, contact, infos };
//     favorities.push(newFavorities);
//     localStorage.setItem(liste, JSON.stringify(favorities));
//   }
// });
