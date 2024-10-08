import './style.css';

import { Tree, rebalance } from './tree.js';
import { Node } from './node.js';


/*let testArray=[1,3,3,4,2,7];
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
let reBalanceTree=testTree.rebalance();
console.log(reBalanceTree.isBalanced());

let errArray=testTree.levelOrder
console.log(errArray);



  prettyPrint(testTree.root);
  prettyPrint(reBalanceTree.root);

function triple(value){
  let result=value*3;
  return result;
}*/


function createRandomArray(num){
  let resultArr=[];
  for (let i=0; i<num; i++){
    let value=Math.floor(Math.random()*100);
    resultArr.push(value);
  }
  return resultArr;
}


let randomArr=createRandomArray(10);
console.log(randomArr);

let randomTree=new Tree(...randomArr);
console.log(randomTree);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(randomTree.root);
console.log(randomTree.isBalanced());

function print(value){
  console.log(value);
}

randomTree.levelOrder(print);
randomTree.inOrder(print);
randomTree.postOrder(print);

randomTree.insert(36);
randomTree.insert(54);
randomTree.insert(88);
prettyPrint(randomTree.root);
console.log(randomTree.isBalanced());

let reBalancedTree=randomTree.rebalance();
console.log(reBalancedTree.isBalanced());
prettyPrint(reBalancedTree.root);
