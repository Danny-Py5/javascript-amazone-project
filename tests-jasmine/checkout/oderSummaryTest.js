import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { cart } from '../../data/cart-class.js';
import { loadProducts } from '../../data/products.js';


var log = console.log;

describe('Integration Test: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });
    // beforeEach hook
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        cart.loadFromstorage();

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div> 
        <div class="js-payment-summary"></div>
        `; 
        renderOrderSummary(); 
    }); 
    
    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    });
    
    it('Should render the order summary', () => {
        document.querySelector('.js-test-container').innerHTML = '<div class="js-order-summary"></div>'
        renderOrderSummary(); 
        expect(document.querySelectorAll('.cart-item-container-test').length).toEqual(2)
        expect(document.querySelector(`.js-quantity-label-test-${productId1}`).textContent).toEqual('2');
        // or use toContain to check for string
        expect(document.querySelectorAll('.product-quantity')[0].innerText).toContain('Quantity: 2');

        expect(document.querySelectorAll('.js-product-name')[0].innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');  // this one might not pass if the product name changed;
        // or use not toEqual null for best pass;
        expect(document.querySelector('.js-product-name')).not.toEqual(null);
        
        
    });

    it('Should delete an item correctly and remain 1', () => {
        document.querySelectorAll('.js-delete-quantity-link')[0].click();
        expect(document.querySelectorAll('.cart-item-container-test').length).toEqual(1);

        // console.log(document.querySelector(`.js-cart-item-container-${productId1}`));
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId2);
        console.log(expect(document.querySelector(`.js-cart-item-container-${productId2}`).id));

        console.log(document.querySelector(`.js-cart-item-container-${productId2}`));
        expect(document.querySelector('.js-product-name')).not.toEqual(null);
    });

    it('updates the cart quantity correctly', () => {
        document.querySelector(`.js-update-quantity-link-${productId1}`).click();
        document.querySelector(`.js-quantity-input-${productId1}`).value = '9';
        document.querySelector(`.js-save-quantity-link-${productId1}`).click();
        cart.updateQuantity(productId1, '9');
       
        expect(document.querySelector(`.js-quantity-label-test-${productId1}`).innerText).toEqual('9');
    });

    it('--update the delivery option correctly', () => {
       // check the third option in the delivery options  :it class is productId + deliveryOptionId;
       document.querySelector(`.${productId1}-3`).click();
       expect(document.querySelector(`.${productId1}-3`).checked).toBe(true);
       expect(cart.cartItems.length).toEqual(2);
       expect(cart.cartItems[0].productId).toEqual(productId1);
       expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    })
})

