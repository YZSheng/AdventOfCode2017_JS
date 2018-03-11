export const validatePassphrase = input => {
    const inputArray = input.split(' ');
    for (let i = 0; i < inputArray.length; i++) {
        const phrase = inputArray[i];
        if (inputArray.filter(item => item === phrase).length > 1) {
            return false
        }
    }
    return true;
}

export const totalNonRepeatingPassphraseCount = input => {
    return input.split('\n').filter(row => validatePassphrase(row)).length;
}
