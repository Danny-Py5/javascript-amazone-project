import { cart } from "../../data/cart-class.js"
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurrency } from "../utils/money.js";
import { order } from "../../data/orders.js";

export default function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCent = 0;

    cart.cartItems.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCent += deliveryOption.priceCents;
        
    });

    const totalBeforeTaxtCents = productPriceCents + shippingPriceCent;
    const taxCents = totalBeforeTaxtCents * 0.1;
    const totalCents = totalBeforeTaxtCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>${cart.getCartQuantity() > 1 ? 'Items' : 'Item'} (${cart.getCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCent)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxtCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button js-place-order-button button-primary">
            Place your order
        </button>`
        ;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-place-order-button').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', 
                {
                    method: 'POST', 
                    headers: {
                        'Content-type': 'application/json', 
                    },
                    body: JSON.stringify(
                        {
                            cart: cart.cartItems
                        }
                    )
                }
            );
            const orders = await response.json();
            order.addOrder(orders);
        } catch (error) {
            console.log('unexpected error. Try again later.')
        }
        window.location.href = 'orders.html'
    });
};