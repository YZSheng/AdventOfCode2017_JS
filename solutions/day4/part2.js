import {validatePassphrase} from './part1';

export const totalNonAnagramPassphraseCount = input => {
    return input.split('\n').filter(row => !hasAnagram(row)).length;
}

export const hasAnagram = input => {
    const inputArray = input.split(' ');
    const sortedInput = inputArray.map(item => item.split('').sort().join('')).join(' ');
    return !validatePassphrase(sortedInput);
}
