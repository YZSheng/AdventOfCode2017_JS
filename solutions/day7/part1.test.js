import fs from 'await-fs';

describe('day 7', () => {
    describe('find root', () => {
        test('find root for sample file', async () => {
            const data = await fs.readFile(`${__dirname}/sample.txt`, 'utf8');
            expect(findRoot(data)).toEqual('tknk');
        });
        test('find root for input file', async () => {
            const data = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
            expect(findRoot(data)).toEqual('eqgvf');
        });
    });
});

const findRoot = data => {
    const allLinkedNodes = formTree(data);
    return allLinkedNodes.find(node => !node.parent).node.name;
}

class Node {
    constructor(name, weight, children) {
        this.name = name;
        this.weight = weight;
        this.children = children;
    }
}

class LinkedNode {
    constructor(node, parent) {
        this.node = node;
        this.parent = parent;
    }
}

const formNode = description => {
    const weightMatch = description.match(/\d+/);
    const weight = weightMatch ? parseInt(weightMatch[0]) : null;
    const name = description.split(/\s/)[0];
    const children = description.indexOf('-> ') > -1 ? description.split('-> ')[1].split(', ') : [];
    return new Node(name, weight, children);
}

const findParent = (node, allNodes) => {
    const parent = allNodes.find(aNode => aNode.children.indexOf(node.name) > -1);
    return parent;
}

function formTree(data) {
    const allNodes = data.split('\n').map(formNode);
    const allLinkedNodes = allNodes.map(node => {
        const parent = findParent(node, allNodes);
        return new LinkedNode(node, parent);
    });
    return allLinkedNodes;
}
