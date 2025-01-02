import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

class Order {
    localStorageKey;
    orderItems;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.orderItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    };
    addOrder(order) {
        this.orderItems.unshift(order);

        this.saveToLocalStorage();
    };

    saveToLocalStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.orderItems));
    };

    formatDate(date){
        const orderTime = dayjs(date);
        return `${orderTime.format('MMMM')} ${orderTime.date()}`
    }
};

export const order = new Order('orders');
var log = console.log;