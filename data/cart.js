export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
    }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '3'
    }, {
        productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
        quantity: 1,
        deliveryOptionId: '2'
    }, {
        productId: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
        quantity: 1,
        deliveryOptionId: '1'
    }];
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
    let matchingItem;
    cart.forEach((item) => {
        if(productId === item.productId) {
            matchingItem = item;
        }
    });

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    if(matchingItem) {
        matchingItem.quantity += quantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1'
        });
    }
    //after item add to the cart reset the quantity selector quantity
    quantitySelector.value = 1;

    saveToStorage();
}

export function removeFromCart(productId) {
    cart = cart.filter((cartItem) => {
        return (cartItem.productId !== productId);
    });
    saveToStorage();
}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    });
    return cartQuantity;    
}

export function updateQuantity(productId, newQuantity) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}