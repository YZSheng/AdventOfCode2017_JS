import input from './input';

const inputArray = input.split('').map(value => parseInt(value));
let partOneResult = 0;

inputArray.forEach((value, index) => {
    const nextIndex = index === inputArray.length - 1 ? 0 : index + 1;
    partOneResult += value === inputArray[nextIndex] ? value : 0;
});

console.log(`Part one result is ${partOneResult}`);
