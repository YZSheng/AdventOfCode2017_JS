import input from './input';

const inputArray = input.split('').map(value => parseInt(value));
let partOneResult = 0;

inputArray.forEach((value, index) => {
    const nextIndex = index === inputArray.length - 1 ? 0 : index + 1;
    partOneResult += value === inputArray[nextIndex] ? value : 0;
});

console.log(`Part one result is ${partOneResult}`);

let partTwoResult = 0;

inputArray.forEach((value, index) => {
    const nextIndexCandidate = index + inputArray.length / 2;
    const nextIndex = nextIndexCandidate >= inputArray.length ? nextIndexCandidate - inputArray.length : nextIndexCandidate;
    partTwoResult += value === inputArray[nextIndex] ? value : 0;
});

console.log(`Part two result is ${partTwoResult}`);
