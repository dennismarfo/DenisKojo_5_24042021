function displayLocal() {
    // Déclaration de la variable "localStorageProduct" dans laquelle on met les clés valeurs qui sont dans le localstorage
    
    let localStorageProduct = JSON.parse(localStorage.getItem("product"));
    console.log(localStorageProduct);
    
    // ----------------AFFICHAGE DES PRODUITS DU PANIER-----------------------
    
    // SELECTION DE LA CLASSE POUR INJECTION DU CODE HTML
    
    const positionElement = document.querySelector("#container-cart");
    console.log(positionElement);
    
    // si panier vide : Le panier est vide
    
    if(localStorageProduct === null) {
       const emptyCart = `              
       <div class="col-sm-12 col-md-10 col-md-offset-1" id="container-cart">
       <table class="table table-hover">
       <thead>
    
       </thead>
       </table>
       <h5 class="text-justify">Votre panier est vide</h5>
       </div>`
    
       positionElement.innerHTML = emptyCart;
    } else {
    // sinon afficher les produits du local storage
    let cartStructur = [];
        for(k = 0; k < localStorageProduct.length; k++) {
            cartStructur = cartStructur + `              
            <table class="table table-hover">
            <tbody>
            <tr>
            <td class="col-sm-8 col-md-6">
            <div class="media">
            <a class="thumbnail pull-left" href="#"> <img class="media-object" src="${localStorageProduct[k].imageUrl}" style="width: 72px; height: 72px;"> </a>
            <div class="media-body">
            <h4 class="media-heading"><a href="#">${localStorageProduct[k].name}</a></h4>
            <h5 class="media-heading">Lentille <a href="#">${localStorageProduct[k].lenses_select}</a></h5>
            </div>
            </div></td>
            <td class="col-sm-1 col-md-1" style="text-align: center">
            </td>
            <td class="col-sm-1 col-md-1 text-center"><strong>${localStorageProduct[k].quantity}</strong></td>
            <td class="col-sm-1 col-md-1 text-center"><strong>${localStorageProduct[k].price}€</strong></td>
            <td class="col-sm-1 col-md-1">
            <button type="button" class="btn btn-danger">
            <span class="fa fa-remove"></span> Supprimer
            </button></td>
            </tr>
            </tbody>
            </table>		`;
    }
        if(k == localStorageProduct.length){
        positionElement.innerHTML = cartStructur;
    }
    
    }

}

displayLocal();


//Selection des bouton supprimer
let localStorageProduct = JSON.parse(localStorage.getItem("product"));
console.log(localStorageProduct);

let btnDelete = document.querySelectorAll(".btn-danger");
console.log(btnDelete);

//Selection de l'id de l'élément a supprimer

for (let l = 0; l < btnDelete.length; l++){
    btnDelete[l].addEventListener("click", (e) => {
        e.preventDefault();
        console.log(e);

        let id_selected = localStorageProduct[l].product_id;
        console.log(id_selected);

        for (let f = localStorageProduct.length - 1; f >= 0; --f) {
            if (localStorageProduct[f].product_id === id_selected) {
              alert('Le produit a été supprimer');
              localStorageProduct.splice(f, 1);
              console.log(localStorageProduct);
              localStorage.setItem("product", JSON.stringify(localStorageProduct));
              location.reload();
            }
          }
          displayLocal();

    })
}

//---------------CALCUL TOTAL PANIER--------------//

// Déclaration tableau des prix

let totalCost = [];

//Récupération des prix dans le panier

for (let p = 0; p < localStorageProduct.length; p++) {
    let listPrice = localStorageProduct[p].price

    // Injection des pris dans le tableaux 'totalCost'
    totalCost.push(listPrice)
}

// Faire la somme des montant de mon tableau totalCost

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const costTotalArticle = totalCost.reduce(reducer, 0);

// Html du prix total 

const displayTotalPrice = `

<div class="col-sm-12 col-md-10 col-md-offset-1 total-price">
<table class="table table-hover">
<thead>
<tr>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th></th>
<th> TOTAL : ${costTotalArticle}€</th>
</tr>
</thead>
</table>
</div> 
`

// Injection du code HTML
let positionElement = document.querySelector("#container-cart");

positionElement.insertAdjacentHTML("beforeend", displayTotalPrice);


// Formulaire de commande

const displayFormHtml = () => {
    const positionElement2 = document.querySelector("#container-cart");

    const formSturtur = `            
    <div id="orderForm">
    <h2>Formulaire de commande</h2>
    
  <form action="#">
    <label for="name">Nom :</label>
    <input type="text" id="lastname" name="lastname" required>

    <label for="firstname">Prénom :</label>
    <input type="text" name="firstname" id="firstname" required>

    <label for="address">Adresse :</label>
    <input type="text" name="adress" id="address" required>


    <label for="postal">Code postale :</label>
    <input type="text" name="postal" id="postal" required>

    <label for="city">Ville :</label>
    <input type="text" name="city" id="city" required>

    <label for="mail">Email :</label>
    <input type="text" name="mail" id="mail" required>

    <button id="sendForm" type="submit" name="sendForm">
      Confirmer la commande
    </button>
  </form>
</div>`;


console.log(positionElement2);
positionElement2.insertAdjacentHTML("afterend", formSturtur);

};

displayFormHtml();

// Button envoyé formulaire
const btnSendForm = document.querySelector("#sendForm");
console.log(btnSendForm);

//AddEnventlistner

btnSendForm.addEventListener("click", (e)=> {
    e.preventDefault();

    // Récupération des valeurs du formulaire pour le local storage

    const form = {

        lastname: document.querySelector("#lastname").value,
        firstname: document.querySelector("#firstname").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#postal").value,
        postal: document.querySelector("#city").value,
        mail: document.querySelector("#mail").value,
    }


    //**************************VALIDATION FORMULAIRE************************************************ */
    // Fonction pour la validité du prénom en bouléen
    const textAlert = (value) => {
        return `${value}: Les chiffres et caractères spéciaux ne sont pas autorisé`
    }
    
    
    
    const regNamesCity = (value) => {
        return /^[a-z ,.'-]+$/i.test(value);
    }

    const regPostal = (value) => {
        return /^[0-9]{5}$/.test(value);
    }
    
    
    
    function controlFirstName(){
    // Contrôle du prénom
    const theFirstName = form.firstname;
    if(regNamesCity(theFirstName)){
    return true;
    } else {
        alert(textAlert("Prénom"));
        return false;
    }
}  


function controlLastName(){
    // Contrôle du nom
    const theLastName = form.lastname;
    if(regNamesCity(theLastName)){
    return true;
    } else {
        alert(textAlert("Nom"));
        return false;
    }
} 

function controlPostal(){
    // Contrôle du code postale
    const postalCode = form.postal;
    if(regPostal(postalCode)){
    return true;
    } else {
        alert(textAlert("Code postal"));
        return false;
    }
} 

    
    //*****************************FIN FORMULAIRE******************************************************** */
    // Objet "form" dans local storage


if(controlFirstName() && controlLastName() && controlPostal()){
    localStorage.setItem("form", JSON.stringify(form));

} else {
    alert("Le formulaire n'est pas correctement rempli")
};
    

// Mettre le value du forms et produits selection pour envoyer au serveur
const toSend = {
    localStorageProduct,
    form
}
console.log(toSend);


})







