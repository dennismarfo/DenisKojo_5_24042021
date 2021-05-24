// Récupération de l'id dans l'url
const queryString_url_id = window.location.search ;

// Récupération de l'id sans le ?
const urlParams = new URLSearchParams(queryString_url_id);

const product_id = urlParams.get("id");
console.log(product_id);


(async function() {
    const product = await getProduct()
     {
        displayProduct(product)
    }

})()

function getProduct() {
    return fetch(`http://localhost:3000/api/cameras/${product_id}`)
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(product) {
            return product
        })
        .catch(function(error) {
            alert(error)
        })
    }

  
    
    function displayProduct(product) {
      const structure_product = document.getElementById("full-card").innerHTML += 
        `
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
        <div class="col-md-12">
        <img class="card-img" src="${product.imageUrl}" alt="photo camera">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h4 class="card-title">${product.name}</h4>
        <p class="card-text">${product.description}</p>
        </div>
        <form>
        <label for="lenses_choice">Choisir lentille</label>
        <select class="form-select" id="lenses_select">
        <option value="${product.lenses[0]}">${product.lenses[0]}</option>
        <option value="${product.lenses[1]}">${product.lenses[1]}</option>
        <option value="${product.lenses[2]}">${product.lenses[2]}</option>
        </select> 
        </form>
        <div class="price text-secondary"><h5 class="mt-4">${product.price / 100}€</h5></div>
        <a href="#" class="btn btn-dark mt-3" id="add-cart"><i class="fas fa-shopping-cart"></i> Ajouter</a>
        </div>
        </div>
        </div>
        
        
        `

        // Cart
        // Récup données et renvoi au cart
        //Séléction ID formulaire
        const cart = document.querySelector("#lenses_select");
        

        
        
        // Selection du boutton ajouter au panier dans le DOM
        
        const add_cart = document.querySelector("#add-cart");
        console.log(add_cart);
        
        // Ecoute du boutton et ajout du panier
        
        add_cart.addEventListener("click", (e) => {
            e.preventDefault();
            
            // choix utilisateur
            const lenses_choice = cart.value;
            
            // Récupération des choix de lentilles
            let lenses_selected = {
                name: product.name,
                description: product.description,
                lenses_select: lenses_choice,
                price: product.price / 100,
                imageUrl: product.imageUrl,
                product_id: product._id
            }
            // Local storage
            // Stockage des données dans le local storage
            
            
            let localStorageProduct = JSON.parse(localStorage.getItem("product"));


            // fenêtre de confirmation
            const confirm = () => {
                if(window.confirm(`${product.name} avec les lentilles : ${lenses_choice} a bien été ajouté au panier. Voir mon panier OK ou continuer mes achats ANNULER`)){
                    window.location.href = "cart.html";
                }else {
                    window.location.href = "index.html";
                }
            }
            
            // si produit dans local storage
            
            if (localStorageProduct) {
                localStorageProduct.push(lenses_selected);
                localStorage.setItem("product", JSON.stringify(localStorageProduct));
                console.log(localStorageProduct);
                confirm();
            
            } else {
            // sinon
                localStorageProduct = [];
                localStorageProduct.push(lenses_selected);
                localStorage.setItem("product", JSON.stringify(localStorageProduct));
                console.log(localStorageProduct);
                confirm();
            
            }
        })



    }
    
  






