const toggleResponsiveHeaderNavbar = () => {
    const navbar = document.querySelector("header nav.navbar");
    const button = document.querySelector("header button.toggleResponsiveNavbar");

    button.classList.toggle("activeResponsiveNavbar");
    navbar.classList.toggle("activeNavbar")
}

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

const findOneProduct = ( product ) => {
    let productName = product.title;

    document.title += " " + productName;
}

window.addEventListener("load", function(){
    
    if( this.window.location.pathname.split("/")[1] == "index.html" ){
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