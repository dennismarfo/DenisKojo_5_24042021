// Récupération de l'id dans l'url
const queryString_url_id = window.location.search ;
console.log(queryString_url_id);

// Récupération de l'id sans le ?
const urlParams = new URLSearchParams(queryString_url_id);
console.log(urlParams);

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
        document.getElementById("full-card").innerHTML += 
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
                    <a href="#" class="btn btn-dark mt-3"><i class="fas fa-shopping-cart"></i> Ajouter</a>
                </div>
            </div>
        </div>
        
    
`
}
