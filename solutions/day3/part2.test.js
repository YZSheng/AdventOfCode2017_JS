import nextBiggerValue, {Coordinate, DIRECTIONS, getNextDirection, createMap} from './part2';

describe('Coordinate', () => {
    describe('when initial coordinate is (0,0) and direction is east', () => {
        let map;
        const initialDirection = DIRECTIONS.EAST;
        const initialCoordinate = new Coordinate(0, 0);
        test('map with 1 coordinate', () => {
            map = createMap(initialDirection, initialCoordinate, 1);
            expect(map['0,0']).toEqual(1);
            expect(Object.keys(map).length).toBe(1);    
        });
        
        test('map with 2 coordinates', () => {
            map = createMap(initialDirection, initialCoordinate, 2);
            expect(map['0,0']).toEqual(1);
            expect(map['1,0']).toEqual(1);
            expect(Object.keys(map).length).toBe(2);
        });
        
        test('map with 3 coordinates', () => {
            map = createMap(initialDirection, initialCoordinate, 3);
            expect(map['0,0']).toEqual(1);
            expect(map['1,0']).toEqual(1);
            expect(map['1,1']).toEqual(2);
            expect(Object.keys(map).length).toBe(3);
        });
        
        test('map with 4 coordinates', () => {
            map = createMap(initialDirection, initialCoordinate, 4);
            expect(map['0,0']).toEqual(1);
            expect(map['1,0']).toEqual(1);
            expect(map['1,1']).toEqual(2);
            expect(map['0,1']).toEqual(4);
            expect(Object.keys(map).length).toBe(4);
        });
        
        test('map with 5 coordinates', () => {
            map = createMap(initialDirection, initialCoordinate, 5);
            expect(map['0,0']).toEqual(1);
            expect(map['1,0']).toEqual(1);
            expect(map['1,1']).toEqual(2);
            expect(map['0,1']).toEqual(4);
            expect(map['-1,1']).toEqual(5);
            expect(Object.keys(map).length).toBe(5);
        });
        
        test('map with 6 coordinates', () => {
            map = createMap(initialDirection, initialCoordinate, 6);
            expect(map['0,0']).toEqual(1);
            expect(map['1,0']).toEqual(1);
            expect(map['1,1']).toEqual(2);
            expect(map['0,1']).toEqual(4);
            expect(map['-1,1']).toEqual(5);
            expect(map['-1,0']).toEqual(10);
            expect(Object.keys(map).length).toBe(6);
        });
    });
});

describe('Direction', () => {
    it('should return correct next direction for current east direction', () => {
        expect(getNextDirection(DIRECTIONS.EAST)).toBe(DIRECTIONS.NORTH);
    });
    
    it('should return correct next direction for current north direction', () => {
        expect(getNextDirection(DIRECTIONS.NORTH)).toBe(DIRECTIONS.WEST);
    });
    
    it('should return correct next direction for current west direction', () => {
        expect(getNextDirection(DIRECTIONS.WEST)).toBe(DIRECTIONS.SOUTH);
    });
    
    it('should return correct next direction for current south direction', () => {
        expect(getNextDirection(DIRECTIONS.SOUTH)).toBe(DIRECTIONS.EAST);
    });
});

describe('nextBiggerValue', () => {
    test('next bigger value than 1 is 2', () => {
        expect(nextBiggerValue(1)).toBe(2);
    });

    test('next bigger value than 2 is 4', () => {
        expect(nextBiggerValue(2)).toBe(4);
    });

    test('next bigger value than 4 is 5', () => {
        expect(nextBiggerValue(4)).toBe(5);
    });

    test('next bigger value than 5 is 10', () => {
        expect(nextBiggerValue(5)).toBe(10);
    });

    test('next bigger value than 325489 is 330785', () => {
        expect(nextBiggerValue(325489)).toBe(330785);
    });
});
