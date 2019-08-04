

/**
 * Compose pipes all methods from right to left
 * The return value of last(right) method will be injected 
 * into the arguments of next(left) method. 
 *
 * @export
 * @param {...Array<Function>} fns
 * @returns {*}
 */
export function compose(...fns: Array<Function>): any { 
     return (...args) => fns.reduceRight((p,c) => p.length ? c(...p) : c(p), args);
}

/**
 * Flow pipes all methods from left to right
 * The return value of first(left) method will be injected 
 * into the arguments of next(right) method.
 *
 * @export
 * @param {...Array<Function>} fns
 * @returns {(...args) => any}
 */
export function flow (...fns: Array<Function>): (...args) => any {
    return (...args) => fns.reduce((p,c) => p.length ? c(...p): c(p), args);
}
