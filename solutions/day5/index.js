import fs from 'fs';
import {countSteps as countStepsFromPartOne} from './part1';
import {countSteps as countStepsFromPartTwo} from './part2';

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading input!');
    } else {
        const dataArray = data.split('\n').map(n => parseInt(n));
        console.log(`Part 1 solution is ${countStepsFromPartOne(dataArray)}`);
        console.log(`Part 2 solution is ${countStepsFromPartTwo(dataArray)}`);
    }
});