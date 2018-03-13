import fs from 'await-fs';

describe('solution', () => {
    describe('redistribute', () => {
        test('[1, 0] should be [0, 1]', () => {
            expect(redistribute([1, 0])).toEqual([0, 1]);
        });
        test('[0, 2, 7, 0] should be [2, 4, 1, 2]', () => {
            expect(redistribute([0, 2, 7, 0])).toEqual([2, 4, 1, 2]);
        });
        test('[2, 4, 1, 2] should be [3, 1, 2, 3]', () => {
            expect(redistribute([2, 4, 1, 2])).toEqual([3, 1, 2, 3]);
        });
    });

    describe('count cycles', () => {
        test('[0, 2, 7, 0] should be 5', () => {
            expect(countRedistributionCycles([0, 2, 7, 0]).counter).toBe(5);
            expect(countRedistributionCycles([0, 2, 7, 0]).cycleSize).toBe(4);
        });

        test('actual input', async () => {
            try {
                const data = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
                const dataArray = data.split(/\s+/).map(n => parseInt(n));
                expect(countRedistributionCycles(dataArray).counter).toBe(14029);
                expect(countRedistributionCycles(dataArray).cycleSize).toBe(2765);
            } catch (err) {
                expect(err).toEqual('An error occurred when trying to read input');
            }
        });
    });
});

const redistribute = arr => {
    const array = arr.slice();
    const max = Math.max(...array);
    const maxIndex = array.indexOf(max);
    const valueToDistribute = array[maxIndex];
    array[maxIndex] = 0;
    for (var i = valueToDistribute; i > 0; i--) {
        const index = (maxIndex + i) % array.length;
        array[index] += 1;
    }
    return array;
}

const countRedistributionCycles = arr => {
    let counter = 0;
    let array = arr.slice();
    const memory = [];
    while (memory.indexOf(array.toString()) === -1) {
        counter++;
        memory.push(array.toString());
        array = redistribute(array);
    }
    const cycleSize = memory.length - memory.indexOf(array.toString());
    return {counter, cycleSize};
}