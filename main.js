import { LinkedList } from "./linkedList.js";

class HashMap {
  buckets = [];

  constructor(capacity = 16) {
    this.loadFactor = 0.75;
    this.loadCapacity = capacity;
    this.create = this.createBuckets(capacity);
  }

  createBuckets() {
    for (let i = 0; i < this.loadCapacity; i++) {
      this.buckets.push(new LinkedList());
    }
  }

  // generates hash code for key
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.loadCapacity;
    }

    return hashCode;
  }

  // if a key already exists, the old value is overwritten. if no key is found, add key-value pair to bucket.
  set(key, value) {
    const h = this.hash(key);

    if (this.buckets[h].contains(key) === true) {
      this.buckets[h].replace(key, value);
    } else if (this.buckets[h].contains(key) === false) {
      this.buckets[h].append({ [key]: value });
    }

    // if load factor is reached, increase buckets
    if (this.length() > this.loadCapacity * this.loadFactor) {
      this.growMap();
    }
  }

  // increase buckets
  growMap() {
    this.loadCapacity = 2 * this.buckets.length;
    const prevBuckets = this.buckets;
    this.buckets = [];
    this.createBuckets();

    // previous entries are hashed for new buckets
    for (let i = 0; i < prevBuckets.length; i++) {
      const entries = prevBuckets[i].pair().flat();

      entries.forEach((item) => {
        this.set(item[0], item[1]);
      });
    }
  }

  // takes one argument as a key and returns the value that is assigned to this key
  get(key) {
    const h = this.hash(key);

    return this.buckets[h].value(key);
  }

  // takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  has(key) {
    const h = this.hash(key);

    return this.buckets[h].contains(key);
  }

  // takes a key as an argument. if the given key is in the hash map, it should remove the entry with that key and return true. if the key isn’t in the hash map, it should return false.
  remove(key) {
    const h = this.hash(key);

    return this.buckets[h].removeKey(key);
  }

  // returns the number of stored keys in the hash map
  length() {
    let counter = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      counter += this.buckets[i].size();
    }
    return counter;
  }

  // removes all entries in the hash map
  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i].removeNodes();
    }
  }

  // returns an array containing all the keys inside the hash map
  keys() {
    let result = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const arrayKeys = this.buckets[i].allKeys();
      result = result.concat(arrayKeys);
    }
    return result;
  }

  // returns an array containing all the values
  values() {
    let result = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const arrayValues = this.buckets[i].allValues();
      result = result.concat(arrayValues);
    }
    return result;
  }

  // returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    let result = [];
    for (let i = 0; i < this.buckets.length; i++) {
      const keyValues = this.buckets[i].pair();
      result = result.concat(keyValues);
    }
    return result;
  }
}

export { HashMap };
