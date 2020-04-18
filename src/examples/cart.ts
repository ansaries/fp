import { mul, sub } from '../lib/arithmatics';

/*
The cart is an array of objects like this:
*/
export const cart = [
  { name: 'Biscuits', type: 'regular', category: 'food', price: 2.0 },
  { name: 'Monitor', type: 'prime', category: 'tech', price: 119.99 }, // => 50
  { name: 'Mouse', type: 'prime', category: 'tech', price: 25.5 }, // => 50
  { name: 'dress', type: 'regular', category: 'clothes', price: 49.9 } // => 10%
];

function isPrime(item) {
  return item.type === 'prime';
}

export function primeItems(_cart) {
  return _cart.filter(isPrime);
}

export function noPrimeItems(_cart: Array<any>) {
  return _cart.reject(isPrime);
}

/**
 * Cart Manupulation is a good example of Partial Apply
 *
 * @export
 * @param {number} discount
 * @param {Function} fn
 * @returns
 */
export function applyDiscount(
  discount: number,
  fn: (c: { price: number }, discount: number) => void
) {
  return (prop, value) => (_cart: Array<any>) =>
    _cart.reduce(
      (p, c) =>
        c[prop] === value
          ? p.pushItem(Object.assign({}, c, { price: fn(c.price, discount) }))
          : p.pushItem(c),
      []
    );
}

const discountPercent = applyDiscount(0.9, mul);
const discountAmount = applyDiscount(20, sub);
export const techItemDiscount = discountPercent('category', 'tech');
export const clothingItemDiscount = discountAmount('category', 'clothes');

export function applyTax(percent) {
  return x => x * (1 - percent / 100);
}
export function getTax(percent) {
  return x => (x * percent) / 100;
}

export function sumOfPrice(x: number, y: any) {
  return x + y.price;
}
