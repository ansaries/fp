import { Arrays } from './array';

for (const key in Arrays) {
  if (key) {
    Array.prototype[key] = Arrays[key];
  }
}
