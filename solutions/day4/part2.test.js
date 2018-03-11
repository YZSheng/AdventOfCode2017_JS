import {hasAnagram, totalNonAnagramPassphraseCount} from './part2';

describe('part2', () => {
    describe('anagram', () => {
        test('passphrase that has anagram', () => {
            const input = 'abcde xyz ecdab';
            expect(hasAnagram(input)).toBeTruthy();
        });
        test('passphrase that has no anagram', () => {
            const input = 'abcde xyz ecdaba';
            expect(hasAnagram(input)).toBeFalsy();
        });
    });

    describe('multiple lines', () => {
        describe('when both lines have no anagram', () => {
            it('should return 2', () => {
                const input = 'abcde xyz ecdaba\nabcdef xyz ecdaba';
                expect(totalNonAnagramPassphraseCount(input)).toBe(2);
            });
        });
        describe('when one line has anagram', () => {
            it('should return 1', () => {
                const input = 'abcde xyz ecdaba\nabcdef xyz ecdabf';
                expect(totalNonAnagramPassphraseCount(input)).toBe(1);
            });
        });
    });
});
