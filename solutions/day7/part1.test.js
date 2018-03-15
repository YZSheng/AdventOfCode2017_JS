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
    const dataArray = data.split('\n');
    const allNodes = dataArray.map(formNode);
    return allNodes.filter(nodesThatAreChildrenOfSomeOtherNode(allNodes))[0].name;
}

class Node {
    constructor(name, weight, children) {
        this.name = name;
        this.weight = weight;
        this.children = children;
    }
}

const formNode = description => {
    const weightMatch = description.match(/\d+/);
    const weight = weightMatch ? parseInt(weightMatch[0]) : null;
    const name = description.split(/\s/)[0];
    const children = description.indexOf('-> ') > -1 ? description.split('-> ')[1].split(', ') : [];
    return new Node(name, weight, children);
}

const nodesThatAreChildrenOfSomeOtherNode = allNodes =>
    node => allNodes.reduce((acc, current) => acc && current.children.indexOf(node.name) === -1, true);
