async function init(){

    console.log( this.window );
    if( this.window.location.pathname == "/index.html" || this.window.location.pathname == "" || this.window.location.pathname == "/" ){
        let paramURL = new URLSearchParams( location.search );
        if( paramURL.size == 1 ){
            try {
                const url = `https://dummyjson.com/products/category/${paramURL.get("category")}`;
                const response = await axios.get(url);
                const products = await response.data.products;
                findAllProducts(products);
            }catch(error){
                console.log(error);
            }

        }else{
            try {
                const url = 'https://dummyjson.com/products';
                const response = await axios.get(url);
                const products = await response.data.products;
                findAllProducts(products);
            }catch(error){
                console.log(error);
            }
        }
        
        
    }

    if( this.window.location.pathname == "/detailsProduct.html" ){
        let paramsURL = new URLSearchParams( location.search );
                
        if( paramsURL.size == 1 ){

            let articleId = paramsURL.get("id");
            if( articleId == undefined || articleId == "" ){
                this.window.location.href = "./index.html";
            }

            try {
                const url = `https://dummyjson.com/products/${articleId}`;
                const response = await axios.get(url);
                const product = await response.data;
                findOneProduct(product);
            }catch(error){
                console.log(error);
            }

        }else{
            this.window.location.href = "./index.html";
        }
            
    }

}

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

    let allProducts = products;

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

    /* Affichage de la marque du produit */
    let productBrandHTML         = document.querySelector(".product-informations .product-brand");
    productBrandHTML.innerText   = ( product.brand != undefined ) ? product.brand : "";
    if( product.brand == undefined ) productBrandHTML.remove();

    /* Affichage du titre du produit */
    let productTitleHTML        = document.querySelector(".product-informations .product-title");
    productTitleHTML.innerText  = product.title;

    /* Affichage de la moyenne des votes du produit */
    let productAverageHTML          = document.querySelector(".product-informations .product-rate .note .average");
    productAverageHTML.innerText    = product.rating;

    /* Affichage de la totalitées des votes du produit */
    let productTotalVotesHTML       = document.querySelector(".product-informations .product-rate .votes .totalVote");
    productTotalVotesHTML.innerText = product.reviews.length;

    /* Affichage de la description du produit */
    let productDescriptionHTML          = document.querySelector(".product-informations .product-description");
    productDescriptionHTML.innerText    = product.description;

    /* Affichage de la catégorie du produit */
    let productCategoryHTML         = document.querySelector(".product-informations .product-category a");
    productCategoryHTML.innerText   = product.category;
    productCategoryHTML.href        = `./index.html?category=${product.category}`;

    /* Affichage du prix avec réduction du produit */
    let productPriceReductionHTML       = document.querySelector(".product-informations .product-discount-price .price");
    let priceWithReduction              = ( product.price - ( product.discountPercentage / 100 ) * product.price ).toFixed(2);
    productPriceReductionHTML.innerText = `${priceWithReduction}€`;

    /* Affichage du pourcentage de réduction du produit */
    let productPriceDiscountPercentage = document.querySelector(".product-informations .product-discount-price .discount");
    productPriceDiscountPercentage.innerText = `-${product.discountPercentage}%`;

    /* Affichage du prix de base du produit */
    let productPriceDefault = document.querySelector(".product-informations .product-price .price");
    productPriceDefault.innerText = `${product.price}€`;

    /* Affichage de la disponibilitée du produit */
    let productAvailabilityStatusHTML   = document.querySelector(".product-informations .product-availability-status .status .round");
    let productAvailabilityTextHTML     = document.querySelector(".product-informations .product-availability-status .text .txt");
    let productAvailabilityStockHTML    = document.querySelector(".product-informations .product-availability-status .text .countStock");
    productAvailabilityStatusHTML.classList.add( ( product.stock == 0 ) ? 'empty' : 'stock' );
    productAvailabilityTextHTML.innerText = product.availabilityStatus;
    productAvailabilityStockHTML.innerText = `- ${product.stock} restant(s)`;

    /* Affichage de la garantie du produit */
    let productWarrantyHTML = document.querySelector(".product-informations .product-warranty");
    productWarrantyHTML.innerText = product.warrantyInformation;

    /* Affiche de la livraison du produit */
    let productShippingTxtHTML = document.querySelector(".product-informations .product-shipping .txt");
    productShippingTxtHTML.innerHTML = product.shippingInformation;

    /* Affichage du nombre de commentaires d'un produit */
    let productCountComments = document.querySelector(".product .reviews .title span.countComment");
    productCountComments.innerText = product.reviews.length;

    /* Affichage des commentaires du produits */
    showProductComments( product.reviews );
}

/* Affichage d'une image du produit */
const selectPreviewImage = ( image ) => {
    let bigImage = document.querySelector(".product .product-images .big-image img");
    let listImages = document.querySelectorAll(".product .product-images .list-images img");

    bigImage.src = image.src;
    
    for( const image of listImages ) image.classList.remove('selected');

    image.classList.add('selected');
}

/* Affichage des commentaires d'un produit */
const showProductComments = ( reviews ) => {
    let reviewsContent = document.querySelector(".product .reviews");
    for( const review of reviews ){

        let reviewDate = new Date( review.date );

        let rateStars = "";

        for( let i = 0; i < review.rating; i++ ){
            rateStars += '<i class="fi fi-sr-star"></i>';
        }

        for( let j = 0; j < 5 - review.rating; j++ ){
            rateStars += '<i class="fi fi-rr-star"></i>';
        }

        reviewsContent.innerHTML += `<div class="review striped">
                                        <div class="reviewerAvatar striped"></div>
                                        <div class="content">
                                            <div class="reviewerName">
                                                <span class="name">${review.reviewerName}</span>
                                                <span class="email">(${review.reviewerEmail})</span>
                                            </div>
                                            <div class="reviewerComment">${review.comment}</div>
                                            <div class="reviewerDate">${reviewDate}</div>
                                        </div>
                                        <div class="rate">
                                            ${rateStars}
                                        </div>
                                    </div>`;
    }
}

/* Initialisation au chargement */
window.addEventListener("load", (event) => {
    init();
});


    
