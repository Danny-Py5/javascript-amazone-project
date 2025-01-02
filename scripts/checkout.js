import { renderOrderSummary } from "./checkout/orderSummary.js";
import renderPaymentSummary from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import { cart } from "../data/cart-class.js";
// import '../data/backend-practice.js';
// import '../data/cart-class.js';
// import '../data/car.js';

async function loadpage(){
    try {
        /*
        await loadProductsFetch();
    
        // const result = await new Promise((resolve, reject) => {
        //     loadCart(() => {
        //         // reject('error 2')
        //         resolve('value 4');
        //     });
        // });
        const result = await cart.loadCartFetch();
        console.log(result);
        */
        //using promise all
        await Promise.all([
            loadProductsFetch(),
            cart.loadCartFetch()
        ]).then(values => {
            console.log(values)
        });
        
    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
};

loadpage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve('value2');
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
})
*/


/* 
new Promise((resolve, reject) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) => {
    return new Promise((resolve) => {
        console.log(value)
        cart.loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

// loadProducts(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

