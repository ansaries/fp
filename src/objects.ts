

/**
 * Merges Multiple Objects into one final Object with applied maping method
 * e.g: merge_with(add, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 4}
 * e.g: merge_with(sub, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 0}
 * Similar to zipWith() for arrays
 * @export
 * @param {Function} fn
 * @returns
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