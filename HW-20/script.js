class Node {
    constructor(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class DoublyLinkedList {
    #head = null;

    size() {
        let counter = 0;
        let node = this.#head;
        while (node !== null) {
            counter++;
            node = node.next;
        }
        return counter;

    }

    head() {
        return this.#head;
    }

    #getLast() {
        let node = this.#head;
        while (node.next !== null) {
            node = node.next;
        }
        return node;
    }

    add(value) {
        const node = new Node(value);
        if (this.size() === 0) {
            this.#head = node;
            return;
        }
        const lastNode = this.#getLast();
        node.prev = lastNode;
        lastNode.next = node;
    }

    remove(value) {
        const removedElement = this.search(value);
        if (removedElement === null) return;
        const prevElement = removedElement.prev;
        const nextElement = removedElement.next;
        if (prevElement !== null) {
            prevElement.next = nextElement;
        } else {
            this.#head = nextElement;
        }

        if (nextElement !== null) {
            nextElement.prev = prevElement;
        }

    }

    search(value) {
        let node = this.#head;
        while (node !== null) {
            if (node.value === value) return node;
            node = node.next;
        }
        return null;

    }

    toArray() {
        let node = this.#head;
        const nodeArray = [];
        while (node !== null) {
            nodeArray.push(node.value);
            node = node.next;
        }
        return nodeArray;
    }
}

const linkedList = new DoublyLinkedList();
console.log(linkedList.size());
console.log(linkedList.head());
linkedList.add(1);
linkedList.add(2);
linkedList.add(3);
linkedList.add(4);
console.log(linkedList.toArray());
console.log(linkedList.size());
console.log(linkedList.head());
console.log(linkedList.search(2));
linkedList.remove(2);
console.log(linkedList.search(2));
linkedList.remove(1);
console.log(linkedList.head());
console.log(linkedList.toArray());
linkedList.remove(4);
console.log(linkedList.toArray());
linkedList.remove(3);
linkedList.remove(5);
console.log(linkedList.toArray());
