import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getProduct, loadProductsFetch } from '../data/products.js';

async function loadPage() {
    await loadProductsFetch();
    let ordersHTML = ``;

    orders.forEach((order) => {
        const orderTimeString = dayjs(order.orderTime).format('MMMM D');

        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">ORDER PLACED:</div>
                            <div>${orderTimeString}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">TOTAL:</div>
                            <div>₹${order.totalCostCents}</div>
                        </div>
                    </div>

                    <div class="order-header-right-section">
                        <div class="order-header-label">ORDER ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${productListHTML(order)}
                </div>
            </div>

        `;
    });

    function productListHTML(order) {
        let productListHTML = ``;

        order.products.forEach((productDetails) => {
            // console.log(productDetails.productId);
            const product = getProduct(productDetails.productId);
            // console.log(product)

            productListHTML += `
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>

                <div class="product-details">
                    <div class="seasons">Seasons®</div>
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${
                            dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
                        }
                    </div>
                    <div class="product-quantity">
                        Quantity: <span>${productDetails.quantity}</span>
                    </div>
                    <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${product.id}"><button class="track-package-button button-secondary">
                        Track package
                    </button></a>
                </div>
            `;
        });
        return productListHTML;
    }

    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

loadPage();