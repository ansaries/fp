import { add, sub } from "./arithmatics";


/**
 * Merges Multiple Objects into one final Object with applied maping method
 * @example merge_with(add, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 4}
 * @example merge_with(sub, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 0}
 * // Similar to zipWith() for arrays
 * @export
 * @param {Function} fn
 * @returns { Object }
 */
export function merge_with(fn: Function) {
    return (...args) => {
        return args.reduce((p, c) => {
            for (let key in c) {
                p[key] = fn(p[key] || 0, c[key]);
            }
            return p;
        });
    }
}





/**
 * Memoize a funtion based on its arguments
 * @summary
 * Memoization requires that the passed function should be a pure-function
 * @example
 * const summemo = memoize(add);
 * const submemo = memoize(sub);
 * summemo(4,6); // Computes 4 + 6 => 10
 * submemo(4,6); // Computes 4 - 6 => -2
 * summemo(4,6); // Does not compute, rather return from cash => 10
 * submemo(4,6); // Does not compute, rather return from cash => -2
 * @export
 * @param {Function} fn Pure Function
 * @returns {Function} return a reusable function
 */
export function memoize(fn: Function):Function {
    const cash = {};
    return (...args) => {
        const cashKey = `key-${JSON.stringify(args)}`;
        if(cash[cashKey]) {
            return cash[cashKey];
        }
        const val = fn(...args);
        cash[cashKey] = val;
        return val;
    };
}




