class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  // head is null when list is empty
  head = null;

  // adds a new node containing value to the end of the list
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

  // adds a new node containing value to the start of the list
  prepend(value) {
    const tail = this.head;
    this.head = new Node(value);
    this.head.nextNode = tail;
    return this.head;
  }

  removeAll() {
    this.head = null;
  }

  // returns the total nodes in the list
  size() {
    let current = this.head;
    let counter = 0;

    while (current !== null) {
      counter++;
      current = current.nextNode;
    }

    return counter;
  }

  // returns value of the node at given index
  at(index) {
    let current = this.head;
    let i = 0;

    while (i <= index && current !== null) {
      if (i == index) {
        break;
      }
      current = current.nextNode;
      i++;
    }

    return current !== null ? current.value : null;
  }

  allKeys() {
    let current = this.head;
    let keys = [];

    while (current !== null) {
      keys.push(Object.keys(current.value).toString());
      current = current.nextNode;
    }
    return keys;
  }

  allValues() {
    let current = this.head;
    let values = [];

    while (current !== null) {
      values.push(Object.values(current.value).toString());
      current = current.nextNode;
    }
    return values;
  }

  allKeyValues() {
    let current = this.head;
    let keyValues = [];

    while (current !== null) {
      keyValues.push(Object.entries(current.value));
      current = current.nextNode;
    }
    return keyValues;
  }

  // returns true if the passed value is in the list and otherwise false
  contains(value) {
    let current = this.head;

    while (current !== null) {
      if (current.value == value) {
        return true;
      }
      current = current.nextNode;
    }
    return false;
  }

  containsKey(key, value) {
    let current = this.head;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        return (current.value[key] = value);
      }
      current = current.nextNode;
    }
    return false;
  }

  getKey(key) {
    let current = this.head;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        return Object.keys(current.value);
      }
      current = current.nextNode;
    }
    return null;
  }

  hasKey(key) {
    let current = this.head;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        return true;
      }
      current = current.nextNode;
    }

    return false;
  }

  removeKey(key) {
    let current = this.head;
    let previous = null;

    while (current !== null) {
      if (Object.keys(current.value) == key) {
        previous.nextNode = current.nextNode;
        return true;
      }
      previous = current;
      current = current.nextNode;
    }
    return false;
  }

  // returns the index of the node containing the given value. If an index can't be found, return -1. If more than one node has a matching value, returns the index of the first node with the matching value.
  findIndex(value) {
    let current = this.head;
    let index = 0;

    while (current !== null) {
      if (current.value == value) {
        return index;
      }
      current = current.nextNode;
      index++;
    }
    if (current == null) {
      return -1;
    }
  }

  // represents objects as strings; format should be: ( value ) -> ( value ) -> ( value ) -> null
  toString(string = "", nextNode) {
    if (this.head == null) {
      string += "null";
      return string;
    }

    let current;
    if (!nextNode) {
      current = this.head;
    } else {
      current = nextNode;
    }

    if (current.value !== null) {
      string += `( ${current.value} ) -> `;
    }
    if (current.nextNode == null) {
      string += "null";
    } else {
      nextNode = current.nextNode;
      return this.toString(string, nextNode);
    }

    return string;
  }

  // insert new nodes with the given values at the given index
  insertAt(index, ...values) {
    let current = this.head;

    // if index is 0, replace head
    if (index === 0) {
      const oldHead = this.head;

      for (let i = 0; values[i] !== undefined; i++) {
        // bug, this.head loses the previous value in memory
        this.head = new Node(values[i]);
      }
      return (this.head.nextNode = oldHead);
    }

    // find current at index
    while (index - 1 > 0) {
      current = current.nextNode;
      index--;
    }

    // throw a range error if index is out of bounds
    if (current == null) {
      throw new RangeError("Index is out of bounds.");
    }

    // move current nodes to tail
    const tail = current.nextNode;

    // insert new nodes at current
    for (let i = 0; values[i] !== undefined; i++) {
      current.nextNode = new Node(values[i]);
      current = current.nextNode;
    }

    // appends tail
    if (current.nextNode == null) {
      current.nextNode = tail;
    }
  }

  // removes the node at the given index. If the given index is out of bounds (below 0 or greater than or equal to the list’s size), throw a RangeError
  removeAt(index) {
    if (index === 0) {
      this.head = this.head.nextNode;
      return;
    }

    let current = this.head;
    // traverse to the node right before the target index
    for (let i = 0; i < index - 1; i++) {
      if (current == null) {
        throw new RangeError("Index is out of bounds.");
      }
      current = current.nextNode;
    }
    // change pointer reference of the node to the remaining tail
    if (current.nextNode.nextNode == null) {
      return (current.nextNode = null);
    } else {
      current.nextNode = current.nextNode.nextNode;
    }
  }
}

export { LinkedList };
