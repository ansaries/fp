// Extensions to Native Array Methods
interface Array<T> {
    /**
     * Pushes an Item in Array and returns the Array with the new Item
     *
     * @param {any} args
     * @returns {Array<T>}
     * @memberof Array
     */
    pushItem(...args: any): Array<T>;

    /**
     * Concat all arrays
     *
     * @returns {Array<T>}
     * @memberof Array
     */
    concatAll(): Array<T>;

    /**
     * Concat all arrays while applying a Map function on each element of each array
     * @example
     * [[1,2,3],[4,5],[6]].concatMap(add); // => [1,3,5,7,9,11]
     * @template T
     * @param {Function} fn
     * @returns {Array<T>}
     * @memberof Array
     */
    concatMap<T>(fn: Function): Array<T>;

    /**
     * Transpose multi dimensional array
     * @example 
     * [[1,2,3], [4,5,6], [7,8,9]].zip(); // => [[1,4,7],[2,5,8],[3,6,9]]
     * @example 
     * [[1, 2, 3], [4, 5, 6]].zip(); // => [[1, 4], [2, 5], [3, 6]]
     * @template T
     * @returns {Array<T>}
     * @memberof Array
     */
    zip<T>():Array<T>;

    /**
     * Converts an array to a Dictionay with index as keys.
     * 
     *
     * @template T
     * @returns {Object}
     * @memberof Array
     */
    toDic<T>():Object;

    /**
     * Converts a multi-dimensional array into single mapped array
     * @example [[1,2,3], [4,5,6]].zipWith(add);
     * // => [[1,2,3], [4,5,6]] => [[5,7,9]] 
     * @template T
     * @param {(x: any,y: any) => any} fn Takes two argument x: elem of previous array y: elem of next array
     * @returns {Array<T>}
     * @memberof Array
     */
    zipWith<T>(fn: (x: any,y: any) => any): Array<T>;

    /**
     * Revese the array
     *
     * @template T
     * @returns {Array<T>}
     * @memberof Array
     */
    flip<T>(): Array<T>;

    /**
     * Flattens a multi-dimensional array of any depth
     * @example 
     * [[1],[[[2]],[[[[[3]]]]]].flatten(); // => [1,2,3,4]
     * @template T
     * @param {*} initial
     * @returns {Array<T>}
     * @memberof Array
     */
    flatten<T>(initial: any): Array<T>;

    /**
     * Insert an item on a specified location and shift all of the rest to right.
     * @example
     * [1,3,4,5,6].insert(2,1) => [1,2,3,4,5,6]
     *
     * @template T
     * @param {T} item
     * @param {number} i
     * @returns {Array<T>}
     * @memberof Array
     */
    insert<T>(item : T, i: number): Array<T>;


    /**
     * Returns items that does not full fill the filterFn
     * 
     * @template T
     * @param {(x: any, i: number) => Array<T>} mapFn
     * @memberof Array
     */
    reject<T>(filterFn: (x: any, i: number) => boolean);
}