import { zip, zipWith } from "./collections";




/**
 * Pushes an Item in Array and returns the Array with the new Item
 *
 * @param {*} args
 * @returns {Array<any>}
 */
function pushItem(...args: any): Array<any> {
    this.push(...args);
    return this;
}

/**
 * Concat all arrays
 *
 * @returns {Array<T>}
 */
function concatAll () {
    return this.reduce((p, v) => {
        return !!v.length ? p.pushItem(...v) : p.pushItem(v);
    }, [])
};


/**
 * Concat all arrays while applying a Map function on each element of each array
 * @example
 * [[1,2,3],[4,5],[6]].concatMap(add); // => [1,3,5,7,9,11]
 * @template T
 * @param {Function} fn
 * @returns {Array<T>} 
 */ 
function concatMap (fn: Function) {
    return this.concatAll().map(fn);
}


function ziper () {
    return zip(...this);
}

function toDic () {
    const r = {};
    this.forEach((x, i) => r[i] = x);
    return r;
}

function zipWth (fn:(x: any,y: any) => any) {
    return zipWith(fn)(...this);
}


/**
 * Revese the array
 *
 * @template T
 * @returns {Array<T>}
 */
function flip () {
    return this.reduceRight((p, c) => p.pushItem(c), []);
}


/**
 * Flattens a multi-dimensional array of any depth
 * @example 
 * [[1],[[[2]],[[[[[3]]]]]].flatten(); // => [1,2,3,4]
 * @template T
 * @param {*} initial
 * @returns {Array<T>}
 */
function flatten (prev: any = []) {
    return this.reduce((p, c) => (c.length > 0) ? c.flatten(p) : p.pushItem(c), prev);
}

/**
 * Insert an item on a specified location and shift all of the rest to right.
 * @example
 * [1,3,4,5,6].insert(2,1) => [1,2,3,4,5,6]
 *
 * @template T
 * @param {T} item
 * @param {number} i
 * @returns {Array<T>}
 */
function insert (item: any, i: number = 0) {
    return this.slice(0, i).pushItem(item).concat(this.slice(i));
}

/**
 * Returns items that does not full fill the filterFn
 * 
 * @template T
 * @param {Function} mapFn (x: any, i: number) => Array<T>
 */ 
function reject(mapFn: (x: any,i?: number) => boolean) {
    return this.reduce((p,c,i) => {
        if(!mapFn(c, i)) return p.pushItem(c);
        return p;
    }, []);
    
    // return this.filter(x => !mapFn(x));
}

export const Arrays = {
    pushItem,
    concatAll,
    concatMap,
    ziper,
    toDic,
    zipWth,
    flip,
    flatten,
    insert,
    reject,
}