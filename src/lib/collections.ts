

/**
 * Take a slice of array starting at 0 to x from an array ar
 *
 * @export
 * @param {number} x
 * @param {Array<any>} ar
 * @returns
 */
export function take(x: number, ar: Array<any>) { return ar.slice(0, x); }

/**
 * Similar to range method of Python, creates an array of number from 1 to N
 *
 * @export
 * @param {number} N
 * @returns
 */
export function range(N: number) { return Array.from({ length: N }, (v, k) => k + 1); }

/**
 * Transpose multi dimensional array
 * e.g: [[1,2,3], [4,5,6], [7,8,9]] => [[1,4,7],[2,5,8],[3,6,9]]
 * or e.g: [[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]
 *
 * @export
 * @param {Array<any>} args multiple array arguments
 * @returns
 */
export function transpose (...args) { 
    return zip(...args);
}

/**
 * Iterative Implementation of Interleave Time Complexity O(n)
 * Interleaving is transposing two dimensional array
 * and then concating or flattening it.
 *
 * @export
 * @param {*} args
 * @returns
 */
export const interleave = (...args) => {
    const arr = [];
    const length = args.length;
    const inerLength = args[0].length;
    for (let i = 0; i < length; i++)
        for (let j = 0; j < inerLength; j++) {
            arr.push(args[j][i]);
        }
    return arr;
};

/**
 * Functional Implementation of Interleave
 * Interleaving is transposing two dimensional array
 * and then concating or flattening it.
 *
 * @export
 * @param {*} args
 * @returns
 */
export function interleave1(...args) {
    return transpose(...args).concatAll();
}

/**
 * Transpose multi dimensional array
 * e.g: [[1,2,3], [4,5,6], [7,8,9]] => [[1,4,7],[2,5,8],[3,6,9]]
 * or e.g: [[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]
 *
 * @export
 * @param {*} args
 * @returns
 */
export function zip (...args) {
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

        else
            // [[1],[2],[3]] => [[1,4,...], [2,5,...],[3,6,...]]
            return p.map((x, i) => x.pushItem(c[i]));
    }, []);
}

/**
 * Accumulating the multi dimensional array using a accumulator method
 * e.g: [[1,2,3], [4,5,6], [7,8,9]] => [12,15,18]
 *
 * @export
 * @param {(x: any,y: any) => any} fn  Takes two argument x: elem of previous array y: elem of next array
 * @returns
 */
export function zipWith (fn:(x: any,y: any) => any) {
    return (...args) => args.reduce((p, c) => (p.length <= 0) ? c : p.map((x, i) => fn(x, c[i])), []);
}


/**
 * Creates an object from two arrays
 * e.g: zipDic([a,b,c],[1,2,3]) => {a:1, b:2, c:3}
 *
 * @export
 * @param {Array<string>} left
 * @param {Array<any>} right
 * @returns
 */
export function zipDic (left: Array<string>, right: Array<any>) {
    // Pure Functional
    return left.reduce((p,c,i) => {
        p[c]=right[i];
        return p;
    }, {})
    // Non-Pure Implementation
    // const result = {};
    // left.forEach((x, i) => result[x] = right[i]);
    // return result;
}


/**
 * Zips two arrays and maps out the output using the mapFn
 * e.g: zip([1,2,3],[4,5,6], add) => [5,7,9]
 * or e.g: zip([1,2,3],[4,5,6], (x,y,i) => ({a:x, b:y}) => [{a:1, b:4},{a:2, b:5},{a:3, b:6}]
 * @export
 * @param {Array<any>} left
 * @param {Array<any>} right
 * @param {(x: any, y:any) => Array<any>} mapFn
 * @returns
 */
export function zipMap(left: Array<any>, right: Array<any>, mapFn: (x: any, y:any, index: number) => Array<any>) {
    var counter,
		results = [];

	for(counter = 0; counter < Math.min(left.length, right.length); counter++) {
		results.push(mapFn(left[counter],right[counter],counter));
	}

	return results;
}