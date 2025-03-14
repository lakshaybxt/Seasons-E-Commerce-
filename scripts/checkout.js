import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from './data/cart.js';
import { products } from './data/products.js';

let catSummaryHTML = ``;

cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;
    
    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    });

    catSummaryHTML += `
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
                        Delivery by <span> Tuesday, June 21</span>
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
                    <div class="delivery-option">
                        <input type="radio" checked
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Tuesday, June 21
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Wednesday, June 15
                            </div>
                            <div class="delivery-option-price">
                                ₹50 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                                Monday, June 13
                            </div>
                            <div class="delivery-option-price">
                                ₹70 - Shipping
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
});
document.querySelector('.js-order-summary').innerHTML = catSummaryHTML;

document.querySelectorAll('.js-delete-button')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);

            const container = document.querySelector(`.js-item-container-${productId}`);
            
            if(container) container.remove();
            updateCartQuantity();
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
}