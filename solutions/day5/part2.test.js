import {shouldIncrementCounter} from './part1';
import {countSteps as countStepsPartTwo} from './part2';

describe('part 2', () => {
    describe('calculate the steps needed to break', () => {
        test('[0, 3, 0, 1, -3] will need 10 steps', () => {
            expect(countStepsPartTwo([0, 3, 0, 1, -3])).toBe(10);
        });
    });    
});