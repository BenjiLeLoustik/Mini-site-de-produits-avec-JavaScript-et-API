/* Activation / Desactivation de la navbar */
const toggleResponsiveHeaderNavbar = () => {
    const navbar = document.querySelector("header nav.navbar");
    const button = document.querySelector("header button.toggleResponsiveNavbar");

    button.classList.toggle("activeResponsiveNavbar");
    navbar.classList.toggle("activeNavbar")
}

/* Recherche et Affichage des produits */
const findAllProducts = ( products ) => {
    const productsList = document.querySelector(".products .list");

    let allProducts = products.products;

    for( product of allProducts ){
        let productId           = product.id;
        let productName         = product.title;
        let productCategory     = product.category;
        let productPrice        = product.price;
        let productRating       = product.rating;
        let productVotes        = product.reviews.length;
        let productThumbnail    = product.thumbnail;

        let newDisplayProduct = `<a href="./detailsProduct.html?id=${productId}" class="product">
                                    <div class="product-img striped">
                                        <div class="product-category striped">${productCategory}</div>
                                        <img src="${productThumbnail}" alt="${productName}">
                                    </div>
                                    <div class="product-name">${productName}</div>
                                    <div class="product-rate">
                                        Note : <b>${productRating}</b>/5 <span>(${productVotes} votes)</span>
                                    </div>
                                    <div class="product-price">
                                        ${productPrice}€
                                    </div>
                                </a>`;

        productsList.innerHTML += newDisplayProduct;
    }
}

/* Recherche et affichage d'un produit */
const findOneProduct = ( product ) => {
    document.title += " " + product.title;

    /* Affichage de l'image principale du produit */
    let bigImage = document.querySelector(".product .product-images .big-image img");
    bigImage.src = product.images[0];

    /* Preview des images du produit */
    let listImages = document.querySelector(".product .product-images .list-images");
    for( let i = 0; i < product.images.length; i++ ){
        let selected = ( i == 0 ) ? 'selected' : '';

        listImages.innerHTML += `<img src='${product.images[i]}' alt='img-${i}' class='striped ${selected} previewImageProduct' onclick='selectPreviewImage( this )' />`;
    }

    


}

/* Affichage d'une image du produit */
const selectPreviewImage = ( image ) => {
    let bigImage = document.querySelector(".product .product-images .big-image img");
    let listImages = document.querySelectorAll(".product .product-images .list-images img");

    bigImage.src = image.src;
    
    for( const image of listImages ) image.classList.remove('selected');

    image.classList.add('selected');
}

/* Initialisation au chargement */
window.addEventListener("load", function(){
    
    if( this.window.location.pathname.split("/")[1] == "index.html" || this.window.location.pathname.split("/")[1] == "" ){
        let products = fetch( "https://dummyjson.com/products")
            .then( response => response.json() )
            .then( data => findAllProducts( data ) )
            .catch( error => console.error( `Erreur : ${error}` ) );
    }
    
    if( this.window.location.pathname.split("/")[1] == "detailsProduct.html" ){
        let paramsURL = new URLSearchParams( location.search );
        
        if( paramsURL.size == 1 ){

            let articleId = paramsURL.get("id");
            if( articleId == undefined || articleId == "" ){
                this.window.location.href = "./index.html";
            }

            let products = fetch( `https://dummyjson.com/products/${articleId}`)
                .then( response => response.json() )
                .then( data => findOneProduct( data ) )
                .catch( error => console.error( `Erreur : ${error}` ) );

        }else{
            this.window.location.href = "./index.html";
        }
        
    }

});