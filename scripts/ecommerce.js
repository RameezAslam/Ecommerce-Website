import { products , getProduct } from "./products.js";
import {cart , addToCart , calculateCartQuantity,loadFromStorage, updateQuantity} from "./cart.js";
import { renderPaymentSummary } from "./paymentsSummary.js";

    let productsHTML= '';

    products.forEach((product) => {
        productsHTML+= `
            <div class="product-container">
                <div class="product-image-container">
                    <img src="${product.image}"  class="product-image">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img src="ratings/rating-${product.rating.stars * 10}.png"  class="rating-stars">
                    <div class="product-rating-count">
                        ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                        $${(product.priceCents / 100).toFixed(2)}
                </div>
                    <div class="product-quantity-selector">
                        <select class="js-quantity-selector"
                        data-product-id= "${product.id}">
                            <option selected value="1"> 1 </option>
                            <option value="2"> 2 </option>
                            <option value="3"> 3 </option>
                            <option value="4"> 4 </option>
                            <option value="5"> 5 </option>
                            <option value="6"> 6  </option>
                            <option value="7"> 7 </option>
                            <option value="8"> 8 </option>
                            <option value="9"> 9 </option>
                            <option value="10"> 10 </option>
                        </select>
                    </div>

                    <button class="add-to-cart-button js-add-to-cart"
                     data-product-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            `;
    });

    
    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();
       document.querySelector('.js-cart-quantity')
       .innerHTML = cartQuantity;
     }
     updateCartQuantity();

    document.querySelector('.js-products-grid')
    .innerHTML = productsHTML;
    
    document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {

           const productId = button.dataset.productId;

           const quantitySelector = document.querySelector(`.js-quantity-selector[data-product-id="${productId}"]`);
           const selectedQuantity = parseInt(quantitySelector.value);
           
           console.log(selectedQuantity,productId);

           addToCart(productId, selectedQuantity);
           updateCartQuantity();

        });
    });

    

   

