import {shouldIncrementCounter} from './part1';

export const countSteps = array => {
    let index = 0;
    let counter = 0;
    let originalArray = array.slice();
    const jump = (idx, arr) => {
        index = idx + arr[idx];
        originalArray[idx] = arr[idx] >= 3 ? arr[idx] - 1: arr[idx] + 1;
    }

    while (shouldIncrementCounter(index, originalArray)) {
        jump(index, originalArray);
        counter++
    }
    
    return counter;
}