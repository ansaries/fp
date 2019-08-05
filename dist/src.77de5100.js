// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/collections.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Take a slice of array starting at 0 to x from an array ar
 *
 * @export
 * @param {number} x
 * @param {Array<any>} ar
 * @returns
 */

function take(x, ar) {
  return ar.slice(0, x);
}

exports.take = take;
/**
 * Similar to range method of Python, creates an array of number from 1 to N
 *
 * @export
 * @param {number} N
 * @returns
 */

function range(N) {
  return Array.from({
    length: N
  }, function (v, k) {
    return k + 1;
  });
}

exports.range = range;
/**
 * Transpose multi dimensional array
 * e.g: [[1,2,3], [4,5,6], [7,8,9]] => [[1,4,7],[2,5,8],[3,6,9]]
 * or e.g: [[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]
 *
 * @export
 * @param {Array<any>} args multiple array arguments
 * @returns
 */

function transpose() {
  return zip.apply(void 0, arguments);
}

exports.transpose = transpose;
/**
 * Iterative Implementation of Interleave Time Complexity O(n)
 * Interleaving is transposing two dimensional array
 * and then concating or flattening it.
 *
 * @export
 * @param {*} args
 * @returns
 */

exports.interleave = function () {
  var arr = [];

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var length = args.length;
  var inerLength = args[0].length;

  for (var i = 0; i < length; i++) {
    for (var j = 0; j < inerLength; j++) {
      arr.push(args[j][i]);
    }
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


function interleave1() {
  return transpose.apply(void 0, arguments).concatAll();
}

exports.interleave1 = interleave1;
/**
 * Transpose multi dimensional array
 * e.g: [[1,2,3], [4,5,6], [7,8,9]] => [[1,4,7],[2,5,8],[3,6,9]]
 * or e.g: [[1, 2, 3], [4, 5, 6]].zip() => [[1, 4], [2, 5], [3, 6]]
 *
 * @export
 * @param {*} args
 * @returns
 */

function zip() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

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
  return args.reduce(function (p, c, i) {
    if (p.length <= 0) // [1,2,3] => [[1],[2],[3]]
      return c.reduce(function (cp, cc) {
        return cp.pushItem([cc]);
      }, []);else // [[1],[2],[3]] => [[1,4,...], [2,5,...],[3,6,...]]
      return p.map(function (x, i) {
        return x.pushItem(c[i]);
      });
  }, []);
}

exports.zip = zip;
/**
 * Accumulating the multi dimensional array using a accumulator method
 * e.g: [[1,2,3], [4,5,6], [7,8,9]] => [12,15,18]
 *
 * @export
 * @param {(x: any,y: any) => any} fn  Takes two argument x: elem of previous array y: elem of next array
 * @returns
 */

function zipWith(fn) {
  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return args.reduce(function (p, c) {
      return p.length <= 0 ? c : p.map(function (x, i) {
        return fn(x, c[i]);
      });
    }, []);
  };
}

exports.zipWith = zipWith;

function zipMapWith(arr) {
  return function (fn, initialValue) {
    return arr.reduce(function (p, c) {
      return fn(p, c);
    }, initialValue);
  };
}

exports.zipMapWith = zipMapWith;
/**
 * Creates an object from two arrays
 * e.g: zipDic([a,b,c],[1,2,3]) => {a:1, b:2, c:3}
 *
 * @export
 * @param {Array<string>} left
 * @param {Array<any>} right
 * @returns
 */

function zipDic(left, right) {
  // Pure Functional
  return left.reduce(function (p, c, i) {
    p[c] = right[i];
    return p;
  }, {}); // Non-Pure Implementation
  // const result = {};
  // left.forEach((x, i) => result[x] = right[i]);
  // return result;
}

exports.zipDic = zipDic;
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

function zipMap(left, right, mapFn) {
  var counter,
      results = [];

  for (counter = 0; counter < Math.min(left.length, right.length); counter++) {
    results.push(mapFn(left[counter], right[counter], counter));
  }

  return results;
}

exports.zipMap = zipMap;
},{}],"lib/arithmatics.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var isValidArgsForArithmatics = function isValidArgsForArithmatics(fn) {
  return function (x, y) {
    x = x || 0;
    y = y || 0;
    return fn(x, y);
  };
};

exports.add = isValidArgsForArithmatics(function (x, y) {
  return x + y;
});
exports.sub = isValidArgsForArithmatics(function (x, y) {
  return x - y;
});
exports.mul = isValidArgsForArithmatics(function (x, y) {
  return x * y;
});
exports.div = isValidArgsForArithmatics(function (x, y) {
  return x / y;
}); // const add = (x,y) => x+y;

exports.negate = function (p, x) {
  return p.pushItem(x * -1);
};

exports.double = function (p, x) {
  return p.pushItem(x * 2);
};

exports.addArgs = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.reduce(exports.add);
};

exports.subArgs = function () {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return args.reduce(exports.sub);
};

exports.negateArgs = function () {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return args.reduce(exports.negate, []);
};

exports.doubleArgs = function () {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return args.reduce(exports.double, []);
};

var isValidNumber = function isValidNumber(fn) {
  return function (x) {
    return typeof x != 'number' ? false : fn(x);
  };
};

exports.isPositive = isValidNumber(function (x) {
  return x > 0;
});
exports.isNegative = isValidNumber(function (x) {
  return x < 0;
});
exports.isEven = isValidNumber(function (x) {
  return x % 2 == 0;
});
exports.isOdd = isValidNumber(function (x) {
  return x % 2 != 0;
});

exports.allOk = function () {
  for (var _len5 = arguments.length, fns = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    fns[_key5] = arguments[_key5];
  }

  return function (x) {
    return fns.reduce(function (p, c) {
      return c(p) ? p : c(p);
    }, x) == x;
  };
};

var validateArrayandApply = function validateArrayandApply(fn) {
  return function (x) {
    return typeof x == 'string' ? fn(Array.from(x)) : !!x.length ? fn(x) : fn([x]);
  };
};

exports.frequencies = validateArrayandApply(function (x) {
  return x.reduce(function (p, v) {
    p[v] = p[v] || 0;
    p[v] += 1;
    return p;
  }, {});
});

exports.partition = function (n, step, arr) {
  var res = [];

  for (var j = 0; j <= arr.length - n; j += step) {
    res.push(arr.slice(j, j + n));
  }

  return res;
};

var memoize = function memoize(fn) {
  var cash = {};
  return function () {
    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var cashKey = "key-".concat(JSON.stringify(args));

    if (cash[cashKey]) {
      console.log("From Cash -- ".concat(cash[cashKey]));
      return cash[cashKey];
    }

    var val = fn.apply(void 0, args);
    cash[cashKey] = val;
    console.log("Cash Key Formed with -- ".concat(val));
    return val;
  };
};

var summemo = memoize(exports.add);
var submemo = memoize(exports.sub); // summemo(4,6);
// submemo(4,6);
// summemo(4,6);
// submemo(4,6);
},{}],"lib/clist.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function clist() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args;
}

exports.clist = clist;
},{}],"lib/compose_flow.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Compose pipes all methods from right to left
 * The return value of last(right) method will be injected
 * into the arguments of next(left) method.
 *
 * @export
 * @param {...Array<Function>} fns
 * @returns {*}
 */

function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.reduceRight(function (p, c) {
      return p.length ? c.apply(void 0, _toConsumableArray(p)) : c(p);
    }, args);
  };
}

exports.compose = compose;
/**
 * Flow pipes all methods from left to right
 * The return value of first(left) method will be injected
 * into the arguments of next(right) method.
 *
 * @export
 * @param {...Array<Function>} fns
 * @returns {(...args) => any}
 */

function flow() {
  for (var _len3 = arguments.length, fns = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    fns[_key3] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return fns.reduce(function (p, c) {
      return p.length ? c.apply(void 0, _toConsumableArray(p)) : c(p);
    }, args);
  };
}

exports.flow = flow;
},{}],"lib/crud.ts":[function(require,module,exports) {
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.update = function (obj, prop, fn, val) {
  return Object.assign({}, obj, _defineProperty({}, prop, fn(obj[prop], val)));
}; // O(n+1) where n is the length of map


exports.update_in = function (obj, map, fn, val) {
  // obj = Object.assign({}, obj);
  // If you create a copy of original like above 
  // then dont forget to assign the return value to obj like obj[map[0]] = update_in
  if (map.length <= 1) {
    // Apply fn to previous value.
    // Validate the arguments of fn in the fn itself.
    obj[map[0]] = fn(obj[map[0]], val);
    return obj;
  } // Just in case if there is no property then create it.
  // and call method recursively to reach to last property to apply fn.


  obj[map[0]] = Object.assign({}, obj[map[0]] || {}); // Copy return value only if obj is a clone of orignal and not original

  obj[map[0]] = exports.update_in(obj[map[0]], map.slice(1, map.length), fn, val);
  return obj;
}; // bob = {"name": "bob", "hp": 3}
// add 2 to to hp property of bob
// console.log(update(bob, "hp", add, 2));
},{}],"lib/objects.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Merges Multiple Objects into one final Object with applied maping method
 * e.g: merge_with(add, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 4}
 * e.g: merge_with(sub, {"a": 1, "b": 2}, {"b": 2}) => {"a": 1, "b": 0}
 * Similar to zipWith() for arrays
 * @export
 * @param {Function} fn
 * @returns
 */

function merge_with(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return args.reduce(function (p, c) {
      for (var key in c) {
        p[key] = fn(p[key] || 0, c[key]);
      }

      return p;
    });
  };
}

exports.merge_with = merge_with;
},{}],"lib/array.ts":[function(require,module,exports) {
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var collections_1 = require("./collections");

Array.prototype.pushItem = function () {
  this.push.apply(this, arguments);
  return this;
};

Array.prototype.concatAll = function () {
  return this.reduce(function (p, v) {
    return !!v.length ? p.pushItem.apply(p, _toConsumableArray(v)) : p.pushItem(v);
  }, []);
};

Array.prototype.concatMap = function (fn) {
  return this.concatAll().map(fn);
};

Array.prototype.zip = function () {
  return collections_1.zip.apply(collections_1, _toConsumableArray(this));
};

Array.prototype.toDic = function () {
  var r = {};
  this.forEach(function (x, i) {
    return r[i] = x;
  });
  return r;
};

Array.prototype.zipWith = function (fn) {
  return collections_1.zipWith(fn).apply(void 0, _toConsumableArray(this));
};

Array.prototype.flip = function () {
  return this.reduceRight(function (p, c) {
    return p.pushItem(c);
  }, []);
};

Array.prototype.flatten = function () {
  var prev = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return this.reduce(function (p, c) {
    return c.length > 0 ? c.flatten(p) : p.pushItem(c);
  }, prev);
};

Array.prototype.insert = function (item) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return this.slice(0, i).pushItem(item).concat(this.slice(i));
};

Array.prototype.reject = function (mapFn) {
  return this.reduce(function (p, c, i) {
    if (!mapFn(c, i)) return p.pushItem(c);
    return p;
  }, []); // return this.filter(x => !mapFn(x));
};
},{"./collections":"lib/collections.ts"}],"examples/cart.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var arithmatics_1 = require("../lib/arithmatics");
/*
The cart is an array of objects like this:
*/


exports.cart = [{
  "name": "Biscuits",
  "type": "regular",
  "category": "food",
  "price": 2.0
}, {
  "name": "Monitor",
  "type": "prime",
  "category": "tech",
  "price": 119.99
}, {
  "name": "Mouse",
  "type": "prime",
  "category": "tech",
  "price": 25.50
}, {
  "name": "dress",
  "type": "regular",
  "category": "clothes",
  "price": 49.90
}];

function isPrime(item) {
  return item.type === 'prime';
}

function primeItems(cart) {
  return cart.filter(isPrime);
}

exports.primeItems = primeItems;

function noPrimeItems(cart) {
  return cart.reject(isPrime);
}

exports.noPrimeItems = noPrimeItems;
/**
 * Cart Manupulation is a good example of Partial Apply
 *
 * @export
 * @param {number} discount
 * @param {Function} fn
 * @returns
 */

function applyDiscount(discount, fn) {
  return function (prop, value) {
    return function (cart) {
      return cart.reduce(function (p, c) {
        return c[prop] == value ? p.pushItem(Object.assign({}, c, {
          price: fn(c.price, discount)
        })) : p.pushItem(c);
      }, []);
    };
  };
}

exports.applyDiscount = applyDiscount;
var discountPercent = applyDiscount(0.9, arithmatics_1.mul);
var discountAmount = applyDiscount(20, arithmatics_1.sub);
exports.techItemDiscount = discountPercent('category', 'tech');
exports.clothingItemDiscount = discountAmount("category", "clothes");

function applyTax(percent) {
  return function (x) {
    return x * (1 - percent / 100);
  };
}

exports.applyTax = applyTax;

function getTax(percent) {
  return function (x) {
    return x * percent / 100;
  };
}

exports.getTax = getTax;

function sumOfPrice(x, y) {
  return x + y.price;
}

exports.sumOfPrice = sumOfPrice;
},{"../lib/arithmatics":"lib/arithmatics.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var collections_1 = require("./lib/collections");

var arithmatics_1 = require("./lib/arithmatics");

var clist_1 = require("./lib/clist");

var compose_flow_1 = require("./lib/compose_flow");

var crud_1 = require("./lib/crud");

var objects_1 = require("./lib/objects");

require("./lib/array");

var cart_1 = require("./examples/cart");

var mlist = {
  1: clist_1.clist,
  2: arithmatics_1.subArgs,
  3: arithmatics_1.addArgs,
  4: compose_flow_1.compose,
  5: compose_flow_1.flow
}; // Partial Application Method

var method = function method(x) {
  return function () {
    return mlist[x].apply(mlist, arguments);
  };
}; // console.log(method(4)(
//     addArgs,
//     negateArgs, 
//     doubleArgs,
//     )(1,2,3));
// console.log([[1,2,3],[4,5,6]].zip());
// console.log(take(5,range(10)));
// console.log([3,2,1].flip());
// console.log([[3,[2],1], [[[[9]]]], range(10), 33].flatten());
// console.log(interleave([1,2,3],[4,5,6],[7,8,9]));
// console.log(interleave1([1,2,3],[4,5,6],[7,8,9]));
// console.log(allOk(isPositive, isEven)(7));
// console.log(frequencies([1,2,2,3,3,3,4]));


var h1 = function h1(str) {
  return "<h1>".concat(str, "</h1>");
};

var h2 = function h2(str) {
  return "<h2>".concat(str, "</h2>");
};

var h3 = function h3(str) {
  return "<h3>".concat(str, "</h3>");
};

var concatPrintValues = function concatPrintValues(x, y) {
  if (typeof x != 'string') x = JSON.stringify(x);
  if (typeof y != 'string') y = JSON.stringify(y);
  return x + y;
};

var Print = function Print() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return document.getElementById('out').innerHTML += args.reduce(concatPrintValues) + '<br>';
};

Print(h2('Merge With'), objects_1.merge_with(arithmatics_1.add)({
  "a": 1,
  "b": 2
}, {
  "b": 3,
  c: 12
}));
var a = {
  "a": 1,
  "b": {
    "c": 2,
    d: {
      e: 10
    }
  }
};
Print(h2('Update In'), '<strong> var a = {a: 1, b: {c: 2, d: {e: 10}}} </strong>', h3('update_in(a, ["b", "d", "e"], mul, 0.9)'), JSON.stringify(crud_1.update_in(a, ["b", "d", "e"], arithmatics_1.mul, 0.9)));
Print(h2('Concat Map'), [[1, 2, 3], [4, 5, 6], [7, 8, 9]].concatMap(arithmatics_1.add));
Print(h2('ZipWith add'), [[1, 2, 3], [4, 5, 6], [7, 8, 9]].zipWith(arithmatics_1.add));
Print(h2('ZipDic'), collections_1.zipDic(['a', 'b', 'c'], [1, 2, 3]));
Print(h2('Not Prime'), cart_1.noPrimeItems(cart_1.cart));
Print(h2('Prime'), cart_1.primeItems(cart_1.cart));
Print(h2('Original Cart => '), '<strong>', JSON.stringify(cart_1.cart), '</strong>');
var VAT = cart_1.getTax(5);
var GST = cart_1.getTax(17);
var subTotal = collections_1.zipMapWith(cart_1.cart)(cart_1.sumOfPrice, 0);
Print('<strong>Sub Total -- ', compose_flow_1.flow(Math.round)(subTotal), '</strong>');
Print('VAT Tax -- ', compose_flow_1.flow(VAT, Math.round)(subTotal));
Print('GST Tax -- ', compose_flow_1.flow(GST, Math.round)(subTotal));
Print('<strong style="font-size:20px"> Total -- ', compose_flow_1.flow(arithmatics_1.addArgs, Math.round)(subTotal, VAT(subTotal), GST(subTotal)), '</strong>'); // Print(h3('Category Tech Discounted by 10%'), techItemDiscount(cart));
// Print(h3('Prime Discounted by 10%'), clothingItemDiscount(cart));

exports.coupon = {
  type: 'item',
  items: [{
    on: 'category',
    value: 'food',
    percent: 10
  }, {
    on: 'category',
    value: 'tech',
    percent: 50
  }]
};
var updatedCart = exports.coupon.items.reduce(function (p, c) {
  return cart_1.applyDiscount(1 - c.percent / 100, arithmatics_1.mul)(c.on, c.value)(p);
}, cart_1.cart);
VAT = cart_1.getTax(5);
GST = cart_1.getTax(17);
var discountTotal = subTotal - updatedCart.reduce(function (p, c) {
  return p + c.price;
}, 0);
subTotal = collections_1.zipMapWith(updatedCart)(cart_1.sumOfPrice, 0);
Print(h3('Discounted Cart as per coupon'), updatedCart);
Print('<strong>Sub Total -- ', compose_flow_1.flow(Math.round)(subTotal), '</strong>');
Print('VAT Tax -- ', compose_flow_1.flow(VAT, Math.round)(subTotal));
Print('GST Tax -- ', compose_flow_1.flow(GST, Math.round)(subTotal));
Print('Total Discount -- ', compose_flow_1.flow(Math.round)(discountTotal));
Print('<strong style="font-size:20px"> Total -- ', compose_flow_1.flow(arithmatics_1.addArgs, Math.round)(subTotal, VAT(subTotal), GST(subTotal)), '</strong>');
},{"./lib/collections":"lib/collections.ts","./lib/arithmatics":"lib/arithmatics.ts","./lib/clist":"lib/clist.ts","./lib/compose_flow":"lib/compose_flow.ts","./lib/crud":"lib/crud.ts","./lib/objects":"lib/objects.ts","./lib/array":"lib/array.ts","./examples/cart":"examples/cart.ts"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54754" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map