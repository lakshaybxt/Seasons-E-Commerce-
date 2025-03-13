let productsHTML = ``;
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <!-- images -->
                <img class="product-image" src="${product.image}">
                <!-- stars -->
                <div class="product-rating-container">
                    <img class="product-rating-stars"
                        src="images/ratings/rating-${product.rating.stars * 10}.png">
                    <span class="product-rating-count link-primary">
                        ${product.rating.count}
                    </span>
                </div>
            </div>
            <div class="lower-container">
                <div class="name-qty">
                    <!-- product name -->
                    <div class="name-tag">Seasons®</div>
                    <div class="product-quantity-container">
                        <select class="select-qty js-quantity-selector-${product.id}">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>
                </div>
                <div class="product-name limit-text-to-1-lines">
                    ${product.name}
                </div>
                <!-- price & qty -->
                <div class="price-qty-container">
                    <div class="product-price">
                        ₹${product.price}
                    </div>
                    <!-- added a data attribute -->
                    <button class="add-to-cart-button js-add-to-cart"
                    data-product-id="${product.id}">
                        ADD TO BAG
                    </button>
                </div>
            </div>			
        </div>
    `;
});

//whiile generating the HTML above for home page in add to bag button we give a DATA ATTRIBUTE" to the button so we get every button uniquely

document.querySelector('.products-grid').innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        //Here we getting each button seperately by the data attribure
        let productId = button.dataset.productId
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
                quantity: quantity
            });
        }

        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        });
        console.log(cart);

        document.querySelector('.js-nav-right-quantity').innerHTML = cartQuantity;
        //after item add to the cart reset the quantity selector quantity
        quantitySelector.value = 1;
    });
});