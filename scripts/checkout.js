import { cart , calculateCartQuantity , removeFromCart,loadFromStorage, updateQuantity } from "./cart.js";
import { products , getProduct } from "./products.js";
import { renderPaymentSummary } from "./paymentsSummary.js";

export function renderOrderSummary() {

let cartSummaryHTML = '';

 cart.forEach((cartItem) => {
     
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

   cartSummaryHTML +=  `
    <div class="cart-item-container 
    js-cart-item-container  js-cart-item-container-${matchingProduct.id}">
    <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">
        <div class="cart-item-details">
            <div class="product-name js-product-name-${matchingProduct.id}" >
                ${matchingProduct.name}
            </div>
            <div class="product-price js-product-price-${matchingProduct.id}">
                $${(matchingProduct.priceCents / 100 ).toFixed(2)}
            </div>
            <div class="quantity-container
            js-quantity-container-${matchingProduct.id}">
                <span class="quantity-name" >
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                    ${cartItem.quantity}</span>

                </span>
                <span class="update-link js-update-link"
                 data-product-id = "${matchingProduct.id}">
                    Update
                </span>

                <input class="input-quantity js-input-quantity-${matchingProduct.id}">

                <span class="save-link js-save-link"
                  data-product-id="${matchingProduct.id}">
                    Save
                </span>

                <span class="delete-link js-delete-link "
                 data-product-id = "${matchingProduct.id}">
                    Delete
                </span>
              

                </div>
            </div>
    </div>
</div>
    `;
});

function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}
updateCartQuantity();

document.querySelector('.js-order-summary')
.innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
.forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderOrderSummary();
        updateCartQuantity();
        renderPaymentSummary();
    });
});

document.querySelectorAll('.js-update-link')
.forEach((link) => {
    link.addEventListener('click' , () => {
        const productId = link.dataset.productId;

        const container = document.querySelector
        (`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
    });
});

document.querySelectorAll('.js-save-link')
.forEach((link) => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');

        const inputQuantity = document.querySelector(`.js-input-quantity-${productId}`);

        const newQuantity = Number(inputQuantity.value);

        if(newQuantity < 0 || newQuantity > 100) {
            alert('Quantity must be greater than 0 or less than 100');
        }
        
        updateQuantity(productId,newQuantity);
        renderOrderSummary();
        renderPaymentSummary();
    });
});

}
renderOrderSummary();











