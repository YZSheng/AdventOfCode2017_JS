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
    
    describe('part 2 solution', () => {
        test('difference of sample file', async () => {
            const data = await fs.readFile(`${__dirname}/sample.txt`, 'utf8');
            const imbalancedNode = findImbalancedNode(data);
            expect(imbalancedNode.name).toEqual('ugml');
            expect(imbalancedNode.correctWeight).toEqual(60);
        });

        test('difference of input file', async () => {
            const data = await fs.readFile(`${__dirname}/additionalInput.txt`, 'utf8');
            const imbalancedNode = findImbalancedNode(data);
            expect(imbalancedNode.name).toEqual('bb');
            expect(imbalancedNode.correctWeight).toEqual(3);
        });

        test('difference of input file', async () => {
            const data = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
            const imbalancedNode = findImbalancedNode(data);
            expect(imbalancedNode.name).toEqual('gozhrsf');
            expect(imbalancedNode.correctWeight).toEqual(757);
        });
    });
});

const findImbalancedNode = data => {
    const originalTree = formTree(data);
    let tree = formTree(data);
    let leaves = getLeaves(tree);
    let leavesOfSameParentHaveSameWeight = allNodesOfSameParentHaveSameWeight(leaves);
    while (leavesOfSameParentHaveSameWeight) {
        tree = foldTree(tree);
        leaves = getLeaves(tree);
        leavesOfSameParentHaveSameWeight = allNodesOfSameParentHaveSameWeight(leaves);
    }
    return findProblemNodeNameAndWeight(leaves, originalTree);
}

const findProblemNodeNameAndWeight = (leaves, originalTree) => {
    let problemNode;
    let deltaInWeight;
    leaves.forEach(leaf => {
        if (leaves.filter(aLeaf => aLeaf.weight === leaf.weight).length === 1) {
            problemNode = leaf;
        }
    });
    const neighborWeight = leaves.find(leaf => leaf.name !== problemNode.name 
        && leaf.parent.name === problemNode.parent.name).weight;
    const originalWeight = originalTree.find(node => node.name === problemNode.name).weight;
    return {
        name: problemNode.name,
        correctWeight: originalWeight - (problemNode.weight - neighborWeight)
    };
}

const allNodesOfSameParentHaveSameWeight = nodes => {
    const parentsWithWeight = {};
    nodes.forEach(node => {
        parentsWithWeight[node.parent.name] = parentsWithWeight[node.parent.name] || [];
        parentsWithWeight[node.parent.name].push(node.weight);
    });
    return Object.keys(parentsWithWeight)
    .map(key => parentsWithWeight[key])
    .reduce((acc, curr) => {
        return acc * new Set(curr).size
    }, 1) === 1;
}

const getLeaves = tree => {
    const height = treeHeight(tree);
    const leaves = tree.filter(node => node.children.length === 0).filter(node => getDepth(node) === height);
    return leaves;
}

const foldTree = tree => {
    const leaves = getLeaves(tree);
    leaves.forEach(leaf => {
        if (leaf.parent && leaf.parent.children.length > 0) {
            leaf.parent.addWeight(leaf.weight * leaf.parent.children.length);
            leaf.parent.emptyChildren();
        }
    });
    return tree.filter(node => !leaves.find(leaf => leaf.name === node.name));
}

const getDepth = node => {
    let depth = 1;
    let currentNode = node;
    while (currentNode.parent) {
        depth++;
        currentNode = currentNode.parent;
    }
    return depth;
}

const treeHeight = tree => {
    const leaves = tree.filter(node => node.children.length === 0);
    return Math.max(...leaves.map(leaf => getDepth(leaf)));
}

const findRoot = data => {
    const allLinkedNodes = formTree(data);
    return allLinkedNodes.find(node => !node.parent).name;
}

class LinkedNode {
    constructor(name, weight, children) {
        this.name = name;
        this.weight = weight;
        this.children = children;
        this.parent = null;
    }
    
    setParent (parent) {
        this.parent = parent;
    }
    
    addWeight (weight) {
        this.weight += weight;
    }
    
    emptyChildren () {
        this.children = [];
    }
}

const formNode = description => {
    const weightMatch = description.match(/\d+/);
    const weight = weightMatch ? parseInt(weightMatch[0]) : null;
    const name = description.split(/\s/)[0].trim();
    const children = description.indexOf('-> ') > -1 ? description.split('-> ')[1].split(', ') : [];
    return new LinkedNode(name, weight, children);
}

const findParent = (node, allNodes) => {
    const parent = allNodes.find(aNode => aNode.children.indexOf(node.name) > -1);
    return parent;
}

function formTree(data) {
    const allNodes = data.split('\n').map(formNode);
    const allLinkedNodes = allNodes.map(node => {
        const parent = findParent(node, allNodes);
        node.setParent(parent);
        return node;
    });
    return allLinkedNodes;
}
