import {validatePassphrase, totalNonRepeatingPassphraseCount} from './part1';

describe('part1', () => {
    test('valid input', () => {
        const input = 'aa bb cc dd ee';
        expect(validatePassphrase(input)).toBeTruthy();
    });

    test('duplicate enry in input', () => {
        const input = 'aa bb cc dd ee aa';
        expect(validatePassphrase(input)).toBeFalsy();
    });

    test('both aa and aaa in input', () => {
        const input = 'aa bb cc dd ee aaa';
        expect(validatePassphrase(input)).toBeTruthy();
    });

    describe('multiple lines', () => {
        describe('when both lines are valid', () => {
            it('should return 2', () => {
                const input = 'aa bb cc dd ee\nac bc cc dc';
                expect(totalNonRepeatingPassphraseCount(input)).toBe(2);
            });
        });
        describe('when one line is invalid', () => {
            it('should return 1', () => {
                const input = 'aa bb cc dd ee aa\nac bc cc dc';
                expect(totalNonRepeatingPassphraseCount(input)).toBe(1);
            });
        });
    });
});