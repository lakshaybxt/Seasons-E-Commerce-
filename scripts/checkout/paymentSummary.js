import { cart, calculateCartQuantity } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { getDeliveryOption } from '../data/deliveryOption.js';

export function renderPaymentSummary() {
    let productPrice = 0;
    let shippingPrice = 0;

    cart.forEach((cartItem) => {
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
            <div>Total MRP (${calculateCartQuantity()}) </div>
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
        <button class="place-order-button button-primary">
            PROCEED
        </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = pymentSummaryHTML;
    // console.log(pymentSummaryHTML);
}