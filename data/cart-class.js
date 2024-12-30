class Cart{
    cartItems;  // public property;
    #localStorageKey = undefined;   // private property

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.loadFromstorage();

    };
    
    loadFromstorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionId: '1'
            },
            {
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }
        ];
    };

    #saveToStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

    addToCart(productId, productQuantity){
        /* add product to chart */
        // check if product in chart already so as to increase it quantity
        let isExistProduct;
        this.cartItems.forEach(cartItem => {
            if (productId === cartItem.productId){
                isExistProduct = cartItem;
            };
        });
        
        if (isExistProduct){
            isExistProduct.quantity += productQuantity;
        }else{
            this.cartItems.push({
                productId,
                quantity: productQuantity,
                deliveryOptionId: '1'
            });
        }; 
        
        this.#saveToStorage();
    };
    
    removeFromCart(productId) {
        let newCart = [];
    
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem)
            };
        });
    
        this.cartItems = newCart;
    
        this.#saveToStorage();
    };

    updateQuantity(productId, newQuantity){
        this.cartItems.forEach(cartItem => {
            // if cartProductId is = to productID (param) and the newquantity is grater than 0 and as well less than 100
            if (cartItem.productId === productId && newQuantity > 0 && newQuantity < 1000){
                cartItem.quantity = Number(newQuantity);
                document.querySelector(`.js-quantity-label-${productId}`).textContent = newQuantity;
                this.#saveToStorage();
            };
        });
    }; 

    updateDeliveryOption(productId, newDeliveryOptionID) {
        const allProductId = [];
        this.cartItems.forEach(product => {
            allProductId.push(product.productId);
        });
        // check if the productId not in all the productId arr
        if (!allProductId.includes(productId)){
            console.log('not found');
            return;
        };
        let isExistProduct;

        this.cartItems.forEach(cartItem => {
            if (productId === cartItem.productId){
                isExistProduct = cartItem;
            };
        });

        isExistProduct.deliveryOptionId = newDeliveryOptionID;

        this.#saveToStorage();
    };

    getCartQuantity() {
        let cartQuantity = 0;
        this.cartItems.forEach(cartItem => {
            cartQuantity += cartItem.quantity;
        });
        return cartQuantity;
    };
};


export const cart = new Cart('cart');

// const businessCart = new Cart('cart-business');
// console.log(cart);
// console.log(businessCart);


export function loadCart(fun) {
  const xml = new XMLHttpRequest();
  xml.addEventListener('load', () => {
    console.log(xml.response);
    fun();
  });

  xml.open('GET', 'https://supersimplebackend.dev/cart');
  xml.send();
};

    
    