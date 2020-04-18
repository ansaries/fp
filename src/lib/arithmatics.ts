const isValidArgsForArithmatics = (fn: (x: any, y: any) => number) => {
  return (x: any, y: any) => {
    x = x || 0;
    y = y || 0;
    return fn(x, y);
  };
};

export const add = isValidArgsForArithmatics((x: number, y: number) => x + y);
export const sub = isValidArgsForArithmatics((x: number, y: number) => x - y);
export const mul = isValidArgsForArithmatics((x: number, y: number) => x * y);
export const div = isValidArgsForArithmatics((x: number, y: number) => x / y);

// const add = (x,y) => x+y;

export const negate = (p: { pushItem: (arg0: number) => void }, x: number) =>
  p.pushItem(x * -1);
export const double = (p: { pushItem: (arg0: number) => void }, x: number) =>
  p.pushItem(x * 2);

export const addArgs = (...args: any[]) => args.reduce(add);
export const subArgs = (...args: any[]) => args.reduce(sub);
export const negateArgs = (...args: any[]) => args.reduce(negate, []);
export const doubleArgs = (...args: any[]) => args.reduce(double, []);

const isValidNumber = (fn: {
  (x: any): boolean;
  (x: any): boolean;
  (x: any): boolean;
  (x: any): boolean;
  (arg0: number): void;
}) => (x: any) => (typeof x !== 'number' ? false : fn(x));
export const isPositive = isValidNumber((x: number) => x > 0);
export const isNegative = isValidNumber((x: number) => x < 0);
export const isEven = isValidNumber((x: number) => x % 2 === 0);
export const isOdd = isValidNumber((x: number) => x % 2 !== 0);

export const allOk = (...fns: any[]) => (x: any) =>
  fns.reduce((p, c) => (c(p) ? p : c(p)), x) === x;

export const partition = (
  n: number,
  step: number,
  arr: { length: number; slice: (arg0: number, arg1: any) => void }
) => {
  const res = [];
  for (let j = 0; j <= arr.length - n; j += step) {
    res.push(arr.slice(j, j + n));
  }
  return res;
};
