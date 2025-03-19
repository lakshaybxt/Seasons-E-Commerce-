import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: addToCart', () => {
    it('adds an existing product to the cart,', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        //mock - quantity selector input
        const mockInput = document.createElement('input');
        mockInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        mockInput.value = 1;
        document.body.appendChild(mockInput);

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);
        document.body.removeChild(mockInput);
    });

    it('adds a new product to the cart', () => {
        spyOn(localStorage, 'setItem');
        // mock - make a fake version
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        const mockInput = document.createElement('input');
        mockInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        mockInput.value = 1;
        document.body.appendChild(mockInput);

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1); 
        document.body.removeChild(mockInput);
    });
});