function removeClass(elem, elemClass) {

    // IE10+
    if (elem.classList) {
        elem.classList.remove(elemClass);

    } else {
        var currentClass = elem.className;

        if(currentClass.indexOf(elemClass) > 1) {
            newClass = currentClass.replace(elemClass,'');
            elem.className = newClass;
        }
    }
}

function addClass(elem, elemClass) {

    // IE10+
    if (elem.classList){
        elem.classList.add(elemClass);
    } else {
        var currentClass = elem.className;

        if(currentClass.indexOf(elemClass) < 1){
            elem.className += ' ' + elemClass;
        }
    }
}

function fadeOut(elem) {

    // IE10+
    if(window.requestAnimationFrame) {
        elem.style.opacity = 1;

        (function fade() {
            if ((elem.style.opacity -= 0.1) < 0) {
                elem.style.display = "none";
            } else {
                requestAnimationFrame(fade);
            }
        })();

    } else {
        elem.style.display = "none";
    }
}

function fadeIn(elem, display) {

    // IE10+
    if(window.requestAnimationFrame) {
        elem.style.opacity = 0;
        elem.style.display = display || "block";

        (function fade() {
            var val  = parseFloat(elem.style.opacity),
                calc = (val += 0.1) > 1;

            if (!calc) {
                elem.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();

    } else {
        elem.style.display = display || "block";
    }
}

function priceFormat(val) {
    val = val.toFixed(2);
    val = val.toString();
    val = val.split('.');
    val = 'R$ <span>'+ val[0] +'</span>,'+ val[1];

    return val;
}

function installment(val, installments) {
    var newVal = 0;
    var text   = '';

    newVal = val / installments;
    newVal = newVal.toFixed(2);
    newVal = newVal.replace('.',',');
    text     = 'ou '+ installments +' x <span>R$ '+ newVal +'</span>';

    return text;
}

function supportLocalStorage() {
    if(window.localStorage) {
        return true;

    } else {
        console.log('Sorry! The browser does not support localStorage...');
        return false;
    }
}

function setItemLocalStorage(item, val) {
    if(supportLocalStorage()){
        localStorage.setItem(item, JSON.stringify(val));
    }
}

function getItemLocalStorage(item) {
    if(supportLocalStorage()) {
        return JSON.parse(localStorage.getItem(item));
    }
}

function removeItemLocalStorage(item) {
    if(supportLocalStorage()) {
        localStorage.removeItem(item);
        window.location = window.location;
    }
}

/**
 * Total items in cart.
 *
 * @returns {number}
 */
function cartTotalItems() {
    var cartItems = getItemLocalStorage('cart');

    if(cartItems) {
        var total = 0;

        for(var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i];
            total += cartItem.amount;
        }

        if(total === 0) {
            setTimeout(function() {
                removeItemLocalStorage('cart');
            }, 3000);
        }

        return total;
    }
}

/**
 * Update item total to cart.
 */
function updateCartTotalItems() {
    var totalItems = document.getElementsByClassName('topbar__cart--qty'),
        cartItems = (cartTotalItems()) ? cartTotalItems() : 0;

    for(var i = 0; i < totalItems.length; i++) {
        var total = totalItems[i];
        total.innerHTML = cartItems;
    }
}
