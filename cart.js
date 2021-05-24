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