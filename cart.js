

function displayLocal() {
    // Déclaration de la variable "products" dans laquelle on met les clés valeurs qui sont dans le localstorage
    
    let productList = JSON.parse(localStorage.getItem("products"));
    
    // ----------------AFFICHAGE DES PRODUITS DU PANIER-----------------------
    
    // SELECTION DE LA CLASSE POUR INJECTION DU CODE HTML
    
    const positionElement = document.querySelector("#container-cart");
    const positionEl = document.querySelector(".table-hover tbody")
    
    
    // si panier vide : Le panier est vide
    
    if(productList === null || productList == 0) {
       const emptyCart = `              
       <div class="col-sm-12 col-md-10 col-md-offset-1" id="container-cart">
       <h5 class="text-justify">Votre panier est vide</h5>
       </div>`;
    
       positionElement.innerHTML = emptyCart;
    } else {
    // sinon afficher les produits du local storage
    let cartStructur = [];
        for(k = 0; k < productList.length; k++) {
            cartStructur = cartStructur + `              
          
           
            <tr class="col-sm-12 col-md-12">
            <td class="col-sm-12 col-md-12 pics">
            <div class="media">
            <a class="thumbnail pull-left" href="#"> <img class="media-object" src="${productList[k].imageUrl}" style="width: 72px; height: 72px;"> </a>
            <div class="media-body">
            <span class="media-heading"><a href="#">${productList[k].name}</a></span>
            <span class="media-heading">Lentille <a href="#">${productList[k].lenses_select}</a></span>
            </div>
            </div></td>

            <td class="col-sm-12 col-md-12"><strong>${productList[k].quantity}</strong></td>
            <td class="col-sm-12 col-md-12 text-center"><strong>${productList[k].price},00€</strong></td>
            <td class="col-sm-12 col-md-12">
            <button type="button" class="btn btn-outline-danger">
            <span class="fa fa-remove"></span> Supprimer
            </button></td>
            </tr>
            
           		`;
    }
        if(k == productList.length){
        positionEl.innerHTML = cartStructur;
    } 
    
    
}

}

displayLocal();


//Selection des bouton supprimer


let btnDelete = document.querySelectorAll(".btn-outline-danger");


//Selection de l'id de l'élément a supprimer

for (let l = 0; l < btnDelete.length; l++){
    btnDelete[l].addEventListener("click", (e) => {
        e.preventDefault();

        let id_selected = productList[l].product_id;
        

        for (let f = productList.length - 1; f >= 0; --f) {
            if (productList[f].product_id === id_selected) {
              alert('Le produit a été supprimer');
              productList.splice(f, 1);
              localStorage.setItem("products", JSON.stringify(productList));
              location.reload();
            }
          }
          displayLocal();

    })
}

const positionElement4 = document.querySelector("#container-cart");

//-----------Vider le panier-------------//
//Code html du boutton
const delete_all_html = `<div><button class="btn btn-outline-secondary btn-delete-all">Vider le panier</button></div>`;

//Insertion du bouton dans le html du panier
positionElement4.insertAdjacentHTML("afterend", delete_all_html);


//Selection de la référence tout supprimer
const btn_delete_all = document.querySelector(".btn-delete-all");

//Supression de la key products

btn_delete_all.addEventListener("click", (e) => {
    e.preventDefault;
    //Methode remove item
    localStorage.removeItem("products");
    alert("La panier a été vidé!")
    location.reload();
});









//---------------CALCUL TOTAL PANIER--------------//

productList = JSON.parse(localStorage.getItem("products"));
// Déclaration tableau des prix

let totalCost = [];
if (productList == null) {

    products = [];
} else {
    products = JSON.parse(localStorage.getItem("products")).map(product => product.product_id);
    //Récupération des prix dans le panier
    
    for (let p = 0; p < productList.length; p++) {
        let listPrice = productList[p].price
    
        // Injection des pris dans le tableaux 'totalCost'
        totalCost.push(listPrice)
    }
}



// Faire la somme des montant de mon tableau totalCost

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const costTotalArticle = totalCost.reduce(reducer, 0);

// Html du prix total 

const displayTotalPrice = `

<div class=" total-price">
<table class="table table-hover">
<thead>
<tr>
<th class="total-footer"> TOTAL : ${costTotalArticle},00€</th>
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

    <button class="btn btn-outline-dark" id="sendForm" type="submit" name="sendForm">
      Confirmer la commande
    </button>
  </form>
</div>`;



positionElement2.insertAdjacentHTML("afterend", formSturtur);

};

displayFormHtml();

// Button envoyé formulaire
const btnSendForm = document.querySelector("#sendForm");


//AddEnventlistner

btnSendForm.addEventListener("click", (e)=> {
    e.preventDefault();

    // Récupération des valeurs du formulaire pour le local storage

    const contact = {

        lastName: document.querySelector("#lastname").value,
        firstName: document.querySelector("#firstname").value,
        address: document.querySelector("#address").value + ' ' + document.querySelector("#postal").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#mail").value,
    }

console.log(contact.address)
    //**************************VALIDATION FORMULAIRE************************************************ */
    // Fonction pour la validité du prénom en bouléen
    const textAlert = (value) => {
        return `${value}: Les chiffres et caractères spéciaux ne sont pas autorisé`
    }
    
    
    
    const regNamesCity = (value) => {
        return /^[a-z ,.'-]+$/i.test(value);
    }

    const regPostal = (value) => {
        return /^(?:[0-8]\d|9[0-8])\d{3}$/.test(value);
    }

    const regEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    }

    const regAdress = (value) => {
        return /^[A-Za-z0-9\s]{5,100}$/.test(value);
    }

    
    
    
    function controlFirstName(){
    // Contrôle du prénom
    const theFirstName = contact.firstName;
    if(regNamesCity(theFirstName)){
    return true;
    } else {
        alert(textAlert("Prénom"));
        return false;
    }
}  


function controlLastName(){
    // Contrôle du nom
    const theLastName = contact.lastName;
    if(regNamesCity(theLastName)){
    return true;
    } else {
        alert(textAlert("Nom"));
        return false;
    }
} 



function controlEmail(){
    // Contrôle du code email
    const theMail = contact.email;
    if(regEmail(theMail)){
    return true;
    } else {
        alert("L'email est invalide");
        return false;
    }
} 

function controlAdress(){
    // Contrôle du code adresse
    const theAdress = contact.address;
    if(regAdress(theAdress)){
    return true;
    } else {
        alert("L'adresse est invalide");
        return false;
    }
} 

function controlCity(){
    // Contrôle de la ville 
    const theCity = contact.city;
    if(regNamesCity(theCity)){
    return true;
    } else {
        alert(textAlert("Ville"));
        return false;
    }
} 

    
    //*****************************FIN FORMULAIRE******************************************************** */
    // Objet "form" dans local storage


if(controlFirstName() && controlLastName() && controlEmail() && controlAdress() && controlCity()){
    localStorage.setItem("contact", JSON.stringify(contact));
    localStorage.setItem("costTotalArticle", JSON.stringify(costTotalArticle));
    // Mettre le value du forms et produits selection pour envoyer au serveur
    const order = {
        contact,
        products
    }

    sendToServer(order);
   
} else {
    alert("Le formulaire n'est pas correctement rempli")
};
    





})

function sendToServer(order){
     //Envoi de l'objet "toSend" vers le serveur
     const postMethod = fetch("http://localhost:3000/api/cameras/order", {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Content-Type' : 'application/json',
        },
    })
    // Réponse du serveur
    postMethod.then(async(response) => {
        // si la promesse ne passe pas
        try {
            console.log(response);
            const content1 = await response.json();
            console.log(content1);
    
            if(response.ok){
                console.log(`Response est ok ${response.ok}`)

                // Récupération de l'id de la response
                console.log("id du serveur")
                console.log(content1.orderId);
                //Mettre l'id du serveur dans le local storage
                localStorage.setItem("orderId", content1.orderId);
                // Direction vers la page order
                window.location = "confirmation.html";

            } else {
                alert(`Erreur du serveur!`)
            }
    
    
        } catch(e){
            console.log(e);
            alert(`OUPSS ERREUR 400`)
        }
    })
    
}


// Mettre le contenu du localstorage dans le formulaire

const dataLocalStorage = localStorage.getItem("contact");

// Conversion en objet js
const dataLocalJs = JSON.parse(dataLocalStorage);

if (dataLocalStorage == null) {

} else {

    // Inserer les valeurs recolter pour les mettre dans le formulaire
    document.querySelector("#lastname").value = dataLocalJs.lastName;
    document.querySelector("#firstname").value = dataLocalJs.firstName;
    document.querySelector("#address").value = dataLocalJs.address;
    document.querySelector("#city").value = dataLocalJs.city;
    document.querySelector("#mail").value = dataLocalJs.email;
};








