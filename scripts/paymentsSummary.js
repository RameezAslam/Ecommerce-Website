import { cart,loadFromStorage } from "./cart.js";
import {getProduct } from  "./products.js";

if (document.querySelector('.js-payment-summary')) {
    renderPaymentSummary();
}

export function renderPaymentSummary() {
    let productPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);

        productPriceCents += product.priceCents * cartItem.quantity;
    });
    const shippingPriceCents = productPriceCents * 0.1;
    const  totalTax = productPriceCents * 0.2;
    const orderTotal = totalTax + productPriceCents + shippingPriceCents;

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const paymentSummaryHTML = 
    `
     <div class="payment-summary-title">
        Order Summary
        </div>

            <div class="payment-summary-row">
                Items(${cartQuantity}):
                <div class="payment-row-money"> $${(productPriceCents / 100).toFixed(2)} </div>
            </div>

            <div class="payment-summary-row ">
                Shipping fee:
                <div class="payment-row-money shipping-money"> $${(shippingPriceCents / 100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row">
                Total Tax(20%):
                <div class="payment-row-money  total-tax-money"> $${(totalTax /100).toFixed(2)}</div>
            </div>

            <div class="payment-summary-row order-total-heading"> 
                Order Total:
                <div class="payment-row-money order-total-money">$${(orderTotal / 100).toFixed(2)}</div>
            </div>

            <button class="place-order-button">Place your order</button>
    `;

    document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;

}

