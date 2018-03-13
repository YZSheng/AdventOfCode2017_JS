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
    const allNodes = dataArray.map(entry => entry.split(' ')[0]);
    const referencedNodes = dataArray.filter(entry => entry.indexOf('->') > -1).map(entry => entry.split('-> ')[1]).join(', ').split(', ');
    return allNodes.find(node => referencedNodes.indexOf(node) === -1);
}