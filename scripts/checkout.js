import { renderOrderSummary } from "./checkout/orderSummary.js";
import renderPaymentSummary from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import { loadCart } from "../data/cart-class.js";
// import '../data/backend-practice.js';
// import '../data/cart-class.js';
// import '../data/car.js';


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


/*
new Promise((resolve, reject) => {
    loadProducts(() => {
        resolve('value1');
    });
}).then((value) => {
    return new Promise((resolve) => {
        console.log(value)
        loadCart(() => {
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

