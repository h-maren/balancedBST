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
    levelOrder(callback){
        try {
            if(!callback){
                console.log('check!');
                throw new Error('Callback is not provided!');
            }
            console.log(callback.name);
            let result=[];
            let queue=[];
            let rootNode=this.root;
            queue.push(rootNode)
            if(rootNode===null){
                return;
            }
            while(queue.length){
                let level=[];
                let levelSize=queue.length;
                for(let i=0; i<levelSize; i++){
                    let currentNode=queue.shift();
                    let nodeResult=callback(currentNode.data);
                    level.push(nodeResult);
                    if(currentNode.leftNode) {
                        queue.push(currentNode.leftNode);
                    }
                    if(currentNode.rightNode) {
                        queue.push(currentNode.rightNode)
                    }
                }
                result.push(level);
            }
        return result;
        } 
        //NEED TO FIX Error
        catch(e) {
            console.log(e);
        }
    }
    inOrder(callback){
        let result=[];
        let queue=[];
        let rootNode=this.root;
        if(rootNode===null){
            return;
        }
        let currentNode=rootNode;
        while(currentNode||queue.length){
            while(currentNode){
                queue.push(currentNode);
                currentNode=currentNode.leftNode;
            }
            let resultNode=queue.pop();
            let resultValue=callback(resultNode.data);
            result.push(resultValue);
            currentNode=resultNode.rightNode;
        }
        return result;
    }
    preOrder(callback){
        let result=[];
        let queue=[];
        let rootNode=this.root;
        if(rootNode===null){
            return;
        }
        let currentNode=rootNode;
        queue.push(currentNode);
        while(queue.length){
            let resultNode=queue.pop();
            let resultValue=callback(resultNode.data);
            result.push(resultValue);
            if(resultNode.rightNode){
                queue.push(resultNode.rightNode);
            }
            if(resultNode.leftNode){
                queue.push(resultNode.leftNode);
            }
        }
        return result;
    }
    postOrder(callback){
        let valueOrder=[];
        
        function postOrderTraverse(node){
            if(!node) {
                return;
            }
            postOrderTraverse(node.leftNode);
            postOrderTraverse(node.rightNode);
            valueOrder.push(node.data);
            return valueOrder;
        }
        postOrderTraverse(this.root);
        let result=valueOrder.map(callback);

        return result;
    }
    depth(node){
        let root=this.root;
        if(root===null){
            return;
        }
        let queue=[];
        queue.push(root);
        let level=0;
        let depth=-1;
        while(queue.length>0){
            for(let i=0; i<queue.length; i++){
                let currentNode=queue.shift();
                if(currentNode.data===node){
                    depth=level;
                }
                if(currentNode.leftNode!== null){
                    queue.push(currentNode.leftNode);
                }
                if(currentNode.rightNode!== null){
                    queue.push(currentNode.rightNode);
                }
            }
            level++;
        }
        return depth;
    }
    height(nodeValue){
        let rootNode=this.find(nodeValue);
        if(rootNode===null){
            return 0;
        }
        let height=-1;
        let queue=[];
        queue.push(rootNode);
        queue.push(null);
        while(queue.length>0){
            let tempNode=queue.shift();
            //increment height every time null is encountered
            if(tempNode===null){
               height++;
               if(queue.length>0){
                //null is counter for height
                queue.push(null);
               }
            }
            else {
                if(tempNode.leftNode){
                    queue.push(tempNode.leftNode);
                }
                if(tempNode.rightNode){
                    queue.push(tempNode.rightNode)
                }
            }
        }
        return height;
    }
}

export { Tree };