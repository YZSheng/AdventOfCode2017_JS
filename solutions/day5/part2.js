import {shouldIncrementCounter, countSteps} from './common';

export const countStepsPartTwo = array => countSteps(array, updateIndexInArray);

function updateIndexInArray(array, idx) {
    array[idx] = array[idx] >= 3 ? array[idx] - 1 : array[idx] + 1;
}
