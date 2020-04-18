/**
 * Converts arguments to array
 * @example
 * clist(1,2,3,4,5); => [1,2,3,4,5]
 *
 * @export
 * @param {...any} args Arguments of type any
 * @returns {Array<any>} Return an Array of type any
 */
export function clist(...args: any): Array<any> {
  return args;
}

/**
 * Take a slice of array starting at 0 to x from an array ar
 *
 * @export
 * @template T
 * @param {number} x
 * @param {Array<any>} ar
 * @returns {Array<T>}
 */
export function take<T>(x: number, ar: Array<any>): Array<T> {
  return ar.slice(0, x);
}

/**
 * Similar to range method of Python, creates an array of number from 1 to N
 * @example
 * range(10) => [1,2,3,4,5,6,7,8,9,10]
 * @export
 * @param {number} N
 * @returns {Array<number>}
 */
export function range(N: number): Array<number> {
  return Array.from({ length: N }, (v, k) => k + 1);
}

const validateArrayandApply = fn => x =>
  typeof x == 'string' ? fn(Array.from(x)) : !!x.length ? fn(x) : fn([x]);

/**
 *  Takes a sequence and counts how many times the elements appear in the sequence, returns a map.
 * @example
 * frequencies()("aabcbcac"); => {'a': 3, 'c': 3, 'b': 2}
 * frequencies()([1, 2, 2, 2]); => {1: 1, 2: 3}
 *
 * @export
 * @returns {Function}
 */
export function frequencies(): Function {
  return validateArrayandApply(x =>
    x.reduce((p, v) => {
      p[v] = p[v] || 0;
      p[v] += 1;
      return p;
    }, {})
  );
}

/**
 * Iterative Implementation of Interleave Time Complexity O(n)
 * Interleaving is transposing two dimensional array
 * and then concating or flattening it.
 * @example
 * interleaveNfn([1,2,3],[4,5,6],[7,8,9]) //=> [1,4,7,2,5,8,3,6,9]
 * // Implementation is as follows:
 * function interleaveNfn(...args){
 *  const arr = [];
 *  const length = args.length;
 *  const inerLength = args[0].length;
 *  for (let i = 0; i < length; i++)
 *      for (let j = 0; j < inerLength; j++) {
 *          arr.push(args[j][i]);
 *      }
 *  return arr;
 * }
 * @export
 * @param {*} args
 * @returns {Array<any>}
 */
export function interleaveNfn(...args) {
  const arr = [];
  const length = args.length;
  const inerLength = args[0].length;
  for (let i = 0; i < length; i++)
    for (let j = 0; j < inerLength; j++) {
      arr.push(args[j][i]);
    }
  return arr;
}

/**
 * Functional Implementation of Interleave
 * Interleaving is transposing two dimensional array
 * and then concating or flattening it.
 * @example
 * interleaveFn([1,2,3],[4,5,6],[7,8,9]) //=> [1,4,7,2,5,8,3,6,9]
 * // Implementation is as follows:
 * export function interleaveFn(...args) {
 *    // Simple Declarative way
 *    // transpose([1,2,3],[4,5,6],[7,8,9]) => [[1,4,7],[2,5,8],[3,6,9]]
 *    // [[1,4,7],[2,5,8],[3,6,9]].concatAll() => [1,4,7,2,5,8,3,6,9]
 *    return transpose(...args).concatAll();
 * }
 * @export
 * @param {*} args
 * @returns {Array<any>}
 */
export function interleaveFn(...args) {
  return transpose(...args).concatAll();
}

/**
 * Transposes multi dimensional array
 * @example [[1,2,3], [4,5,6], [7,8,9]] => [[1,4,7],[2,5,8],[3,6,9]]
 * @example [[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]
 * // Implementation is as follows:
 * function zip(...args) {
 *    return args.reduce((p, c, i) => {
 *      if (p.length <= 0)
 *          // [1,2,3] => [[1],[2],[3]]
 *          return c.reduce((cp, cc) => cp.pushItem([cc]), []);
 *
 *      else
 *          // [[1],[2],[3]] => [[1,4,...], [2,5,...],[3,6,...]]
 *          return p.map((x, i) => x.pushItem(c[i]));
 *     }, []);
 * }
 * @export
 * @param {*} args
 * @returns {Array<any>}
 */
export function zip(...args) {
  // Non Pure Functional Implementation
  // const result = [];
  // console.log(args);
  // args.forEach((a, i) => {
  //     console.log(a);
  //     if(i==0) {
  //         a.forEach(x => result.push([x]));
  //     } else {
  //         for(let j=0; j< result.length; j++) {
  //             result[j].push(a[j]);
  //         }
  //     }
  // });
  // return result;

  // Pure Functional Implementation
  // [[1,2,3], [4,5,6], [7,8,9]] => [[1,4,7],[2,5,8],[3,6,9]]
  return args.reduce((p, c, i) => {
    if (p.length <= 0)
      // [1,2,3] => [[1],[2],[3]]
      return c.reduce((cp, cc) => cp.pushItem([cc]), []);
    // [[1],[2],[3]] => [[1,4,...], [2,5,...],[3,6,...]]
    else return p.map((x, i) => x.pushItem(c[i]));
  }, []);
}

/**
 * Transpose multi dimensional array
 * @example transpose([1,2,3], [4,5,6], [7,8,9]) => [[1,4,7],[2,5,8],[3,6,9]]
 * // Similar to
 * [[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]
 *
 * @export
 * @param {Array<any>} args multiple array arguments
 * @returns {Array<any>}
 */
export function transpose(...args) {
  return zip(...args);
}

/**
 * Accumulating the multi dimensional array using a accumulator method
 * @summary Usefull in creating Totals for Tables, or applying discounts on each or any column etc.
 * @example
 * var getTotals = zipWith(add)
 * var subTotal = getTotals([1,2,3], [4,5,6], [7,8,9]);
 * * [[1,2,3], [4,5,6], [7,8,9]] => [12,15,18]
 *
 * @export
 * @param {Function} fn Accumulator function (x: any,y: any) => any
 * Takes two argument x: elem of previous array y: elem of next array
 * @returns {function} Returns a method which accumulates its arguments
 */
export function zipWith(fn: (x: any, y: any) => any) {
  return (...args) =>
    args.reduce(
      (p, c) => (p.length <= 0 ? c : p.map((x, i) => fn(x, c[i]))),
      []
    );
}

/**
 *
 * Takes a map function to apply on the array taken by composed function.
 * @summary Uses Partial Application to first create a mapper function and then calls a reusable apply function on an array.
 * @example
 * // Take an example of a cart like below:
 * const cart=[
 *   {"name":"Biscuits", "type":"regular", "category":"food", "price": 2.0},
 *  {"name":"Monitor", "type":"prime", "category":"tech", "price": 119.99},
 *   {"name":"Mouse", "type":"prime", "category":"tech", "price": 25.50},
 *   {"name":"dress", "type":"regular", "category":"clothes", "price": 49.90},
 * ]
 * const subTotal = zipMapWith(sumOfPrice,0);
 * // where sumOfPrice works as a reducer function and then use subTotal as
 * const subTotalCart = subTotal(cart); =>  197
 * // The sumOfPrice will reduce the prices of all items of cart array.
 *
 * // Lets say we have another partial application for applyDiscount then:
 * // Apply Discount of 10% on clothing catagory
 * const discountedCart = applyDiscount(10, mul)("category","clothes");
 * // Now reuse the subTotal method to calculate the discounted cart.
 * const subTotalDiscounted = subTotal(discountedCart); => 192
 * /////////////////////////////////////////////////////////////////////////////
 * @export
 * @param {Function} fn (x:any,y:any) => any
 * @param {*} initialValue
 * @returns {*}
 */
export function zipMapWith(fn: (x: any, y: any) => any, initialValue): any {
  return (arr: Array<Object>): any =>
    arr.reduce((p, c) => fn(p, c), initialValue);
}

/**
 * Creates an object from two arrays
 * @example
 * // Create keys from first array and values from second.
 * // First array has to be array of strings
 * zipDic(['a','b','c'],[1,2,3]) => {a:1, b:2, c:3}
 * @summary Create keys from first array and values from second. First array has to be array of strings, second array could be anything. However the final object will have only as many keys as the length of left array.
 * @export
 * @param {Array<string>} left
 * @param {Array<any>} right
 * @returns {Object}
 */
export function zipDic(left: Array<string>, right: Array<any>): Object {
  // Pure Functional
  return left.reduce((p, c, i) => {
    p[c] = right[i];
    return p;
  }, {});
  // Non-Pure Implementation
  // const result = {};
  // left.forEach((x, i) => result[x] = right[i]);
  // return result;
}

/**
 * Zips two arrays and maps out the output using the mapFn
 * @example
 * // Zips two arrays to a single array.
 * zip([1,2,3],[4,5,6], add) => [5,7,9]
 * @example
 * // Zips two arrays to array of objects depending on map function.
 * zip([1,2,3],[4,5,6], (x,y,i) => ({a:x, b:y}); => [{a:1, b:4},{a:2, b:5},{a:3, b:6}]
 * @export
 * @param {Array<any>} left
 * @param {Array<any>} right
 * @param {Function} mapFn (x: any, y:any) => Array<any>
 * @returns {Array<Object | any>}
 */
export function zipMap(
  left: Array<any>,
  right: Array<any>,
  mapFn: (x: any, y: any, index: number) => Array<any>
) {
  var counter,
    results = [];

  for (counter = 0; counter < Math.min(left.length, right.length); counter++) {
    results.push(mapFn(left[counter], right[counter], counter));
  }

  return results;
}

// export const CollectionApi = {
//     take,range,transpose,interleaveFn,interleaveNfn,zip,zipWith,zipMap,zipMapWith,zipDic
// }
