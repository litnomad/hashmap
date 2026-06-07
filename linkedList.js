class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  head = null;

  // adds a new node to the end of the list
  append(value, nextNode) {
    // adds a new node to head if list is empty
    if (this.head == null) {
      this.head = new Node(value);
      return this.head;
    }

    if (this.head !== null) {
      // dummy variable for moving to the next node
      let current;
      if (!nextNode) {
        current = this.head;
      } else {
        current = nextNode;
      }
      // recursion traverses through nodes in sequential order starting from head until null is reached
      if (current.nextNode !== null) {
        nextNode = current.nextNode;
        return this.append(value, nextNode);
      }
      // creates a new node when null is reached
      if (current.nextNode == null) {
        return (current.nextNode = new Node(value));
      }
    }
  }

  // clear nodes
  removeNodes() {
    this.head = null;
  }

  // total nodes
  size() {
    let current = this.head;
    let counter = 0;

    while (current !== null) {
      counter++;
      current = current.nextNode;
    }

    return counter;
  }

  // array of keys
  allKeys() {
    let current = this.head;
    let keys = [];

    while (current !== null) {
      keys.push(Object.keys(current.value).toString());
      current = current.nextNode;
    }
    return keys;
  }

  // array of values
  allValues() {
    let current = this.head;
    let values = [];

    while (current !== null) {
      values.push(Object.values(current.value).toString());
      current = current.nextNode;
    }
    return values;
  }

  // array of key-value pairs
  pair() {
    let current = this.head;
    let keyValues = [];

    while (current !== null) {
      keyValues.push(Object.entries(current.value));
      current = current.nextNode;
    }
    return keyValues;
  }

  // returns whether key does or does not exist as a boolean
  contains(key) {
    let current = this.head;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  // replaces value associated with key
  replace(key, value) {
    let current = this.head;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        return (current.value[key] = value);
      }
      current = current.nextNode;
    }
    return null;
  }

  // returns the value associated with the key
  value(key) {
    let current = this.head;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        return Object.values(current.value);
      }
      current = current.nextNode;
    }
    return null;
  }

  // removes and returns the head
  pop() {
    if (this.head == null) {
      return undefined;
    }

    const pop = this.head;
    this.head = this.head.nextNode;
    return pop;
  }

  // takes key as an argument and removes the entry with that key
  removeKey(key) {
    let current = this.head;
    let previous = null;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        // if target index is 0, remove the head node
        if (previous === null) {
          this.pop();
          return true;
        }
        // else change the pointer of the previous node to remove the current one
        previous.nextNode = current.nextNode;
        return true;
      }
      previous = current;
      current = current.nextNode;
    }
    return false;
  }
}

export { LinkedList };
