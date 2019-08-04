
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

const validateArrayandApply = fn => x => typeof x == 'string' ? fn(Array.from(x)) : !!x.length ? fn(x) : fn([x]);
export const frequencies = validateArrayandApply(x => x.reduce((p,v) => {
    p[v] = p[v] || 0;
    p[v] += 1;
    return p;
}, {}));

export const partition = (n, step, arr) => {
    const res = [];
    for(let j=0;j<=arr.length-n;j+=step) {        
        res.push(arr.slice(j,j+n));
    }
    return res;
}

const memoize = (fn) => {
    const cash = {};
    return (...args) => {
        const cashKey = `key-${JSON.stringify(args)}`;
        if(cash[cashKey]) {
            console.log(`From Cash -- ${cash[cashKey]}`);
            return cash[cashKey];
        }
        const val = fn(...args);
        cash[cashKey] = val;
        console.log(`Cash Key Formed with -- ${val}`);
        return val;
    };
}

const summemo = memoize(add);
const submemo = memoize(sub);

// summemo(4,6);
// submemo(4,6);
// summemo(4,6);
// submemo(4,6);
