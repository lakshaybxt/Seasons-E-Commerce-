import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../data/cart.js';
import { products, getProduct } from '../data/products.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOption.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary() {

    let cartSummaryHTML = ``;

    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProduct = getProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="cart-item-container js-item-container-${matchingProduct.id}">
                <!-- delete button -->
                <span class="delete-button js-delete-button" data-product-id="${matchingProduct.id}"><img src="images/close.svg"></span>
                <div class="cart-item-details-grid">
                    <img class="product-image" src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="seasons">Seasons®</div>
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ₹${matchingProduct.price}
                        </div>
                        <div class="delivery-date">
                            Delivery by <span> ${dateString}</span>
                        </div>
                        <div class="product-quantity">
                            <span class="quantity">
                                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                                Update
                            </span>
                            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                            <span class="link-primary save-quantity-link js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = ``;
        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');

            const priceString = deliveryOption.priceCents === 0 ? 'Free' : `₹${deliveryOption.price}`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
            // console.log(isChecked);

            html += `
                <div class="delivery-option js-delivery-option"
                data-product-id="${matchingProduct.id}"
                data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} - Shipping
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.js-delete-button')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);
                // const container = document.querySelector(`.js-item-container-${productId}`);
                // if(container) container.remove();
                renderOrderSummary();
                updateCartQuantity();
                renderPaymentSummary();
            });
        });

    function updateCartQuantity() {
        const cartQuantity = calculateCartQuantity();
        document.querySelector('.two').innerHTML = `(${cartQuantity} Items)`;
    }

    updateCartQuantity();

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;

                const container = document.querySelector(`.js-item-container-${productId}`);
                container.classList.add('is-editing-quantity');

            });
        });

    document.querySelectorAll('.js-save-quantity-link')
        .forEach((link) => {
            const productId = link.dataset.productId;
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            link.addEventListener('click', () => {
                //helper function
                handleUpdateQuantity(productId, quantityInput);
            });

            quantityInput.addEventListener('keydown', (event) => {
                if(event.key === 'Enter') handleUpdateQuantity(productId, quantityInput);
            });
        });

    function handleUpdateQuantity(productId, quantityInput) {
        const newQuantity = Number(quantityInput.value);
        if(newQuantity <= 0 || newQuantity >= 1000) {
            alert('Quantity must be at least 1 and less than 1000');
            return;
        }
        
        updateQuantity(productId, newQuantity);
        
        const container = document.querySelector(`.js-item-container-${productId}`);
        container.classList.remove('is-editing-quantity');
        
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.textContent = newQuantity;
        updateCartQuantity();
        renderPaymentSummary(); //by me
    }

    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                // const productId = element.dataset.productId;
                // const deliveryOptionId = element.dataset.deliveryOptionId;
                const { productId, deliveryOptionId } = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();  
                renderPaymentSummary();
            })
        });
}

renderOrderSummary();