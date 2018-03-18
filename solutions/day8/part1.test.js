import fs from 'await-fs';

describe('part 1', () => {
    test('get all the variables from input', async () => {
        const data = await fs.readFile(`${__dirname}/sample.txt`, 'utf8');
        const variables = new Set(data.split('\n').map(entry => entry.split(' ')[0]));
        expect(variables.size).toEqual(3);
        expect(variables.has('a')).toBeTruthy();
        expect(variables.has('b')).toBeTruthy();
        expect(variables.has('c')).toBeTruthy();
    });
    
    test('all variables are initialized to 0', async () => {
        const data = await fs.readFile(`${__dirname}/sample.txt`, 'utf8');
        const variables = new Set(data.split('\n').map(entry => entry.split(' ')[0]));
        expect(initialize(variables)).toEqual({a: 0, b: 0, c:0});
    });
    
    test('evaluate "b inc 5 if a > 1"', async () => {
        const data = await fs.readFile(`${__dirname}/sample.txt`, 'utf8');
        const variables = new Set(data.split('\n').map(entry => entry.split(' ')[0]));
        const result = initialize(variables);
        expect(evaluate(result, "b inc 5 if a > 1")).toEqual({a: 0, b: 0, c:0});
    });
    
    test('evaluate "b inc 5 if a > 1", then "a inc 1 if b < 5"', async () => {
        const data = await fs.readFile(`${__dirname}/sample.txt`, 'utf8');
        const variables = new Set(data.split('\n').map(entry => entry.split(' ')[0]));
        const result = initialize(variables);
        expect(evaluate(evaluate(result, "b inc 5 if a > 1"), "a inc 1 if b < 5")).toEqual({a: 1, b: 0, c:0});
    });
    
    test('evaluate the entire sample input', async () => {
        const data = await fs.readFile(`${__dirname}/sample.txt`, 'utf8');
        const actual = analyzeRegister(data);
        expect(actual.largest).toEqual(1);
        expect(actual.highest).toEqual(10);
    });

    test('evaluate the actual input', async () => {
        const data = await fs.readFile(`${__dirname}/input.txt`, 'utf8');
        const actual = analyzeRegister(data);
        expect(actual.largest).toEqual(4163);
        expect(actual.highest).toEqual(5347);
    });
});

const largest = result => {
    return Math.max(...Object.keys(result).map(key => result[key]));
}

const initialize = variables => {
    const data = {};
    variables.forEach(name => {
        data[name] = 0;
    });
    return data;
};

const evaluate = (data, instruction) => {
    const result = Object.assign({}, data);
    const instructions = instruction.split(' ');
    const variable = instructions[0];
    const delta = instructions[2];
    const predicate = `${result[instructions[4]]} ${instructions[5]} ${instructions[6]}`;
    if (eval(predicate)) {
        if (instructions[1] === 'inc') {
            result[variable] += parseInt(delta);
        } else if (instructions[1] === 'dec') {
            result[variable] -= parseInt(delta);
        }
    }
    
    return result;
}

function analyzeRegister(data) {
    const variables = new Set(data.split('\n').map(entry => entry.split(' ')[0]));
    let result = initialize(variables);
    let highest = 0;
    data.split('\n').forEach(instruction => {
        result = evaluate(result, instruction);
        highest = highest < largest(result) ? largest(result) : highest;
    });
    return {
        largest: largest(result),
        highest
    };
}
