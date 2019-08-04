import { mul, sub } from "../arithmatics";

/*
The cart is an array of objects like this:
*/
export const cart=[
  {"name":"Biscuits", "type":"regular", "category":"food", "price": 2.0},
  {"name":"Monitor", "type":"prime", "category":"tech", "price": 119.99},
  {"name":"Mouse", "type":"prime", "category":"tech", "price": 25.50},
  {"name":"dress", "type":"regular", "category":"clothes", "price": 49.90},
]

function isPrime(item){
    return item.type === 'prime'
}

export function primeItems(cart){
    return cart.filter(isPrime);
}

export function noPrimeItems(cart: Array<any>) {
    return cart.reject(isPrime);
}

export function applyDiscount(discount: number, fn: Function) {
    return (prop, value) => 
                (cart: Array<any>) => 
                cart.reduce((p,c) => c[prop] == value ? p.pushItem(Object.assign({}, c, {price: fn(c.price, discount)})) : p.pushItem(c),[]); 
}

const discountPercent = applyDiscount(0.9, mul);
const discountAmount = applyDiscount(20, sub);
export const techItemDiscount = discountPercent('category', 'tech');
export const clothingItemDiscount = discountAmount("category","clothes");

export function applyTax(percent) {
    return (x) => x* (1-percent/100);
}
export function getTax(percent) {
    return (x) => x*percent/100;
}