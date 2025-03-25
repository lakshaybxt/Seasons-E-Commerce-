export function getProduct(productId) {
    let matchingProduct;
        
    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        }
    });
    return matchingProduct;
}

class Product {
    id;
    image;
    rating;
    name;
    price;
    keywords;

    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.rating= productDetails.rating;
        this.name = productDetails.name;
        this.price = productDetails.price;
        this.keywords = productDetails.keywords
    }

    getStarsURL() {
        return `images/ratings/rating-${this.rating.stars * 10}.png`;
    }

    getPrice() {
        return `₹${this.price}`;
    }
}

export let products = [];

export function loadProductsFetch() {
    const promise = fetch(
        'https://gist.githubusercontent.com/lakshaybxt/efe060afd31d45be49454e1514a62961/raw/32d2dcfbc8a6c3d4bb5aae62d62ca45cd83d5d14/products.json'
    ).then((response) => {
        return response.json();

    }).then((productsData) => {
        productsData = shuffleArray(productsData); //just shuffle the cart -- everytime
        products = productsData.map((productDetails) => {
            return new Product(productDetails);
        });
    }).catch(() => {
        console.log('Unexpected error. Please try again later.');
    })
    return promise;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/*
loadProductsFetch().then(() => {
    console.log('next step');
});
*/
/*
export function loadProducts(fun) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
        products = JSON.parse(xhr.response).map((productDetails) => {
            return new Product(productDetails);
        });

        console.log('load products');
        fun();
    });

    xhr.addEventListener('error', (error) => {
        console.log('Unexpected error. Please try again later!');
    })
    xhr.open('GET', 'https://gist.githubusercontent.com/lakshaybxt/efe060afd31d45be49454e1514a62961/raw/c22d3b248c6f5b3657db98e0a438066beb1bbeaa/products.json');
    xhr.send();
}
    
loadProducts();
*/

/*
export const products = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/product-images/Batman-tshirt.webp",
    rating: {
        stars: 4.5,
        count: 87
    },
    name: "Men's Black The Batman Printed T-shirt",
    price: 579,
    keywords: [
        "tshirt",
        "Batman",
        "Men",
        "Black"
      ]
}, {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/product-images/shoes-spider.gif",
    rating: {
        stars: 5,
        count: 101
    },
    name: "Men's Black & Red Spider-Verse Color Block Low-Top Sneakers",
    price: 1999,
    keywords: [
        "Sneakers",
        "Spider",
        "Man",
        "shoes"
      ]
}, {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/product-images/men-s-brown-oversized-joggers-646510-1736509076-1.webp",
    rating: {
        stars: 4,
        count: 127
    },
    name: "Men's Beige Oversized Joggers",
    price: 999,
    keywords: [
        "Joggers",
        "Oversized",
        "Men",
        "Brown"
    ]
}, {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/product-images/womens-mens-white-invertebros-graphic-printed-oversized-t-shirt-649878-1736314871-1.webp",
    rating: {
        stars: 5,
        count: 2197
      },
    name: "Women's White Invertebros Graphic Printed Oversized T-shirt",
    price: 799,
    keywords: [
        "Womens",
        "White",
        "Oversized",
        "t-shirt"
    ]
}, {
    id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
    image: "images/product-images/women-s-black-wide-leg-pants-654848-1736336943-1.webp",
    rating: {
        stars: 4,
        count: 37
    },
    name: "Women's Black Wide Leg Pants",
    price: 1299,
    keywords: [
        "Womens",
        "Black",
        "Wide",
        "Pants"
    ]
}, {
    id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
    image: "images/product-images/men-s-white-introvert-typography-oversized-t-shirt-611250-1741259217-1.webp",
    rating: {
        stars: 4.5,
        count: 175
    },
    name: "Men's White Introvert Typography Oversized T-shirt",
    price: 599,
    keywords: [
      "Men",
      "White",
      "t-shirt",
      "Oversized"
    ]
}, {
    id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    image: "images/product-images/women-s-black-white-graphic-printed-short-top-648493-1736314971-1.webp",
    rating: {
        stars: 4.5,
        count: 317
    },
    name: "Women's Black & White Polka Printed Short Top",
    price: 899,
    keywords: [
        "Black",
        "Women",
        "Polka",
        "Short",
        "Top"
    ]
}, {
    id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
    image: "images/product-images/women-stripe-slim-fit-top-1-620175-1702643595-1.webp",
    rating: {
        stars: 4.5,
        count: 144
    },
    name: "Women's White & Pink Striped Slim Fit Short Top",
    price: 699,
    keywords: [
        "Top",
        "Short",
        "Women",
        "Striped",
        "Pink",
        "White"
    ]
}, {
    id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
    image: "images/product-images/women-s-beige-all-over-printed-short-top-647146-1728995951-1.webp",
    rating: {
        stars: 4.5,
        count: 305
    },
    name: "Women's Beige & Black All Over Printed Short Top",
    price: 799,
    keywords: [
        "Top",
        "Short",
        "Women",
        "Striped",
        "Black",
        "Beige"
    ]
}, {
    id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
    image: "images/product-images/spiderman-baseball-cap-592448-1698922488-1.webp",
    rating: {
        stars: 4.5,
        count: 52
    },
    name: "Unisex Black Spiderman Printed Baseball Cap",
    price: 699,
    keywords: [
        "Unisex",
        "Spiderman",
        "Cap"
    ]
}, {
    id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
    image: "images/product-images/men-s-black-the-panda-way-graphic-printed-oversized-t-shirt-580633-1738673393-1.webp",
    rating: {
        stars: 4.5,
        count: 235
    },
    name: "Men's Black The Panda Way Graphic Printed Oversized T-shirt",
    price: 599,
    keywords: [
        "Men",
        "Black",
        "Panda",
        "Oversized",
        "t-shirt",
        "printed"
    ]
}, {
    id: "5968897c-4d27-4872-89f6-5bcb052746d7",
    image: "images/product-images/men-s-black-spider-punk-graphic-printed-zipper-sweatshirt-651188-1736428385-1.gif",
    rating: {
        stars: 5,
        count: 790
    },
    name: "Men's Black Spider Punk Graphic Printed Zipper Sweatshirt",
    price: 799,
    keywords: [
        "Men",
        "Black",
        "Spider",
        "Sweatshirt",
        "t-shirt",
        "Zipper",
        "Punk"
    ]
}, {
    id: "aad29d11-ea98-41ee-9285-b916638cac4a",
    image: "images/product-images/women-s-navy-blue-graphic-printed-oversized-hoodies-641002-1733719798-1.webp",
    rating: {
        stars: 4.5,
        count: 30
    },
    name: "Women's Navy Blue Graphic Printed Oversized ",
    price: 899,
    keywords: [
        "Women",
        "Navy Blue",
        "Graphic",
        "Oversized",
        "Hoodies"
    ]
}, {
    id: "04701903-bc79-49c6-bc11-1af7e3651358",
    image: "images/product-images/women-s-black-all-over-printed-oversized-dress-635470-1733295650-1.webp",
    rating: {
        stars: 4.5,
        count: 562
    },
    name: "Women's Black & White All Over Printed Dress",
    price: 1299,
    keywords: [
        "Women",
        "Dress",
        "Black"
    ]
}, {
    id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
    image: "images/product-images/men-s-blue-moon-knight-typography-t-shirt-473052-1721984996-1.webp",
    rating: {
        stars: 4,
        count: 160
    },
    name: "Men's Navy Blue Moon Knight Graphic Printed T-shirt",
    price: 499,
    keywords: [
        "Men",
        "Navy Blue",
        "Moon",
        "Knight",
        "t-shirt"
    ]
}, {
    id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
    image: "images/product-images/women-s-black-garfield-graphic-printed-oversized-t-shirt-dress-589796-1721651098-1.webp",
    rating: {
        stars: 4.5,
        count: 232
    },
    name: "Women's Black Garfield Graphic Printed Oversized T-shirt Dress",
    price: 799,
    keywords: [
        "Women",
        "Black",
        "t-shirt",
        "Dress"
    ]
}, {
    id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
    image: "images/product-images/men-s-gray-buff-inner-elastic-exposed-pyjama-581594-1689603678-1.webp",
    rating: {
        stars: 5,
        count: 846
    },
    name: "Men's Grey Pyjamas",
    price: 599,
    keywords: [
        "Men",
        "Grey",
        "Pyjamas"
    ]
}, {
    id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
    image: "images/product-images/unpredictable-ninja-naruto-sling-bag-608183-1698922869-1.webp",
    rating: {
        stars: 4,
        count: 99
    },
    name: "Unisex Black Unpredictable Ninja Naruto Printed Sling Bag",
    price: 449,
    keywords: [
        "Unisex",
        "Bag",
        "Naruto"
    ]
}, {
    id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
    image: "images/product-images/wicked-bucket-hat-608211-1701942093-1.webp",
    rating: {
        stars: 4,
        count: 215
    },
    name: "Unisex Black Wicked Printed Bucket Hat",
    price: 349,
    keywords: [
        "Unisex",
        "Hat",
        "Cap",
        "Black"
    ]
}, {
    id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
    image: "images/product-images/men-s-black-squid-game-graphic-printed-oversized-hoodie-t-shirt-659558-1735650203-1.webp",
    rating: {
        stars: 4.5,
        count: 2465
    },
    name: "Men's Black Squid Game Graphic Printed Oversized Hoodie T-shirt",
    price: 899,
    keywords: [
        "Men",
        "Squid", 
        "Game",
        "Oversized",
        "Hoodie",
        "t-shirt"
    ]
}, {
    id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
    image: "images/product-images/men-s-grey-oversized-shirt-649873-1740573902-1.webp",
    rating: {
        stars: 4.5,
        count: 119
    },
    name: "Men's Grey Oversized Shirt",
    price: 1299,
    keywords: [
        "Men",
        "Grey",
        "Oversized",
        "Shirt"
    ]
}, {
    id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
    image: "images/product-images/men-s-beige-checked-oversized-shirt-651169-1734610849-1.webp",
    rating: {
        stars: 4,
        count: 326
    },
    name: "Men's Beige Checked Oversized Shirt",
    price: 1499,
    keywords: [
        "Men",
        "Checked",
        "Oversized",
        "Shirt"
    ]
}, {
    id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
    image: "images/product-images/women-s-white-all-over-printed-midi-dress-645119-1733230874-1.webp",
    rating: {
        stars: 4.5,
        count: 2556
    },
    name: "Women's Off White All Over Printed Midi Dress",
    price: 1399,
    keywords: [
        "Women",
        "White",
        "Dress"
    ]
}, {
    id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
    image: "images/product-images/women-s-white-bodycon-dress-647147-1728912788-1.webp",
    rating: {
        stars: 4.5,
        count: 2286
    },
    name: "Women's White & Red All Over Printed Flared Dress",
    price: 899,
    keywords: [
        "Women",
        "Dress",
        "Flared"
    ]
}, {
    id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
    image: "images/product-images/women-s-black-slim-fit-bodycon-midi-dress-644913-1732884769-1.webp",
    rating: {
        stars: 4,
        count: 456
    },
    name: "Women's Black Slim Fit Bodycon Midi Dress",
    price: 1199,
    keywords: [
        "Women",
        "Black",
        "Slim",
        "Fit",
        "Dress"
    ]
}, {
    id: "d2785924-743d-49b3-8f03-ec258e640503",
    image: "images/product-images/men-s-black-yellow-dark-knight-color-block-high-top-sneakers-630672-1718715099-1.webp",
    rating: {
        stars: 5,
        count: 83
    },
    name: "Men's Black & Yellow Dark Knight Color Block High Top Sneakers",
    price: 1699,
    keywords: [
        "Men",
        "Sneakers",
        "Yellow",
        "Black",
        "Block",
        "Low",
        "Top"
    ]

}, {
    id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
    image: "images/product-images/men-s-black-beige-stark-latte-color-block-sneakers-640591-1725605377-1.webp",
    rating: {
        stars: 4.5,
        count: 9017
    },
    name: "Tony Stark Black & Beige Color Block Low Top Sneakers",
    price: 1699,
    keywords: [
        "Men",
        "Sneakers",
        "Tony",
        "Black",
        "Block",
        "Low",
        "Top"
    ]
}, {
    id: "1c079479-8586-494f-ab53-219325432536",
    image: "images/product-images/b-star-sling-bag-476642-1655815006-1.webp",
    rating: {
        stars: 4,
        count: 229
    },
    name: "Unisex Black B Star Sling Bag",
    price: 469,
    keywords: [
        "Unisex",
        "Bag",
        "Black"
    ]
}, {
    id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
    image: "images/product-images/men-s-black-white-akatsuki-typography-oversized-varsity-shorts-634302-1734342448-1.webp",
    rating: {
        stars: 4.5,
        count: 428
    },
    name: "Men's Black & White Akatsuki Typography Oversized Varsity Shorts",
    price: 899,
    keywords: [
        "Men",
        "Akatsuki",
        "Oversized",
        "Shorts"
    ]
}, {
    id: "44e37dd03-3b23-4bc6-9ff8-44e112a92c64",
    image: "images/product-images/women-s-black-orange-all-over-printed-skorts-635443-1729513019-1.webp",
    rating: {
        stars: 4.5,
        count: 311
    },
    name: "Women's Black & Orange All Over Printed Skorts",
    price: 899,
    keywords: [
        "Women",
        "Black",
        "Orange",
        "Printed",
        "Shorts",
        "Skorts"
    ]
}, {
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/product-images/men-s-brown-minion-badge-graphic-printed-oversized-t-shirt-596526-1742219511-1.webp",
    rating: {
        stars: 4.5,
        count: 130
    },
    name: "Men's Brown Minion Badge Graphic Printed Oversized T-shirt",
    price: 569,
    keywords: [
        "Men",
        "Minion",
        "Oversized",
        "t-shirt",
        "Printed",
        "Graphic"
    ]
}, {
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/product-images/men-s-blue-create-good-stories-graphic-printed-oversized-vest-637444-1724051693-1.webp",
    rating: {
        stars: 4.5,
        count: 248
    },
    name: "Men's Blue Create Good Stories Graphic Printed Oversized Vest",
    price: 569,
    keywords: [
        "Men",
        "Vest",
        "Oversized",
        "Printed",
        "Vest"
    ]
}, {
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/product-images/men-s-jet-black-doom-graphic-printed-oversized-t-shirt-648705-1738066522-1.webp",
    rating: {
        stars: 4.5,
        count: 117
    },
    name: "Men's Jet Black Doom Graphic Printed Oversized T-shirt",
    price: 799,
    keywords: [
        "Men",
        "Doom",
        "Oversized",
        "Graphic",
        "t-shirt",
        "Printed"
    ]
}, {
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/product-images/women-s-black-double-trouble-graphic-printed-oversized-t-shirt-654682-1740739610-1.webp",
    rating: {
        stars: 4,
        count: 126
    },
    name: "Women's Black Double Trouble Graphic Printed Oversized T-shirt",
    price: 799,
    keywords: [
        "Women",
        "Black",
        "Oversized",
        "Graphic",
        "t-shirt",
        "Printed"
    ]
}, {
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/product-images/men-s-grey-eternity-graphic-printed-oversized-t-shirt-596129-1735645993-1.webp",
    rating: {
        stars: 4.5,
        count: 1211
    },
    name: "Men's Grey Eternity Graphic Printed Oversized T-shirt",
    keywords: [
        "Men",
        "Eternity",
        "Oversized",
        "Graphic",
        "t-shirt",
        "Printed"
    ]
}].map((productDetails) => {
    return new Product(productDetails);
});
*/