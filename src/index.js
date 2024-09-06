import './style.css';

import { Tree } from './tree.js';
import { Node } from './node.js';


let testArray=[1,3,3,4,2,7];
let testTree= new Tree(...testArray);

console.log(testTree.root);

testTree.insert(5);
console.log(testTree.root);

testTree.delete(1);
console.log(testTree.root);

console.log(testTree.find(4));

let multArray=testTree.levelOrder;
console.log(multArray);
console.log(testTree.levelOrder.name);

console.log(testTree.depth(7));
console.log(testTree.height(4));

console.log(testTree.isBalanced());
console.log(testTree.rebalance());

let errArray=testTree.levelOrder
console.log(errArray);

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


function triple(value){
  let result=value*3;
  return result;
}

