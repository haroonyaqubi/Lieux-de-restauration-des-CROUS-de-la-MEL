//declring the favorities html div's in js
//déclare les divs favoris en js
let afavMenu = document.getElementById(".favMenu");
let sec3 = document.querySelector(".sec3");
let save = JSON.parse(localStorage.getItem("favorities"));

// getting the stored information from localstorage.
// récupération de l'information stockée dans le localstorage.
function fav() {
  for (i = 0; i < save.length; i++) {
    sec3.innerHTML += `
  
    <div class="sec5">
    <img id="img" src="Assets/images/pic1.png" alt="">
    <div >${save[i].title}<br>

    </div>
    <button class = "btnSupp" > Supprimer </button>
    </div> `;
  }
}

fav();
// by this function we commend to remove the favorties poppup
// par cette fonction on recommande d'enlever les poupées favorites.
sec3.onclick = (event) => {
  let target = event.target;
  if (target.className == "btnSupp") {
    target.parentElement.remove();
    localStorage.removeItem("favorities", length);
  }
};
