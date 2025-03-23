import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
// import { loadCart } from '../data/cart-class.js';
// import '../data/cart-class.js';

//even bettwer to handle asynchronus code
async function loadPage() {
    await loadProductsFetch();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
//It will wait for both promise to resolve then move towards the next step
Promise.all([
    loadProductsFetch(),
    // new Promise((resolve) => {
    //     loadCart(() => {
    //         resolve();
    //     });
    // })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/
/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/