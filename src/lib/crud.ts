import { add, mul, div, sub } from './arithmatics';

/**
 * Updates a particular propery of an object using the mapFn function
 * @example
 * // Source Object
 * var bob = {"name": "bob", "hp": 3};
 * //add 2 to to hp property of bob
 * // Applying mapping as addition function
 * // const add = (x,y) => x+y;
 * update(bob,'hp',add,2); // => {"name": "bob", "hp": 5}
 *
 *
 * @export
 * @template T Can be applied to Object of type any
 * @param {T} obj Souce Object of Type T
 * @param {string} prop property name string
 * @param {(...args: any) => any} mapFn Mapping Function
 * @param {*} val Assigning value
 * @returns {T} Same object with value of destination key updated using maping function.
 */
export function update<T>(
  obj: T,
  prop: string,
  mapFn: (...args: any) => any,
  val: any
): T {
  return Object.assign({}, obj, { [prop]: mapFn(obj[prop], val) });
}

/**
 * Updates a particular property in a deep object tree using a map of keys and a map function.
 * @summary
 * Use it to update a particular deeply nested field of an object.
 * For example it can be used to apply tax on an accessory of an item in a cart.
 * @example
 * // Source Object
 * var a = {"a": 1, "b": {"c": 2, d: {e: 10}}};
 * // Applying mapping as multiplication function
 * // const mul = (x,y) => x*y;
 * update_in(a, ["b", "d", "e"], mul, 0.9) // => {"a": 1, "b": {"c": 2, d: {e: 9}}}
 *
 * @export
 * @template T Can be applied to Object of type any
 * @param {T} obj Souce Object of Type T
 * @param {Array<string>} propMap Array of strings representing the property depth
 * @param {(...args: any) => any} mapFn Mapping Function
 * @param {*} val Assigning value
 * @returns {T} Same object with value of destination key updated using maping function.
 */
export function update_in<T>(
  obj: T,
  propMap: Array<string>,
  mapFn: (...args: any) => any,
  val: any
): T {
  // obj = Object.assign({}, obj);
  // If you create a copy of original like above
  // then dont forget to assign the return value to obj like obj[map[0]] = update_in
  if (propMap.length <= 1) {
    // Apply fn to previous value.
    // Validate the arguments of fn in the fn itself.
    obj[propMap[0]] = mapFn(obj[propMap[0]], val);
    return obj;
  }
  // Just in case if there is no property then create it.
  // and call method recursively to reach to last property to apply fn.
  obj[propMap[0]] = Object.assign({}, obj[propMap[0]] || {});
  // Copy return value only if obj is a clone of orignal and not original
  obj[propMap[0]] = update_in(
    obj[propMap[0]],
    propMap.slice(1, propMap.length),
    mapFn,
    val
  );
  return obj;
}
