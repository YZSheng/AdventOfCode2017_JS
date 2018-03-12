import fs from 'fs';
import {countSteps} from './part1';

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading input!');
    } else {
        const dataArray = data.split('\n').map(n => parseInt(n));
        console.log(`Part 1 solution is ${countSteps(dataArray)}`);
    }
});