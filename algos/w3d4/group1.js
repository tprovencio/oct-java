// DLLNodes have a .next and .prev
class DLLNode {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

// [4, 9, 3, 2, 5, 10, 7, 22]
// => 5
// [4, 3, 2] left
// [9, 10, 7, 22] right

// [4, 3, 2, 5, 9, 10, 7, 22] output

// return a DLL with the values partitioned by the pivot
// so that all nodes with values lower than pivot are to the left
// and all nodes with values higher than pivot are to the right
// DLL contains numeric integer values
function partitionDLL(DLL, pivot){
    if (DLL.size() < 2) return DLL;
    if (!DLL.exists(pivot)) return DLL;
    let leftDLL = new DLL();
    let rightDLL = new DLL();
    for (let i = 0; i < DLL.size(); i++) {
        let node = DLL.removeHead();
        if (node.data < pivot) {
            leftDLL.addTail(node); //add head is prepend, add tail is append
        }
        if (node.data > pivot){
            rightDLL.addTail(node);
        }
    }
    for (let i = 0; i < leftDLL.size(); i++) {
        DLL.addTail(leftDLL.removeHead());
    }
    DLL.addTail(new Node(pivot));
    for (let i = 0; i < rightDLL.size(); i++) {
        DLL.addTail(rightDLL.removeHead());
    }

    return DLL;
}

//first for loop deconstruct puts them into right and left
//second loop recombines them

// DLLists have both a .head and .tail pointer
class DLList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // == Main Methods ==


    // return true or false if value exists
    exists(value) {
        var forwardRunner = this.head;
        var backwardRunner = this.tail;
        var count = Math.ceil(this.length / 2);
        while (count) {
            if (forwardRunner.data === val || backwardRunner.data === val) {
                return true;
            }
            forwardRunner = forwardRunner.next;
            backwardRunner = backwardRunner.prev;
            count--;
        }
        return false;
    }

    // reverse a doubly linked list
    reverse() {
        var runner = this.head;
        if (runner === null) return;
        if (runner === this.tail) return;

        while (runner) {
            var temp = runner.next;
            runner.next = runner.prev;
            runner.prev = temp;
            runner = temp;
        }

        var temp = this.head;
        this.head = this.tail;
        this.tail = temp;
    }

    // remove and return the first node with data === val, if it exists
    removeVal(val) {
        var runner = this.head;
        if (!runner) {
            return runner;
        }
        if (runner === this.tail && runner.data === val) {
            // remove head and tail
            this.head = null;
            this.tail = null;
            this.lenegth--;
            return runner;
        }
        if (runner.data === val) {
            // remove just head
            this.head = runner.next;
            this.head.prev = null;
            runner.next = null;
            this.length--;
            return runner;
            // return this.removeHead();
        }
        while (runner) {
            if (runner.data === val) {
                // remove runner
                if (runner === this.tail) {
                    this.tail = runner.prev;
                    runner.prev.next = null;
                    runner.prev = null;
                    length--;
                    return runner;
                }
                runner.prev.next = runner.next;
                runner.next.prev = runner.prev;
                runner.next = null;
                runner.prev = null;
                this.length--;
                return runner;
            }
            runner = runner.next;
        }
    }

    // return true of false if the current DLL is a palindrome
    checkPalindrome() {
        var count = Math.floor(this.length / 2);
        var forwardRunner = this.head;
        var backwardRunner = this.tail;
        if (this.length === 1) {
            return true;
        }

        while (count) {
            if (forwardRunner.data !== backwardRunner.data) {
                return false;
            }
            forwardRunner = forwardRunner.next;
            backwardRunner = backwardRunner.prev;
            count--;
        }
        return true;
    }

    // push to head
    addHead(node) {
        if (!this.head) { // empty list
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    }

    // pop from tail
    removeTail() {
        if (this.head == null) return; // empty list
        if (this.head === this.tail) { // one node
            var temp = this.tail;
            this.head = null;
            this.tail = null;
            this.length--;
            return temp;
        }
        var temp = this.tail;
        this.tail = temp.prev;
        this.tail.next = null;
        temp.prev = null;
        this.length--;
        return temp;
    }

    // add node before target if target exists
    // target is a node data
    prepend(target, node) {
        var runner = this.head;
        while (runner) {
            if (runner.data === target) {
                node.next = runner;
                node.prev = runner.prev;
                runner.prev.next = node;
                runner.prev = node;
                this.length++;
                if (runner === this.head) {
                    this.head = node;
                }
                return;
            } else {
                runner = runner.next;
            }
        }
    }

    prependV2(target, node) {
        if (this.head !== null) { // Must have at least one node
            var curNode = this.head;
            if (curNode.data === target) { // Edge case: first node only
                node.next = curNode; // Connect nodes
                curNode.prev = node;
                this.head = node; // Move this.head to new node
                this.length++;
            } else {
                while (curNode.next !== null) {
                    curNode = curNode.next; // Move to next node
                    if (curNode.data === target) {
                        // Link this new node to the others
                        node.next = curNode;
                        node.prev = curNode.prev;
                        // Link other nodes to this new node
                        curNode.prev.next = node;
                        curNode.prev = node;
                        this.length++;
                        break; // Exit while loop - for now, assuming only before first instance of target
                    }
                }
            }
        }
    }

    // return is empty
    isEmpty() {
        return this.head === null;
    }

    // return length
    size() {
        return this.length;
    }


  // push to tail
    addTail(node){
        if (this.isEmpty) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
    }

// add after target if exists
    append(target, node){
        if (this.isEmpty) return null;
        let runner = this.head;
        while (runner) {
            if (runner.data == target) {
                node.next = runner.next;
                node.prev = runner;
                runner.next.prev = node;
                runner.next = node;
            }
            runner = runner.next;
        }
    }

// pop from head
    removeHead(){
        if (this.isEmpty) return null;
        if (this.size() == 1) {
            let node = this.head;
            this.head = null;
            this.tail = null;
            return node;
        }
        let node = this.head;
        this.head = node.next;
        this.head.prev = null;
        node.next = null;
        return node;
    }
}
