export const countSteps = (arr, updateIndexInArray) => {
    let index = 0;
    let counter = 0;
    let array = arr.slice();
    const jump = (idx) => {
        index = idx + array[idx];
        updateIndexInArray(array, idx);
    }

    while (shouldIncrementCounter(index, array)) {
        jump(index);
        counter++
    }
    
    return counter;
}

export const shouldIncrementCounter = (index, array) => index < array.length;