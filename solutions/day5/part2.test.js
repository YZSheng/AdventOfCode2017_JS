import fs from 'await-fs';
import {shouldIncrementCounter} from './part1';
import {countStepsPartTwo} from './part2';

describe('part 2', () => {
    describe('calculate the steps needed to break', () => {
        test('[0, 3, 0, 1, -3] will need 10 steps', () => {
            expect(countStepsPartTwo([0, 3, 0, 1, -3])).toBe(10);
        });

        test('actual input', async () => {
            try {
                const data = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
                const dataArray = data.split('\n').map(n => parseInt(n));
                expect(countStepsPartTwo(dataArray)).toBe(27283023);
            } catch (e) {
                expect(err).toEqual('An error occurred when trying to read input');
            }
        });
    });    
});