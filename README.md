## HashMap
A data structure that uses keys as indices, instead of a meaningless numbering of values in an array. Allows for a quick search speed using key as an input.

## Complexity
Has an average time complexity of O(1) for get(), has(), and remove(), with the exception of O(n) due to the traversing of nodes to get to values.

## Objective
Create a HashMap class function that contains the following methods: set(key, value), has(key), get(key), remove(key), clear(), length(), keys(), values(), and entries() = [[firstKey, firstValue], [secondKey, secondValue]]. The hash function takes the key as an input and turns it into a hash code for bucket distribution, making use of a prime number to minimize the number of collisions. Because of the finite reality of buckets, each bucket is a Linked List. 

## Features
- Prime number to minimize the number of collisions
- Chained Linked Lists for handling of collisions

## Test
### Create HashMap object
const test = new HashMap();
### Run methods
test.set();
console.log(test.has());
console.log(test.get());

Tested in main.test.js. 