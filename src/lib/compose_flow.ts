

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
 * @param {Array<Function>} fns one or more functions as arguments to apply composedly
 * @returns {Function} Returns a function which takes any argument
 */
export function compose(...fns: Array<Function>): any { 
     return (...args) => fns.reduceRight((p,c) => p.length ? c(...p) : c(p), args);
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
export function flow (...fns: Array<Function>): (...args) => any {
    return (...args) => fns.reduce((p,c) => p.length ? c(...p): c(p), args);
}
