import {add, mul, div, sub} from './arithmatics';


export const update = (obj, prop, fn, val) => Object.assign({}, obj, {[prop]: fn(obj[prop], val)});


// O(n+1) where n is the length of map
export const update_in = (obj, map, fn, val) => {
    // obj = Object.assign({}, obj);
    // If you create a copy of original like above 
    // then dont forget to assign the return value to obj like obj[map[0]] = update_in
    if(map.length <=1) {
        // Apply fn to previous value.
        // Validate the arguments of fn in the fn itself.
        obj[map[0]] = fn(obj[map[0]], val);
        return obj;
    }
    // Just in case if there is no property then create it.
    // and call method recursively to reach to last property to apply fn.
    obj[map[0]] = Object.assign({}, obj[map[0]] || {});
    // Copy return value only if obj is a clone of orignal and not original
    obj[map[0]] = update_in(obj[map[0]], map.slice(1, map.length), fn, val);
    return obj;
}

// bob = {"name": "bob", "hp": 3}
// add 2 to to hp property of bob
// console.log(update(bob, "hp", add, 2));

