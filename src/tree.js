import { Node } from './node.js';

class Tree {
    constructor(...arr){
        this.origArray=arr;
        this.root=this.buildTree(...arr);
    }
    buildTree(...arr){
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
    insert(value){
        let newNode= new Node(value);
        let parentNode=null;
        let currentNode=this.root;
        while(currentNode!==null){
            parentNode=currentNode;
            if(currentNode.data>value){
                currentNode=currentNode.leftNode;
            }
            else if(currentNode.data<value){
                currentNode=currentNode.rightNode;
            }
            else {
                return;
            }
        }
        if(parentNode.data > value){
            parentNode.leftNode=newNode;
        } else {
            parentNode.rightNode=newNode;
        }
    }
    delete(value){
        let parentNode=null;
        let currentNode=this.root;
        //if  value is present in BST, find parentNode of value to be deleted
        while(currentNode !==null && currentNode.data !== value){
            parentNode=currentNode;
            if(value < currentNode.data){
                currentNode=currentNode.leftNode;
            } else {
                currentNode=currentNode.rightNode;
            }
        }
        //if value is not present
        if(currentNode===null) {
            return;
        }

        //check if node to delete has at most one child
        if(currentNode.leftNode===null || currentNode.rightNode === null){
            let newCurrentNode = (currentNode.leftNode===null) ? currentNode.rightNode : currentNode.leftNode;
            //check if node to be deleted is the root
            if(parentNode === null){
                return newCurrentNode;
            }
            //
            if(currentNode===parentNode.leftNode){
                parentNode.leftNode=newCurrentNode;
            } else {
                parentNode.rightNode=newCurrentNode;
            }
        } else {
            //node has two children
            let prev = null;
            let temp=currentNode.rightNode;
            while(temp.leftNode !== null) {
                prev=temp;
                temp=temp.leftNode;
            }
            if(prev !== null) {
                prev.leftNode=temp.rightNode;
            } else {
                currentNode.rightNode = temp.rightNode;
            }
            currentNode.data = temp.data;
        }
    }
    find(value){
        let parentNode=null;
        let currentNode=this.root;
        while(currentNode !==null && currentNode.data !== value){
            parentNode=currentNode;
            if(value < currentNode.data){
                currentNode=currentNode.leftNode;
            } else {
                currentNode=currentNode.rightNode;
            }
        }
        //if value is not present
        if(currentNode===null) {
            return;
        }
        return currentNode;
    }
}

export { Tree };