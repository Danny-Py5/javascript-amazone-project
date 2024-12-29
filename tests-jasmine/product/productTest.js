import {products, Product, Appliances, Clothing} from '../../data/products.js';


describe('Test Suit: Product', () => {
    const product = new Product({
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel"
        ]
    });
   
    it('it getStarsUrl', () => {
        // console.log(product)
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    });

    it('It getPrice', () => {
        expect(product.getPrice()).toEqual('$10.90');
    });

    it('Not display extra Information', () => {
        expect(product.extraInfoHTML()).toEqual('');
    });
});

describe('Test Suit: Clothing', () => {

    const product = new Clothing({
        id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
        image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
        name: "Adults Plain Cotton T-Shirt - 2 Pack",
        rating: {
          stars: 4.5,
          count: 56
        },
        priceCents: 799,
        keywords: [
          "tshirts",
          "apparel",
          "mens"
        ],
        type: "clothing",
        sizeChartLink: "images/clothing-size-chart.png"
      })
    
    it('it getStarsUrl', () => {
        // console.log(product)
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    });

    it('It getPrice', () => {
        expect(product.getPrice()).toEqual('$7.99');
    });

    it('display extraInfo size Chart', () => {
        expect(product.extraInfoHTML()).toContain('<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>');

        const extralInfoCont = document.createElement('div');
        extralInfoCont.innerHTML = product.extraInfoHTML();

        expect(extralInfoCont.firstChild.href).toEqual('http://127.0.0.1:5501/tests-jasmine/images/clothing-size-chart.png');
    });
});

describe('Test Suit: Apliance => Instruction and warranty', () => {
    const product = new Appliances({
        id: "54e0eccd-8f36-462b-b68a-8182611d9add",
        image: "images/products/black-2-slot-toaster.jpg",
        name: "2 Slot Toaster - Black",
        rating: {
          stars: 5,
          count: 2197
        },
        priceCents: 1899,
        keywords: [
          "toaster",
          "kitchen",
          "appliances"
        ], 
        type: 'instructionsLink',
        instructionsLink: 'images/appliance-instructions.png',
        warrantyLink: 'images/appliance-warranty.png'
    });
    
    it('it getStarsUrl', () => {
        // console.log(product)
        expect(product.getStarsUrl()).toEqual(`images/ratings/rating-${product.rating.stars * 10}.png`);
    });

    it('It getPrice', () => {
        expect(product.getPrice()).toEqual('$18.99');
    });

    it('display extraInfo ', () => {
        expect(product.extraInfoHTML()).not.toContain('<a href="images/clothing-size-chart.png" target="_blank">Size Chart</a>');
        expect(product.extraInfoHTML()).toContain('Instructions')
        expect(product.extraInfoHTML()).toContain('Warranty');
    });
});


