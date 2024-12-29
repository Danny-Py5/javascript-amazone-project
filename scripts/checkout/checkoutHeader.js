import {cart} from '../../data/cart-class.js';


export function renderChekoutHeader() {
    const cartQuantity = cart.getCartQuantity();
    // alert(cartQuantity)
    let returnToHomeLinkElement = document.querySelector('.js-return-to-home-link');
    if (returnToHomeLinkElement){
        returnToHomeLinkElement.textContent = cartQuantity > 0 ? String(cartQuantity) + (cartQuantity > 1 ? ' Items' : ' Item' ) : 'No Item';
    }
};

