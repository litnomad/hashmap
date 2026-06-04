import { LinkedList } from "./linkedList.js";

class HashMap {
  constructor() {
    this.buckets = [new LinkedList(), new LinkedList(), new LinkedList()];
    this.loadCapacity = this.buckets.length;
    this.loadFactor = 0.75;
  }

  // generates hash code for key
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode % 16;
    }

    return hashCode % 3;
  }

  set(key, value) {
    const h = this.hash(key);

    // if a key already exists, the old value is overwritten. if no key is found, add key-value pair to bucket.
    if (this.buckets[h]) {
      this.buckets[h].containsKey(key, value);
      if (this.buckets[h].containsKey(key, value) === false) {
        this.buckets[h].append({ [key]: value });
      }
    } else {
      this.buckets[h] = new LinkedList();
      this.buckets[h].append({ [key]: value });
    }

    // if load factor is reached, double bucket size
    const total = this.length();
    if (total > this.loadCapacity * this.loadFactor) {
      const existingNodes = this.buckets;
      this.buckets = [];

      for (let i = 0; i < 2 * this.loadCapacity; i++) {
        this.buckets = this.buckets.concat(new LinkedList());
      }

      // keeps looping existingNodes more than its length; because after set(pass), it's length is now 6
      for (let i = 0; i < existingNodes.length; i++) {
        let keyValues = existingNodes[i].allKeyValues();
        for (const item of keyValues) {
          this.set(...item[0]);
        }
      }
    }

    console.log(this.buckets);
  }

  // takes one argument as a key and returns the value that is assigned to this key
  get(key) {
    let result = "";
    for (let i = 0; i < this.buckets.length; i++) {
      result = this.buckets[i].getKey(key);
    }
    return result;
  }

  // takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  has(key) {
    let result = "";
    for (let i = 0; i < this.buckets.length; i++) {
      result = this.buckets[i].hasKey(key);
    }
    return result;
  }

  // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  remove(key) {
    let result = "";
    for (let i = 0; i < this.buckets.length; i++) {
      result = this.buckets[i].removeKey(key);
    }
    return result;
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
      this.buckets[i].removeAll();
    }
    console.log(this.buckets);
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
      const keyValues = this.buckets[i].allKeyValues();
      result = result.concat(keyValues);
    }
    return result;
  }
}

export { HashMap };

/* whenever you access the bucket through index
  if (h < 0 || h >= buckets.length) {
  throw new Error("Trying to access index out of bounds");
}
  */
