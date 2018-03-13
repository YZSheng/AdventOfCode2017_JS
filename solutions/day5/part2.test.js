import fs from 'fs';
import {shouldIncrementCounter} from './part1';
import {countStepsPartTwo} from './part2';

describe('part 2', () => {
    describe('calculate the steps needed to break', () => {
        test('[0, 3, 0, 1, -3] will need 10 steps', () => {
            expect(countStepsPartTwo([0, 3, 0, 1, -3])).toBe(10);
        });

        test('actual input', async () => {
            await fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
                if (err) {
                    throw new Error('Error reading input!');
                } else {
                    const dataArray = data.split('\n').map(n => parseInt(n));
                    expect(countStepsPartTwo(dataArray)).toBe(27283023);
                }
            });
        });
    });    
});