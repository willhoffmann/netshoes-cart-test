/**
 * Add product to cart.
 */
(function(){
    var productsArray,
        cart = getItemLocalStorage('cart');

    productsArray = (cart) ? cart : [];

    // Get products
    var products = document.getElementById('products');

    products.addEventListener("click", function(e) {
        e.preventDefault();

        if(e.target.nodeName === 'IMG') {
            var product = e.target.parentNode;

            var id             = parseInt(product.getAttribute('data-product-id')),
                sku            = parseInt(product.getAttribute('data-product-sku')),
                title          = product.getAttribute('data-product-title'),
                description    = product.getAttribute('data-product-description'),
                availableSizes = product.getAttribute('data-product-availableSizes'),
                size           = product.getAttribute('data-product-size'),
                style          = product.getAttribute('data-product-style'),
                price          = parseFloat(product.getAttribute('data-product-price')),
                installments   = parseInt(product.getAttribute('data-product-installments')),
                currencyId     = product.getAttribute('data-product-currencyId'),
                currencyFormat = product.getAttribute('data-product-currencyFormat'),
                isFreeShipping = product.getAttribute('data-product-isFreeShipping'),
                amount         = 1;

            // Check if the item has already been added in the cart
            var checkCart = false,
                index;

            if(productsArray.length > 0) {

                for(var i = 0; i < productsArray.length; i++) {

                    if(id === productsArray[i].id) {
                        checkCart = true;
                        index = i;
                    }
                }
            }

            // Check if product already exists in cart, if it does not exist add.
            if(!checkCart) {
                var data = {
                    'id': id,
                    'sku': sku,
                    'title': title,
                    'description': description,
                    'availableSizes': availableSizes,
                    'size': size,
                    'style': style,
                    'price': price,
                    'installments': installments,
                    'currencyId': currencyId,
                    'currencyFormat': currencyFormat,
                    'isFreeShipping': isFreeShipping,
                    'amount': amount,
                    'subtotal': price
                };

                productsArray.push(data);

            }else {
                productsArray[index].amount += 1;

                var subtotal = productsArray[index].amount * productsArray[index].price;
                productsArray[index].subtotal = parseFloat(subtotal.toFixed(2));
            }

            // Save data on localStorage
            setItemLocalStorage('cart', productsArray);

            // Update counter items
            updateCartTotalItems();
        }
    });
})();
