import { getOrder } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage () {
    await loadProductsFetch();

    const url = new URL(window.location.href);
	const orderId = url.searchParams.get('orderId');
	const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);

    let productDetails;
    order.products.forEach((details) => {
        if(details.productId === product.id) {
            productDetails = details;
        }
    });

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliverTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress = ((today - orderTime) / (deliverTime - orderTime)) * 100; 

    const trackingHTML = `
        <div class="order-details">
            <div class="order-status">
                <div class="order">Order: <span>Preparing</span></div>
                <div>Order arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('DD MMM YYYY')}</div>
            </div>
            <div class="product-summary">
                <div class="product-image">
                    <img src="${product.image}">
                </div>
                <div class="product-details">
                    <span class="season-logo">Seasons®</span>
                    <span>${product.name}</span>
                    <span>Quantity: ${productDetails.quantity}</span>
                    <span>Price: ₹${productDetails.quantity * product.price}</span>
                    <div class="progress-label-container">
                        <div class="progress-label ${
                            (percentProgress < 50) ? 'current-status' : ''
                        }">
                            <img src="images/tracking-utils/preparing.svg">
                        </div>
                        <div class="progress-label ${
                            (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
                        }">
                            <img src="images/tracking-utils/shipped.svg">
                        </div>
                        <div class="progress-label ${
                            (percentProgress >= 100) ? 'current-status' : ''
                        }">
                            <img src="images/tracking-utils/preparing.svg">
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" style="width: ${percentProgress}% "></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

loadPage();