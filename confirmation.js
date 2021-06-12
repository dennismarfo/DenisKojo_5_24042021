// Récupération de l'id de la commande dans le local storage

const idOrder = localStorage.getItem("orderId");
console.log(idOrder);

//Récupération du prix total du local storage 
const totalPrice = localStorage.getItem("costTotalArticle");
console.log(totalPrice);

// Structure html
// Selection de l'élément du DOM
const displayHTML =document.querySelector("#container-confirmation");

const htmlConfirm = `      
<div class="recap">
    <h2>Merci pour votre commande</h2>
    <div id="full-card-confirmation" class="row">
        <p>Votre commande numéro: <span class="num-commande strong">${idOrder}</span>a bien été prise en compte</p>
        <p>Le montante total de votre commande est de : <span class="confirm-tottal strong">${totalPrice},00€</span></p>
        <p>A bientôt !</p>
    </div>
</div>`;

// Injection du code HTML

displayHTML.insertAdjacentHTML("afterbegin", htmlConfirm);

// Effacer le local storage

function deleteLocalstorage(key){
    localStorage.removeItem(key);
};

deleteLocalstorage("totalPrice");
deleteLocalstorage("products");
deleteLocalstorage("contacts");
deleteLocalstorage("orderId");

