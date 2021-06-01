(async function() {
    const products = await getProducts()
    for (product of products) {
        displayProduct(product)
    }

})()

function getProducts() {
    return fetch("http://localhost:3000/api/cameras")
        .then(function(httpBodyResponse) {
            return httpBodyResponse.json()
        })
        .then(function(products) {
            return products
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayProduct(product) {
        document.getElementById("full-card").innerHTML += 
        `<a href="product.html?id=${product._id}" class="product-card">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <div class="card">
        <img class="card-img" src="${product.imageUrl}" alt="photo camera">
        <div class="card-img-overlay d-flex justify-content-end">
        </div>
        <div class="card-body">
            <h4 class="card-title">${product.name}</h4>
            <p class="card-text">
            ${product.description}</p>
        </a>
            <div class="buy d-flex justify-content-between align-items-center">
            <div class="price"><h5 class="mt-4">${product.price / 100}€</h5></div>
            <a href="#" class="btn btn-dark mt-3">Voir produit</a>
            </div>
            </div>
            </div>
            </div>
            `
}
