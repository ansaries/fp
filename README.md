# Functional Programming Practice
This repository includes array, collection, object and other example manupulations using functional programming practices. Most of the excercises were mentioned [here](https://gist.github.com/oskarkv/3168ea3f8d7530ccd94c97c19aafe266)

## Getting Started
To clone this repository
```
git clone https://github.com/ansaries/fp.git
```
Then run
```
npm install
```
I have used **parcel** for packaging and hot reload, so to run it use
```
parcel ./src/index.html
```
or just type in your console
```
npm start
```
# API Index

## Functions

<dl>
<dt><a href="#merge_with">merge_with(fn)</a> ⇒ <code>Object</code></dt>
<dd><p>Merges Multiple Objects into one final Object with applied maping method</p></dd>
<dt><a href="#memoize">memoize(fn)</a> ⇒ <code>function</code></dt>
<dd><p>Memoize a funtion based on its arguments</p></dd>
<dt><a href="#compose">compose(...fns)</a> ⇒ <code>function</code></dt>
<dd><p>Compose pipes all methods from right to left
The return value of last(right) method will be injected
into the arguments of next(left) method.</p></dd>
<dt><a href="#flow">flow(...fns)</a> ⇒ <code>function</code></dt>
<dd><p>Flow pipes all methods from left to right
The return value of first(left) method will be injected
into the arguments of next(right) method.</p></dd>
<dt><a href="#pushItem">pushItem(...args)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Pushes an Item in Array and returns the Array with the new Item</p></dd>
<dt><a href="#concatAll">concatAll()</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Concat all arrays</p></dd>
<dt><a href="#concatMap">concatMap(fn)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Concat all arrays while applying a Map function on each element of each array</p></dd>
<dt><a href="#flip">flip()</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Revese the array</p></dd>
<dt><a href="#flatten">flatten(initial)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Flattens a multi-dimensional array of any depth</p></dd>
<dt><a href="#insert">insert(item, i)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Insert an item on a specified location and shift all of the rest to right.</p></dd>
<dt><a href="#reject">reject(mapFn)</a></dt>
<dd><p>Returns items that does not full fill the filterFn</p></dd>
<dt><a href="#clist">clist(...args)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Converts arguments to array</p></dd>
<dt><a href="#take">take(x, ar)</a> ⇒ <code>Array.&lt;T&gt;</code></dt>
<dd><p>Take a slice of array starting at 0 to x from an array ar</p></dd>
<dt><a href="#range">range(N)</a> ⇒ <code>Array.&lt;number&gt;</code></dt>
<dd><p>Similar to range method of Python, creates an array of number from 1 to N</p></dd>
<dt><a href="#frequencies">frequencies()</a> ⇒ <code>function</code></dt>
<dd><p>Takes a sequence and counts how many times the elements appear in the sequence, returns a map.</p></dd>
<dt><a href="#interleaveNfn">interleaveNfn(...args)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Iterative Implementation of Interleave Time Complexity O(n)
Interleaving is transposing two dimensional array
and then concating or flattening it.</p></dd>
<dt><a href="#interleaveFn">interleaveFn(...args)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Functional Implementation of Interleave
Interleaving is transposing two dimensional array
and then concating or flattening it.</p></dd>
<dt><a href="#zip">zip(...args)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Transposes multi dimensional array</p></dd>
<dt><a href="#transpose">transpose(...args)</a> ⇒ <code>Array.&lt;any&gt;</code></dt>
<dd><p>Transpose multi dimensional array</p></dd>
<dt><a href="#zipWith">zipWith(fn)</a> ⇒ <code>function</code></dt>
<dd><p>Accumulating the multi dimensional array using a accumulator method</p></dd>
<dt><a href="#zipMapWith">zipMapWith(fn, initialValue)</a> ⇒ <code>*</code></dt>
<dd><p>Takes a map function to apply on the array taken by composed function.</p></dd>
<dt><a href="#zipDic">zipDic(left, right)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates an object from two arrays</p></dd>
<dt><a href="#zipMap">zipMap(left, right, mapFn)</a> ⇒ <code>Array.&lt;(Object|any)&gt;</code></dt>
<dd><p>Zips two arrays and maps out the output using the mapFn</p></dd>
<dt><a href="#update">update(obj, prop, mapFn, val)</a> ⇒ <code>T</code></dt>
<dd><p>Updates a particular propery of an object using the mapFn function</p></dd>
<dt><a href="#update_in">update_in(obj, propMap, mapFn, val)</a> ⇒ <code>T</code></dt>
<dd><p>Updates a particular property in a deep object tree using a map of keys and a map function.</p></dd>
</dl>

## API Description
<a name="merge_with"></a>

## merge\_with(fn) ⇒ <code>Object</code>
<p>Merges Multiple Objects into one final Object with applied maping method</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

**Example**  
```js
merge_with(add, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 4}
```
**Example**  
```js
merge_with(sub, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 0}// Similar to zipWith() for arrays
```
<a name="memoize"></a>

## memoize(fn) ⇒ <code>function</code>
<p>Memoize a funtion based on its arguments</p>

**Kind**: global function  
**Summary**: <p>Memoization requires that the passed function should be a pure-function</p>  
**Returns**: <code>function</code> - <p>return a reusable function</p>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Pure Function</p> |

**Example**  
```js
const summemo = memoize(add);const submemo = memoize(sub);summemo(4,6); // Computes 4 + 6 => 10submemo(4,6); // Computes 4 - 6 => -2summemo(4,6); // Does not compute, rather return from cash => 10submemo(4,6); // Does not compute, rather return from cash => -2
```
<a name="compose"></a>

## compose(...fns) ⇒ <code>function</code>
<p>Compose pipes all methods from right to left
The return value of last(right) method will be injected
into the arguments of next(left) method.</p>

**Kind**: global function  
**Returns**: <code>function</code> - <p>Returns a function which takes any argument</p>  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>Array.&lt;function()&gt;</code> | <p>one or more functions as arguments to apply composedly</p> |

**Example**  
```js
// Suppose you want to get Grand Total of a cart after Tax and Discount.var getGrandTotal = compose(Math.round, add);// grandTotal = subTotalCart + Vat + Gst - Discountvar grandTotal = getGrandTotal(subTotalCart, VAT(subTotalCart), GST(subTotalCart),negative(Discount(subTotalCart)));// Suppose for no EU customer the Vat does not applyvar nonUsGrandTotal = getGrandTotal(subTotalCart, GST(subTotalCart),negative(Discount(subTotalCart)))
```
<a name="flow"></a>

## flow(...fns) ⇒ <code>function</code>
<p>Flow pipes all methods from left to right
The return value of first(left) method will be injected
into the arguments of next(right) method.</p>

**Kind**: global function  
**Returns**: <code>function</code> - <p>Returns a function which takes any argument</p>  

| Param | Type | Description |
| --- | --- | --- |
| ...fns | <code>Array.&lt;function()&gt;</code> | <p>one or more functions as arguments to apply composedly</p> |

**Example**  
```js
// Suppose you want to get Grand Total of a cart after Tax and Discount.var getGrandTotal = flow(add, Math.round);// grandTotal = subTotalCart + Vat + Gst - Discountvar grandTotal = getGrandTotal(subTotalCart, VAT(subTotalCart), GST(subTotalCart),negative(Discount(subTotalCart)));// Suppose for no EU customer the Vat does not applyvar nonUsGrandTotal = getGrandTotal(subTotalCart, GST(subTotalCart),negative(Discount(subTotalCart)))
```
<a name="pushItem"></a>

## pushItem(...args) ⇒ <code>Array.&lt;any&gt;</code>
<p>Pushes an Item in Array and returns the Array with the new Item</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

<a name="concatAll"></a>

## concatAll() ⇒ <code>Array.&lt;T&gt;</code>
<p>Concat all arrays</p>

**Kind**: global function  
<a name="concatMap"></a>

## concatMap(fn) ⇒ <code>Array.&lt;T&gt;</code>
<p>Concat all arrays while applying a Map function on each element of each array</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

**Example**  
```js
[[1,2,3],[4,5],[6]].concatMap(add); // => [1,3,5,7,9,11]
```
<a name="flip"></a>

## flip() ⇒ <code>Array.&lt;T&gt;</code>
<p>Revese the array</p>

**Kind**: global function  
<a name="flatten"></a>

## flatten(initial) ⇒ <code>Array.&lt;T&gt;</code>
<p>Flattens a multi-dimensional array of any depth</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| initial | <code>\*</code> | 

**Example**  
```js
[[1],[[[2]],[[[[[3]]]]]].flatten(); // => [1,2,3,4]
```
<a name="insert"></a>

## insert(item, i) ⇒ <code>Array.&lt;T&gt;</code>
<p>Insert an item on a specified location and shift all of the rest to right.</p>

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| item | <code>T</code> |  | 
| i | <code>number</code> | <code>0</code> | 

**Example**  
```js
[1,3,4,5,6].insert(2,1) => [1,2,3,4,5,6]
```
<a name="reject"></a>

## reject(mapFn)
<p>Returns items that does not full fill the filterFn</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| mapFn | <code>function</code> | <p>(x: any, i: number) =&gt; Array<T></p> |

<a name="clist"></a>

## clist(...args) ⇒ <code>Array.&lt;any&gt;</code>
<p>Converts arguments to array</p>

**Kind**: global function  
**Returns**: <code>Array.&lt;any&gt;</code> - <p>Return an Array of type any</p>  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>any</code> | <p>Arguments of type any</p> |

**Example**  
```js
clist(1,2,3,4,5); => [1,2,3,4,5]
```
<a name="take"></a>

## take(x, ar) ⇒ <code>Array.&lt;T&gt;</code>
<p>Take a slice of array starting at 0 to x from an array ar</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| x | <code>number</code> | 
| ar | <code>Array.&lt;any&gt;</code> | 

<a name="range"></a>

## range(N) ⇒ <code>Array.&lt;number&gt;</code>
<p>Similar to range method of Python, creates an array of number from 1 to N</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| N | <code>number</code> | 

**Example**  
```js
range(10) => [1,2,3,4,5,6,7,8,9,10]
```
<a name="frequencies"></a>

## frequencies() ⇒ <code>function</code>
<p>Takes a sequence and counts how many times the elements appear in the sequence, returns a map.</p>

**Kind**: global function  
**Example**  
```js
frequencies()("aabcbcac"); => {'a': 3, 'c': 3, 'b': 2}frequencies()([1, 2, 2, 2]); => {1: 1, 2: 3}
```
<a name="interleaveNfn"></a>

## interleaveNfn(...args) ⇒ <code>Array.&lt;any&gt;</code>
<p>Iterative Implementation of Interleave Time Complexity O(n)
Interleaving is transposing two dimensional array
and then concating or flattening it.</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

**Example**  
```js
interleaveNfn([1,2,3],[4,5,6],[7,8,9]) //=> [1,4,7,2,5,8,3,6,9]// Implementation is as follows:function interleaveNfn(...args){ const arr = []; const length = args.length; const inerLength = args[0].length; for (let i = 0; i < length; i++)     for (let j = 0; j < inerLength; j++) {         arr.push(args[j][i]);     } return arr;}
```
<a name="interleaveFn"></a>

## interleaveFn(...args) ⇒ <code>Array.&lt;any&gt;</code>
<p>Functional Implementation of Interleave
Interleaving is transposing two dimensional array
and then concating or flattening it.</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

**Example**  
```js
interleaveFn([1,2,3],[4,5,6],[7,8,9]) //=> [1,4,7,2,5,8,3,6,9]// Implementation is as follows:export function interleaveFn(...args) {   // Simple Declarative way   // transpose([1,2,3],[4,5,6],[7,8,9]) => [[1,4,7],[2,5,8],[3,6,9]]   // [[1,4,7],[2,5,8],[3,6,9]].concatAll() => [1,4,7,2,5,8,3,6,9]   return transpose(...args).concatAll();}
```
<a name="zip"></a>

## zip(...args) ⇒ <code>Array.&lt;any&gt;</code>
<p>Transposes multi dimensional array</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...args | <code>\*</code> | 

**Example**  
```js
[[1,2,3], [4,5,6], [7,8,9]] => [[1,4,7],[2,5,8],[3,6,9]]
```
**Example**  
```js
[[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]// Implementation is as follows: function zip(...args) {   return args.reduce((p, c, i) => {     if (p.length <= 0)         // [1,2,3] => [[1],[2],[3]]         return c.reduce((cp, cc) => cp.pushItem([cc]), []);        else         // [[1],[2],[3]] => [[1,4,...], [2,5,...],[3,6,...]]         return p.map((x, i) => x.pushItem(c[i]));    }, []);}
```
<a name="transpose"></a>

## transpose(...args) ⇒ <code>Array.&lt;any&gt;</code>
<p>Transpose multi dimensional array</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>Array.&lt;any&gt;</code> | <p>multiple array arguments</p> |

**Example**  
```js
transpose([1,2,3], [4,5,6], [7,8,9]) => [[1,4,7],[2,5,8],[3,6,9]]// Similar to[[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]
```
<a name="zipWith"></a>

## zipWith(fn) ⇒ <code>function</code>
<p>Accumulating the multi dimensional array using a accumulator method</p>

**Kind**: global function  
**Summary**: <p>Usefull in creating Totals for Tables, or applying discounts on each or any column etc.</p>  
**Returns**: <code>function</code> - <p>Returns a method which accumulates its arguments</p>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>Accumulator function (x: any,y: any) =&gt; any<br> Takes two argument x: elem of previous array y: elem of next array</p> |

**Example**  
```js
var getTotals = zipWith(add)var subTotal = getTotals([1,2,3], [4,5,6], [7,8,9]);// [[1,2,3], [4,5,6], [7,8,9]] => [12,15,18]
```
<a name="zipMapWith"></a>

## zipMapWith(fn, initialValue) ⇒ <code>\*</code>
<p>Takes a map function to apply on the array taken by composed function.</p>

**Kind**: global function  
**Summary**: <p>Uses Partial Application to first create a mapper function and then calls a reusable apply function on an array.</p>  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | <p>(x:any,y:any) =&gt; any</p> |
| initialValue | <code>\*</code> |  |

**Example**  
```js
// Take an example of a cart like below:const cart=[  {"name":"Biscuits", "type":"regular", "category":"food", "price": 2.0}, {"name":"Monitor", "type":"prime", "category":"tech", "price": 119.99},  {"name":"Mouse", "type":"prime", "category":"tech", "price": 25.50},  {"name":"dress", "type":"regular", "category":"clothes", "price": 49.90},]const subTotal = zipMapWith(sumOfPrice,0); // where sumOfPrice works as a reducer function and then use subTotal as const subTotalCart = subTotal(cart); =>  197// The sumOfPrice will reduce the prices of all items of cart array.// Lets say we have another partial application for applyDiscount then:// Apply Discount of 10% on clothing catagoryconst discountedCart = applyDiscount(10, mul)("category","clothes");// Now reuse the subTotal method to calculate the discounted cart.const subTotalDiscounted = subTotal(discountedCart); => 192/////////////////////////////////////////////////////////////////////////////
```
<a name="zipDic"></a>

## zipDic(left, right) ⇒ <code>Object</code>
<p>Creates an object from two arrays</p>

**Kind**: global function  
**Summary**: <p>Create keys from first array and values from second. First array has to be array of strings, second array could be anything. However the final object will have only as many keys as the length of left array.</p>  

| Param | Type |
| --- | --- |
| left | <code>Array.&lt;string&gt;</code> | 
| right | <code>Array.&lt;any&gt;</code> | 

**Example**  
```js
// Create keys from first array and values from second.// First array has to be array of stringszipDic(['a','b','c'],[1,2,3]) => {a:1, b:2, c:3}
```
<a name="zipMap"></a>

## zipMap(left, right, mapFn) ⇒ <code>Array.&lt;(Object\|any)&gt;</code>
<p>Zips two arrays and maps out the output using the mapFn</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| left | <code>Array.&lt;any&gt;</code> |  |
| right | <code>Array.&lt;any&gt;</code> |  |
| mapFn | <code>function</code> | <p>(x: any, y:any) =&gt; Array<any></p> |

**Example**  
```js
// Zips two arrays to a single array.zip([1,2,3],[4,5,6], add) => [5,7,9]
```
**Example**  
```js
// Zips two arrays to array of objects depending on map function.zip([1,2,3],[4,5,6], (x,y,i) => ({a:x, b:y}); => [{a:1, b:4},{a:2, b:5},{a:3, b:6}]
```
<a name="update"></a>

## update(obj, prop, mapFn, val) ⇒ <code>T</code>
<p>Updates a particular propery of an object using the mapFn function</p>

**Kind**: global function  
**Returns**: <code>T</code> - <p>Same object with value of destination key updated using maping function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>T</code> | <p>Souce Object of Type T</p> |
| prop | <code>string</code> | <p>property name string</p> |
| mapFn | <code>function</code> | <p>Mapping Function</p> |
| val | <code>\*</code> | <p>Assigning value</p> |

**Example**  
```js
// Source Objectvar bob = {"name": "bob", "hp": 3};//add 2 to to hp property of bob// Applying mapping as addition function// const add = (x,y) => x+y;update(bob,'hp',add,2); // => {"name": "bob", "hp": 5}
```
<a name="update_in"></a>

## update\_in(obj, propMap, mapFn, val) ⇒ <code>T</code>
<p>Updates a particular property in a deep object tree using a map of keys and a map function.</p>

**Kind**: global function  
**Summary**: <p>Use it to update a particular deeply nested field of an object.
For example it can be used to apply tax on an accessory of an item in a cart.</p>  
**Returns**: <code>T</code> - <p>Same object with value of destination key updated using maping function.</p>  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>T</code> | <p>Souce Object of Type T</p> |
| propMap | <code>Array.&lt;string&gt;</code> | <p>Array of strings representing the property depth</p> |
| mapFn | <code>function</code> | <p>Mapping Function</p> |
| val | <code>\*</code> | <p>Assigning value</p> |

**Example**  
```js
// Source Objectvar a = {"a": 1, "b": {"c": 2, d: {e: 10}}};// Applying mapping as multiplication function// const mul = (x,y) => x*y;update_in(a, ["b", "d", "e"], mul, 0.9) // => {"a": 1, "b": {"c": 2, d: {e: 9}}}
```
## Heads Up
Its personal level excercise, I tried to use vanilla to show values on Browser in a very weired manner.
Just use it for inspiration, all methods and examples are not recommended for production.
