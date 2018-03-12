import {shouldIncrementCounter, countSteps} from './part1.js';

describe('part 1', () => {
    describe('determine whether to stop incrementing steps counter', () => {
        test('when index already exceeds the length of array', () => {
            expect(shouldIncrementCounter(1, [])).toBeFalsy();
        });
        
        test('when index has not exceeded the length of array', () => {
            expect(shouldIncrementCounter(1, [2, 3])).toBeTruthy();
        });
    });
    
    describe('calculate the steps needed to break', () => {
        test('[1] will need 1 steps', () => {
            expect(countSteps([1])).toBe(1);
        });

        test('[0] will need 2 steps', () => {
            expect(countSteps([0])).toBe(2);
        });

        test('[1, 2] will need 2 steps', () => {
            expect(countSteps([1, 2])).toBe(2);
        });

        test('[1, -1] will need 3 steps', () => {
            expect(countSteps([1, -1])).toBe(3);
        });

        test('[0, 3, 0, 1, -3] will need 5 steps', () => {
            expect(countSteps([0, 3, 0, 1, -3])).toBe(5);
        });
    });
});