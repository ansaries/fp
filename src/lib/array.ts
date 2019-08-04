import { zip, zipWith } from "./collections";

Array.prototype.pushItem = function (...args) {
    this.push(...args);
    return this;
}

Array.prototype.concatAll = function () {
    return this.reduce((p, v) => {
        return !!v.length ? p.pushItem(...v) : p.pushItem(v);
    }, [])
};


Array.prototype.concatMap = function (fn) {
    return this.concatAll().map(fn);
}


Array.prototype.zip = function () {
    return zip(...this);
}

Array.prototype.toDic = function () {
    const r = {};
    this.forEach((x, i) => r[i] = x);
    return r;
}

Array.prototype.zipWith = function (fn) {
    return zipWith(fn)(...this);
}


Array.prototype.flip = function () {
    return this.reduceRight((p, c) => p.pushItem(c), []);
}


Array.prototype.flatten = function (prev = []) {
    return this.reduce((p, c) => (c.length > 0) ? c.flatten(p) : p.pushItem(c), prev);
}

Array.prototype.insert = function (item, i = 0) {
    return this.slice(0, i).pushItem(item).concat(this.slice(i));
}

Array.prototype.reject = function(mapFn: (x: any,i?: number) => boolean) {
    return this.reduce((p,c,i) => {
        if(!mapFn(c, i)) return p.pushItem(c);
        return p;
    }, []);

    // return this.filter(x => !mapFn(x));
}

