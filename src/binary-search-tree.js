const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  #root = null;

  root() {
    return this.#root ?? null;
  }

  add(data) {
    let newNode = new Node(data);
    if (!this.#root) {
      this.#root = newNode;
    } else {
      this.addNode(this.#root, newNode);
    }
  }

  addNode(node, newNode) {
    if (newNode.data < node.data) {
      node.left === null
        ? (node.left = newNode)
        : this.addNode(node.left, newNode);
    } else {
      node.right === null
        ? (node.right = newNode)
        : this.addNode(node.right, newNode);
    }
  }

  has(data) {
    return !!this.search(this.#root, data);
  }

  search(node, data) {
    if (node.data === data) {
      return node;
    }
    return node.data > data
      ? node.left
        ? this.search(node.left, data)
        : null
      : node.right
      ? this.search(node.right, data)
      : null;
  }

  find(data) {
    return this.search(this.#root, data);
  }

  remove(data) {
    this.root = this.removeNode(this.#root, data);
  }

  removeNode(node, data) {
    if (node === null) return node;
    if (node.data === data) {
      if (node.left === null && node.right === null) return null;
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      if (node.left && node.right) {
        let tempNode = this.smallestNode(node.right);
        node.data = tempNode.data;
        node.right = this.removeNode(node.right, tempNode.data);
        return node;
      }
    }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }
    if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }

  smallestNode(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  min() {
    return this.#root ? this.smallestNode(this.#root).data : null;
  }

  biggestNode(node) {
    while (node.right !== null) node = node.right;
    return node;
  }

  max() {
    return this.#root ? this.biggestNode(this.#root).data : null;
  }
}

module.exports = {
  BinarySearchTree,
};
