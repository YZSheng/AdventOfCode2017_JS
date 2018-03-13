import {countStepsPartOne} from './part1.js';

describe('part 1', () => {
    describe('calculate the steps needed to break', () => {
        test('[1] will need 1 steps', () => {
            expect(countStepsPartOne([1])).toBe(1);
        });

        test('[0] will need 2 steps', () => {
            expect(countStepsPartOne([0])).toBe(2);
        });

        test('[1, 2] will need 2 steps', () => {
            expect(countStepsPartOne([1, 2])).toBe(2);
        });

        test('[1, -1] will need 3 steps', () => {
            expect(countStepsPartOne([1, -1])).toBe(3);
        });

        test('[0, 3, 0, 1, -3] will need 5 steps', () => {
            expect(countStepsPartOne([0, 3, 0, 1, -3])).toBe(5);
        });
    });
});