class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [{
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

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
        this.cartItems.forEach((item) => {
            if(productId === item.productId) {
                matchingItem = item;
            }
        });
    
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        const quantity = Number(quantitySelector.value);
    
        if(matchingItem) {
            matchingItem.quantity += quantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1'
            });
        }
        //after item add to the cart reset the quantity selector quantity
        quantitySelector.value = 1;
    
        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems = this.cartItems.filter((cartItem) => {
            return (cartItem.productId !== productId);
        });
        this.saveToStorage();
    }
    
    calculateCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach((item) => {
            cartQuantity += item.quantity;
        });
        return cartQuantity;    
    }

    updateQuantity(productId, newQuantity) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}
//created an object of cart for our cart
const cart = new Cart('cart-oop');
/*
// can be used for business - no need now
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);
*/
export { cart };


export function loadCart(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        fun();
    });

    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
}