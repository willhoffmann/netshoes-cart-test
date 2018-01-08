/**
 * Cart.
 */
(function(){

    var cart = {

        open: function() {

            body   = document.getElementsByTagName('body')[0];
            addClass(body, 'open-cart');

            // Created overlay
            var overlay = document.createElement('div');
            overlay.setAttribute('id','cart-overlay');
            body.appendChild(overlay);

            // Show overlay
            overlay.style.display = 'none';
            fadeIn(overlay);
        },

        total: function(arr) {
            var total = 0;

            if(arr) {

                for(var i = 0; i < arr.length; i++) {
                    var item = arr[i];
                    total += item.subtotal;
                }
            }

            return total;
        },

        content: function() {
            var cartMain   = document.getElementById('cart-main'),
                cartFooter = document.getElementById('cart-footer'),
                cartEmpty = document.getElementById('cart-empty');

            if(cart.total(getItemLocalStorage('cart')) === 0) {
                cartMain.style.display = 'none';
                cartFooter.style.display = 'none';
                cartEmpty.style.display = 'block';

            }else {
                cartMain.style.display = 'block';
                cartFooter.style.display = 'block';
                cartEmpty.style.display = 'none';

                // Update total and installments
                var cartTotal = document.getElementById('cart-total');
                cartTotal.innerHTML = priceFormat(cart.total(getItemLocalStorage('cart')));

                var cartInstallments = document.getElementById('cart-installments');
                cartInstallments.innerHTML = installment(cart.total(getItemLocalStorage('cart')), 10);
            }
        },


        items: function(arr) {

            if(arr){
                var bagItems = document.getElementById('cart-products');
                bagItems.innerHTML = '';

                arr.forEach(function(item){
                    var bagItem  = document.createElement('li');
                    addClass(bagItem, 'cart__product-item');

                    var bagItemHtml =
                        '<button class="cart__product-item--btn-remove" id="'+ item.id +'"></button>\n'+
                        '<img class="cart__product-item--image" src="assets/img/products/'+ item.id +'.jpg">'+
                        '<div class="cart__product-item__content">\n'+
                        '<h3 class="cart__product-item__content--title">\n'+item.title+'</h3>'+
                        '<span class="cart__product-item__content--info">\n'+ item.description + '|'+ item.style +'</span>'+
                        '<span class="cart__product-item__content--quantity">\n Quantidade: ' + item.amount +'</span>'+
                        '</div>'+
                        '<span class="cart__product-item--price">\n'+ priceFormat(item.subtotal) +'</span>';

                    bagItem.innerHTML = bagItemHtml;
                    bagItems.appendChild(bagItem);
                });
            }
        },

        remove: function(arr, productId, itemLocalStorage) {

            if(arr.length > 0) {

                for(var i = 0; i < arr.length; i++) {

                    if(productId === arr[i].id) {

                        arr.splice(i, 1);
                    }
                }
            }

            setItemLocalStorage(itemLocalStorage, arr);
        }
    };

    var cartCtrl = function() {
        cart.open();
        cart.content();
        cart.items(getItemLocalStorage('cart'));
    };

    var openCart = document.getElementById('open-cart');
    openCart.addEventListener("click", cartCtrl);

    // Overlay cart
    var body = document.getElementsByTagName('body')[0];
    body.addEventListener("click", function(e) {
        var overlay = e.target;

        if(e.target.id === 'cart-overlay') {
            removeClass(this, 'open-cart');

            fadeOut(overlay);
            setTimeout(function() {
                overlay.remove();
            }, 2000);
        }
    });

    // Remove item cart.
    var cartItems = document.getElementById('cart-products');
    cartItems.addEventListener('click', function(e) {

        var elem = e.target,
            parent = elem.parentNode;

        if(elem.className === 'cart__product-item--btn-remove'){

            // remove html element
            fadeOut(parent);
            setTimeout(function(){
                parent.remove();
            }, 2000);

            // remove object from array
            cart.remove(getItemLocalStorage('cart'), parseInt(elem.id), 'cart');

            // update counters
            updateCartTotalItems();

            // update html content bag
            cart.content();
        }
    });
})();
