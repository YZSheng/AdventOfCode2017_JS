import fs from 'fs';
import {countStepsPartOne} from './part1';
import {countStepsPartTwo} from './part2';

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading input!');
    } else {
        const dataArray = data.split('\n').map(n => parseInt(n));
        console.log(`Part 1 solution is ${countStepsPartOne(dataArray)}`);
        console.log(`Part 2 solution is ${countStepsPartTwo(dataArray)}`);
    }
});