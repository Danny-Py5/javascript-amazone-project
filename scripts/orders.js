import { order } from "../data/orders.js";
import { formatCurrency } from "../scripts/utils/money.js";
import {getProduct, loadProductsFetch} from '../data/products.js';
import {cart} from '../data/cart-class.js';

renderOrder();

async function renderOrder() {

    cart.updateCartQuantity();

    await loadProductsFetch();

    let orderHTML = '';
    order.orderItems.forEach(odr => {
        orderHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${order.formatDate(odr.orderTime)}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>$${formatCurrency(odr.totalCostCents)}</div>
                        </div>
                    </div>
    
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${odr.id}</div>
                    </div>
                </div>
    
                <div class="order-details-grid">
                    ${generateOrderProducts(odr, odr.products)}
                </div>
            </div>
        `;
    });
    
    document.querySelector('.js-orders-grid').innerHTML = orderHTML;

    document.querySelectorAll('.js-buy-again-button').forEach(button => {
        button.addEventListener('click', () => {
            buyAgain(button);
        });
    });
};

function generateOrderProducts(odr, products) {
    let orderProducts = '';
    products.forEach(product => {
        const matchingProduct = getProduct(product.productId);
        orderProducts += `
            <div class="product-image-container">
                <img src="${matchingProduct.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${order.formatDate(product.estimatedDeliveryTime)}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button data-product-id="${matchingProduct.id}" class="buy-again-button js-buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${odr.id}&productId=${matchingProduct.id}">
                    <button class="track-package-button button-secondary">
                        Track package
                    </button>
                </a>
            </div>
        `;
    });
    return orderProducts;
};


function buyAgain(button) {
    const { productId } = button.dataset;

    cart.addToCart(productId, 1);
    cart.updateCartQuantity();
};




