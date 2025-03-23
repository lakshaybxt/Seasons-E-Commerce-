import { cart } from "./cart-class.js";
import { deliveryOptions } from "./deliveryOption.js";
import { products } from "./products.js";

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    order.totalCostCents = fixPrice();  //fix the order price
    // console.log(order);
    orders.unshift(order);
    saveToStorage();
    // console.log(orders);
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function fixPrice() {
    let totalCost = 0;
    cart.cartItems.forEach((cartItem) => {
        const product = products.find(product => product.id === cartItem.productId);

        const deliveryOption = deliveryOptions.find(option => option.id === cartItem.deliveryOptionId);

        if(product) {
            totalCost += product.price * cartItem.quantity;
        }

        if(product) {
            totalCost += deliveryOption.price;
        }
    });
    const tax = ((totalCost * 12) / 100).toFixed(2);
    const total = (totalCost + Number(tax)).toFixed(2);
    return total;
}