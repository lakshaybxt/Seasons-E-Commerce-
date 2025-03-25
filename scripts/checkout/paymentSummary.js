// import { cart, calculateCartQuantity } from '../../data/cart.js';
import { cart } from '../../data/cart-class.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOption.js';
import { addOrder } from '../../data/orders.js';

export function renderPaymentSummary() {
    let productPrice = 0;
    let shippingPrice = 0;

    cart.cartItems.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPrice += product.price * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice += deliveryOption.price;
    });

    // console.log(shippingPrice);
    const totalBeforTax = productPrice + shippingPrice;
    const tax = ((totalBeforTax * 12) / 100).toFixed(2);
    const total = (totalBeforTax + Number(tax)).toFixed(2);

    const pymentSummaryHTML = `
        <div class="payment-summary-title">
            PRICE SUMMARY
        </div>

        <div class="payment-summary-row">
            <div>Total MRP (${cart.calculateCartQuantity()}) </div>
            <div class="payment-summary-money">₹${productPrice}</div>
        </div>
        <div class="payment-summary-row">
            <div>Delivery Fee </div>
            <div class="payment-summary-money">₹${shippingPrice}</div>
        </div>
        <div class="payment-summary-row subtotal-row">
            <div>Total before tax </div>
            <div class="payment-summary-money">₹${totalBeforTax}</div>
        </div>
        <div class="payment-summary-row">
            <div>Estimated tax (12%) </div>
            <div class="payment-summary-money">₹${tax}</div>
        </div>
        <div class="payment-summary-row total-row">
            <div>Subtotal</div>
            <div class="payment-summary-money">₹${total}</div>
        </div>
        <button class="place-order-button button-primary js-place-order-button">
            PROCEED
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = pymentSummaryHTML;
    
    //here i'm sending code to backend instead of creating by js
    document.querySelector('.js-place-order-button')
        .addEventListener('click', async () => {
            try {
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        cart: cart.cartItems
                    })
                });
                const order = await response.json();
                // console.log(order);
                addOrder(order);
            } catch(error) {
                console.log('Unexpected error. Try again later.')
            }
            
            cart.resetCart();
            window.location.href = 'orders.html';
        });
}