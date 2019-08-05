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
<a name="compose"></a>

## compose(...fns) ⇒ <code>\*</code>
<p>Compose pipes all methods from right to left
The return value of last(right) method will be injected
into the arguments of next(left) method.</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...fns | <code>Array.&lt;function()&gt;</code> | 

<a name="flow"></a>

## flow(...fns) ⇒ <code>function</code>
<p>Flow pipes all methods from left to right
The return value of first(left) method will be injected
into the arguments of next(right) method.</p>

**Kind**: global function  

| Param | Type |
| --- | --- |
| ...fns | <code>Array.&lt;function()&gt;</code> | 

<a name="merge_with"></a>

## merge\_with(fn) ⇒ <code>Object</code>
<p>Merges Multiple Objects into one final Object with applied maping method</p>

**Kind**: global function  
**Examplemerge_with(add,**: <code>&quot;a&quot;: 1, &quot;b&quot;: 2</code>, {"b": 2}) => {"a": 1, "b": 4}  
**Examplemerge_with(sub,**: <code>&quot;a&quot;: 1, &quot;b&quot;: 2</code>, {"b": 2}) => {"a": 1, "b": 0}Similar to zipWith() for arrays  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

## Heads Up
Its personal level excercise, I tried to use vanilla to show values on Browser in a very weired manner.
Just use it for inspiration, all methods and examples are not recommended for production.
