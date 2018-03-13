import {shouldIncrementCounter, countSteps} from './common';

export const countStepsPartOne = array => countSteps(array, updateIndexInArray);

function updateIndexInArray(array, idx) {
    array[idx] = array[idx] + 1;
}
