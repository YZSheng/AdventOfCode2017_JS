import fs from 'fs';
import {totalNonRepeatingPassphraseCount} from './part1';
import {totalNonAnagramPassphraseCount} from './part2';

fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log('Error reading input!');
    } else {
        console.log(`Part 1 solution is ${totalNonRepeatingPassphraseCount(data)}`);
        console.log(`Part 2 solution is ${totalNonAnagramPassphraseCount(data)}`);
    }
});