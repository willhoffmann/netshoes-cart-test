/**
 * List product in home page.
 */

updateCartTotalItems();

(function(){

    /**
     * Get all products.
     *
     * @param product
     */
    function getProduct(product){
        var products  = document.getElementById('products'),
            createElementProductItem = document.createElement('div'),
            installments = (product.installments > 0) ? installment(product.price, product.installments) : '',

            // Created card product
            productCard =
                '<div class="product-card">\n'+
                    '<div class="product-card__figure" ' +
                          'data-product-id="'+product.id+'" ' +
                          'data-product-sku="'+product.sku+'" ' +
                          'data-product-title="'+product.title+'" '+
                          'data-product-description="'+product.description+'" '+
                          'data-product-availableSizes="'+product.availableSizes+'" '+
                          'data-product-size="'+product.size+'" '+
                          'data-product-style="'+product.style+'" '+
                          'data-product-price="'+product.price+'" '+
                          'data-product-installments="'+product.installments+'" '+
                          'data-product-currencyId="'+product.currencyId+'" '+
                          'data-product-currencyFormat="'+product.currencyFormat+'" '+
                          'data-product-isFreeShipping="'+product.isFreeShipping+'" '+
                    '\n>'
                        +'<img src="assets/img/products/'+ product.id +'.jpg" alt="'+ product.title +'">\n'+
                    '</div>\n'+
                    '<div class="product-card__details">\n'+
                        '<h2 class="product-card__details--description">\n'+
                            product.title
                        +'</h2>'+
                        '<div class="product-card__details--price">\n'+
                            priceFormat(product.price)
                        +'</div>'+
                        '<div class="product-card__details--installments">\n'+
                            installments
                        +'</div>'+
                    '</div>'+
                '</div>';

        createElementProductItem.setAttribute('class', 'product-grid-item');
        createElementProductItem.innerHTML = productCard;
        products.appendChild(createElementProductItem);
    }

    // Ajax
    var xhr = new XMLHttpRequest(),
        url = 'mock/products.json';

    xhr.open('GET', url);

    xhr.addEventListener('load', function() {

        // Success
        if (this.status >= 200 && this.status < 400) {

            var datas 	 = JSON.parse(this.responseText),
                products = datas.products;

            products.forEach(function(product) {
                getProduct(product);
            });

        } else {
            console.log('Erro ' + this.status + ': File not found');
        }
    });


    // Before send
    xhr.addEventListener('loadstart', function(event){
        preloader.show();
    });

    // Complete
    xhr.addEventListener('loadend', function(event){
        preloader.hide();
    });

    xhr.send();
})();
