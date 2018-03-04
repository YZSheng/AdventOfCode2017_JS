import fs from 'fs';

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading input!');
    } else {
        const inputMatrix = data.split('\n').map(row => row.split(/\s/).map(val => parseInt(val)));
        console.log(`Part one result is ${solvePartOne(inputMatrix)}`);
        console.log(`Part two result is ${solvePartTwo(inputMatrix)}`);
    }
});

function solvePartOne(inputMatrix) {
    const maxInEachRow = inputMatrix.map(arr => Math.max(...arr));
    const minInEachRow = inputMatrix.map(arr => Math.min(...arr));
    return maxInEachRow.map((val, index) => val - minInEachRow[index]).reduce((acc, current) => acc + current, 0);
}

function solvePartTwo(inputMatrix) {
    return inputMatrix.map(findDivisibles).reduce((acc, current) => acc + current, 0);
}

function findDivisibles(arr) {
    for(var i = 0; i < arr.length; i++) {
        for(var j = 0; j < arr.length; j++) {
            const dividend = arr[i];
            const divisor = arr[j];
            if (i !== j && dividend % divisor === 0) {
                return dividend / divisor;
            }
        }
    }
}
