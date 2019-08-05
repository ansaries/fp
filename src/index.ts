import {zip, zipWith, transpose, take, range, interleave, zipDic, zipMap, zipMapWith} from './lib/collections';
import { sub, add, mul, div, negate, double, isEven, isPositive, allOk, frequencies, addArgs, subArgs, negateArgs, doubleArgs} from './lib/arithmatics';
import {clist} from './lib/clist';
import {compose, flow} from './lib/compose_flow';
import {update, update_in} from './lib/crud';
import { merge_with } from './lib/objects';
import "./lib/array";
import { noPrimeItems, cart, primeItems, techItemDiscount, clothingItemDiscount, applyDiscount, applyTax, getTax, sumOfPrice } from './examples/cart';

const mlist = {
    1: clist,
    2: subArgs,
    3: addArgs,
    4: compose,
    5: flow,
}

// Partial Application Method
const method = (x) => (...args) => mlist[x](...args);

// console.log(method(4)(
//     addArgs,
//     negateArgs, 
//     doubleArgs,
//     )(1,2,3));

// console.log([[1,2,3],[4,5,6]].zip());
// console.log(take(5,range(10)));
// console.log([3,2,1].flip());
// console.log([[3,[2],1], [[[[9]]]], range(10), 33].flatten());
// console.log(interleave([1,2,3],[4,5,6],[7,8,9]));
// console.log(interleave1([1,2,3],[4,5,6],[7,8,9]));

// console.log(allOk(isPositive, isEven)(7));
// console.log(frequencies([1,2,2,3,3,3,4]));

const h1 = (str) => `<h1>${str}</h1>`;
const h2 = (str) => `<h2>${str}</h2>`;
const h3 = (str) => `<h3>${str}</h3>`;

const concatPrintValues = (x,y) => {
    if(typeof x != 'string')
        x = JSON.stringify(x); 
    if(typeof y != 'string')
        y = JSON.stringify(y);
        
    return x + y;
}


const Print = (...args) => document.getElementById('out').innerHTML += args.reduce(concatPrintValues) +'<br>';

Print(h2('Merge With'), merge_with(add)({"a": 1, "b": 2}, {"b": 3, c: 12}));

var a = {"a": 1, "b": {"c": 2, d: {e: 10}}};
Print(h2('Update In'), '<strong> var a = {a: 1, b: {c: 2, d: {e: 10}}} </strong>', h3('update_in(a, ["b", "d", "e"], mul, 0.9)'), JSON.stringify(update_in(a, ["b", "d", "e"], mul, 0.9)));
Print(h2('Concat Map'), [[1,2,3],[4,5,6],[7,8,9]].concatMap(add));
Print(h2('ZipWith add'), [[1,2,3],[4,5,6],[7,8,9]].zipWith(add));
Print(h2('ZipDic'), zipDic(['a','b','c'],[1,2,3]));
Print(h2('Not Prime'), noPrimeItems(cart));
Print(h2('Prime'), primeItems(cart));

Print(h2('Original Cart => '), '<strong>', JSON.stringify(cart), '</strong>');
let VAT = getTax(5);
let GST = getTax(17);

const subTotal = zipMapWith(sumOfPrice,0);
let subTotalCart = subTotal(cart);

Print('<strong>Sub Total -- ', flow(Math.round)(subTotalCart), '</strong>');
Print('VAT Tax -- ', flow(VAT, Math.round)(subTotalCart));
Print('GST Tax -- ', flow(GST, Math.round)(subTotalCart));
Print('<strong style="font-size:20px"> Total -- ', 
    flow(addArgs, Math.round)(subTotalCart, VAT(subTotalCart), GST(subTotalCart)),
    '</strong>'
);
// Print(h3('Category Tech Discounted by 10%'), techItemDiscount(cart));
// Print(h3('Prime Discounted by 10%'), clothingItemDiscount(cart));

export const coupon = {
    type: 'item',
    items: [
        {on: 'category', value: 'food', percent: 10},
        {on: 'category', value: 'tech', percent: 50},
    ]
};

const updatedCart: Array<any> = coupon.items.reduce((p,c) => 
    applyDiscount((1 - c.percent/100), mul)(c.on, c.value)(p)
,cart);
VAT = getTax(5);
GST = getTax(17);
const subTotalDiscountedCart = subTotal(updatedCart);
const discountTotal = subTotalCart - subTotalDiscountedCart; 

Print(h3('Discounted Cart as per coupon'), updatedCart);
Print('<strong>Sub Total -- ', flow(Math.round)(subTotalDiscountedCart), '</strong>');
Print('VAT Tax -- ', flow(VAT, Math.round)(subTotalDiscountedCart));
Print('GST Tax -- ', flow(GST, Math.round)(subTotalDiscountedCart));
Print('Total Discount -- ', flow(Math.round)(discountTotal));
Print('<strong style="font-size:20px"> Total -- ', 
    flow(addArgs, Math.round)(subTotalDiscountedCart, VAT(subTotalDiscountedCart), GST(subTotalDiscountedCart)),
    '</strong>'
);