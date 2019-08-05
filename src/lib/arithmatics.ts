
const isValidArgsForArithmatics = fn => {
    return (x,y) => {
        x = x || 0;
        y = y || 0;
        return fn(x,y);
    } 
}

export const add = isValidArgsForArithmatics((x,y) => x+y);
export const sub = isValidArgsForArithmatics((x,y) => x-y);
export const mul = isValidArgsForArithmatics((x,y) => x*y);
export const div = isValidArgsForArithmatics((x,y) => x/y);


// const add = (x,y) => x+y;

export const negate = (p,x) => p.pushItem(x * -1);
export const double = (p,x) => p.pushItem(x * 2);

export const addArgs = (...args) =>  args.reduce(add); 
export const subArgs = (...args) =>  args.reduce(sub); 
export const negateArgs = (...args) =>  args.reduce(negate, []); 
export const doubleArgs = (...args) =>  args.reduce(double, []); 

const isValidNumber = fn => x =>  typeof x != 'number' ? false : fn(x); 
export const isPositive = isValidNumber(x => x > 0);
export const isNegative = isValidNumber(x => x < 0);
export const isEven = isValidNumber(x => x % 2 == 0);
export const isOdd = isValidNumber(x => x % 2 != 0);

export const allOk = (...fns) => (x) => fns.reduce((p,c) => c(p) ? p : c(p), x) == x;

export const partition = (n, step, arr) => {
    const res = [];
    for(let j=0;j<=arr.length-n;j+=step) {        
        res.push(arr.slice(j,j+n));
    }
    return res;
}



