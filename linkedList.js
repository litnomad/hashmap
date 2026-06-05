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

  pop() {
    if (this.head == null) {
      return undefined;
    }

    const pop = this.head;
    this.head = this.head.nextNode;
    return pop;
  }

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
        // change the pointer of the previous node from current node 
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
