import { Node } from './node.js';

class Tree {
    constructor(...arr){
        this.origArray=arr;
        this.root=buildTree(...arr);
    }
}

function buildTree(...arr){
    arr.sort((a,b) => a-b);
    let uniqueArr=arr.filter((item,index)=>arr.indexOf(item)===index);

    function arrToBST(arr,start,end){
        if(start > end){
            return null;
        }
        let mid=parseInt((start+end)/2);
        let node = new Node(arr[mid]);
        node.leftNode = arrToBST(arr,start,mid-1);
        node.rightNode = arrToBST(arr,mid+1,end);
        return node;
    }
    let arrLength=uniqueArr.length;
    let root=arrToBST(uniqueArr,0,arrLength-1);
    return root;
}

export { Tree };