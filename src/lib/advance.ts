import { add, sub } from './arithmatics';

/**
 * Merges Multiple Objects into one final Object with applied maping method
 * @example merge_with(add, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 4}
 * @example merge_with(sub, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 0}
 * // Similar to zipWith() for arrays
 * @export
 * @param {Function} fn
 * @returns { Object }
 */
export function merge_with(fn: (x, y) => any) {
  return (...args) => {
    return args.reduce((p, c) => {
      for (const key in c) {
        if (key) {
          p[key] = fn(p[key] || 0, c[key]);
        }
      }
      return p;
    });
  };
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
export function memoize(fn: (...args: any) => any): (...args: any) => void {
  const cash = {};
  return (...args) => {
    const cashKey = `key-${JSON.stringify(args)}`;
    if (cash[cashKey]) {
      return cash[cashKey];
    }
    const val = fn(...args);
    cash[cashKey] = val;
    return val;
  };
}

/**
 * Compose pipes all methods from right to left
 * The return value of last(right) method will be injected
 * into the arguments of next(left) method.
 * @example
 * // Suppose you want to get Grand Total of a cart after Tax and Discount.
 * var getGrandTotal = compose(Math.round, add);
 * // grandTotal = subTotalCart + Vat + Gst - Discount
 * var grandTotal = getGrandTotal(subTotalCart, VAT(subTotalCart), GST(subTotalCart),negative(Discount(subTotalCart)));
 * // Suppose for no EU customer the Vat does not apply
 * var nonUsGrandTotal = getGrandTotal(subTotalCart, GST(subTotalCart),negative(Discount(subTotalCart)))
 *
 * @export
 * @param {Array<(...args: any) => any>} fns one or more functions as arguments to apply composedly
 * @returns {(...args: any) => any} Returns a function which takes any argument
 */
export function compose(...fns: Array<(...args: any) => any>): any {
  return (...args) =>
    fns.reduceRight((p, c) => (p.length ? c(...p) : c(p)), args);
}

/**
 * Flow pipes all methods from left to right
 * The return value of first(left) method will be injected
 * into the arguments of next(right) method.
 * @example
 * // Suppose you want to get Grand Total of a cart after Tax and Discount.
 * var getGrandTotal = flow(add, Math.round);
 * // grandTotal = subTotalCart + Vat + Gst - Discount
 * var grandTotal = getGrandTotal(subTotalCart, VAT(subTotalCart), GST(subTotalCart),negative(Discount(subTotalCart)));
 * // Suppose for no EU customer the Vat does not apply
 * var nonUsGrandTotal = getGrandTotal(subTotalCart, GST(subTotalCart),negative(Discount(subTotalCart)))
 *
 * @export
 * @param {Array<Function>} fns one or more functions as arguments to apply composedly
 * @returns {Function} Returns a function which takes any argument
 */
export function flow(
  ...fns: Array<(...args: any) => any>
): (...args: any) => any {
  return (...args) => fns.reduce((p, c) => (p.length ? c(...p) : c(p)), args);
}
