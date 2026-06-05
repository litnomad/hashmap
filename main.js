import { LinkedList } from "./linkedList.js";

class HashMap {
  constructor() {
    this.buckets = [
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
      new LinkedList(),
    ];
    this.loadCapacity = this.buckets.length;
    this.loadFactor = 0.75;
  }

  // generates hash code for key
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
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

    // when load factor is reached, create a new bucket with double the size
    const total = this.length();
    if (total > this.loadCapacity * this.loadFactor) {
      const prevBuckets = this.buckets;
      this.buckets = [];

      // grow bucket size
      for (let i = 0; i < 2 * this.loadCapacity; i++) {
        this.buckets = this.buckets.concat(new LinkedList());
      }

      // reseed prevBuckets
      let newArray = [];
      for (let i = 0; i < prevBuckets.length; i++) {
        const keyValues = prevBuckets[i].allKeyValues();
        newArray = newArray.concat(...keyValues);
      }

      newArray.forEach((item) => {
        const previousKey = item[0];
        const previousValue = item[1];

        const h = this.hash(previousKey);
        if (this.buckets[h]) {
          this.buckets[h].containsKey(previousKey, previousValue);
          if (
            this.buckets[h].containsKey(previousKey, previousValue) === false
          ) {
            this.buckets[h].append({ [previousKey]: previousValue });
          }
        } else {
          this.buckets[h] = new LinkedList();
          this.buckets[h].append({ [previousKey]: previousValue });
        }
      });
    }

    console.log(this.buckets);
  }

  // takes one argument as a key and returns the value that is assigned to this key
  get(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i].getKey(key)) {
        return this.buckets[i].getKey(key);
      }
    }
    return null;
  }

  // takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  has(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i].hasKey(key) === true) {
        return true;
      }
    }
    return false;
  }

  // takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true. If the key isn’t in the hash map, it should return false.
  remove(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i].removeKey(key) === true) {
        return true;
      }
    }
    return false;
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
