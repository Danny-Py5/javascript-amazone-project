import { cart} from "../../data/cart-class.js";

var log = console.log; 
describe('Test Suite: addToCart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });
    
    it('add an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 1,
                    deliveryOptionId: '1'
                }
            ]);  
        }); 
        cart.loadFromstorage();
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            }
        ]));
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(2);
    });
    it('adds a new product to the cart', () => {
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cart.loadFromstorage();


        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].quantity).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionId: '1'
        }]))
    });
});

describe('Test suit: removeFromCart()', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                    quantity: 1,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        cart.loadFromstorage();
    });

    it('remove a product that is in the cart', () => {
        cart.removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart.cartItems.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
            quantity: 1,
            deliveryOptionId: '1'
        }]));
    });
    
    it('remove a product that is not in the cart: should do nothing', () => {
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
        cart.removeFromCart('this str mock a productId :) it does not exist');
        expect(cart.cartItems.length).toEqual(2);
    });
});

describe('Test Suite: updateDeliveryOption', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                    quantity: 1,
                    deliveryOptionId: '1'
                }, {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        cart.loadFromstorage();
    });

    it('update delivery option of a product in the cart', () => {
        expect(cart.cartItems[0].deliveryOptionId).toBe('1');
        cart.updateDeliveryOption(productId1, '3');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart.cartItems[0].deliveryOptionId).toBe('3');
        expect(cart.cartItems.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 
                quantity: 1,
                deliveryOptionId: '3'
            }, {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }
        ]))
    });

    it('==XX== Edge case test: Update the delivery option of a productId that is not in the cart', () => {
        // calling the updateDeliveryOption with unexit productId should return null
        cart.updateDeliveryOption('non productId', '1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

})






