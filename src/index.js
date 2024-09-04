import './style.css';

import { Tree } from './tree.js';


let testArray=[1,3,3,4,2];
let testTree= new Tree(...testArray);

console.log(testTree.root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  prettyPrint(testTree.root);

console.log("testing!");
