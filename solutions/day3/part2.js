'use strict';

export class Coordinate {
    constructor(east, north) {
        this.east = east;
        this.north = north;
    }

    toMapKey () {
        return `${this.east},${this.north}`;
    }

    moveTo (direction) {
        switch (direction) {
            case DIRECTIONS.EAST: return new Coordinate(this.east + 1, this.north);
            case DIRECTIONS.NORTH: return new Coordinate(this.east, this.north + 1);
            case DIRECTIONS.WEST: return new Coordinate(this.east - 1, this.north);
            case DIRECTIONS.SOUTH: return new Coordinate(this.east, this.north - 1);
            default: throw new Error('Unknown Direction!');
        }
    }

    getNeighbours () {
        return [
            new Coordinate(this.east + 1, this.north),
            new Coordinate(this.east + 1, this.north + 1),
            new Coordinate(this.east, this.north + 1),
            new Coordinate(this.east - 1, this.north + 1),
            new Coordinate(this.east - 1, this.north),
            new Coordinate(this.east - 1, this.north - 1),
            new Coordinate(this.east, this.north - 1),
            new Coordinate(this.east + 1, this.north -1),
        ];
    }
}

export const DIRECTIONS = {
    EAST: 'east',
    NORTH: 'north',
    WEST: 'west',
    SOUTH: 'south'
};

export const getNextDirection = (direction) => {
    switch (direction) {
        case DIRECTIONS.EAST: return DIRECTIONS.NORTH;
        case DIRECTIONS.NORTH: return DIRECTIONS.WEST;
        case DIRECTIONS.WEST: return DIRECTIONS.SOUTH;
        case DIRECTIONS.SOUTH: return DIRECTIONS.EAST;
        default: throw new Error('Unknown Direction!');
    }
};

export const createMap = (initialDirection, initialCoordinate, noOfCoord) => {
    const map = {};
    map[initialCoordinate.toMapKey()] = 1;
    let currentDirection = initialDirection;
    let currentCoordinate = new Coordinate(initialCoordinate.east, initialCoordinate.north);
    for (let i = 1; i < noOfCoord; i++) {
        const nextCoordInDirection = currentCoordinate.moveTo(currentDirection);
        map[nextCoordInDirection.toMapKey()] = getSumOfNeighbours(nextCoordInDirection, map);
        currentCoordinate = nextCoordInDirection;
        currentDirection = nextDirectionForCoordinateInMap(currentDirection, currentCoordinate, map);
    }
    return map;
};

function getSumOfNeighbours(coord, map) {
    return coord.getNeighbours().map(coordinate => map[coordinate.toMapKey()] || 0).reduce((pre, current) => pre + current, 0);
}

function nextDirectionForCoordinateInMap(currentDirection, currentCoordinate, map) {
    const nextDirection = getNextDirection(currentDirection);
    const nextCoordinate = currentCoordinate.moveTo(nextDirection);
    return map[nextCoordinate.toMapKey()] === undefined ? nextDirection : currentDirection;
}

const nextBiggerValue = target => {
    let newValue = 0;
    let n = 1;
    while (newValue <= target) {
        const coordMap = createMap(DIRECTIONS.EAST, new Coordinate(0, 0), n);
        newValue = Math.max(...Object.keys(coordMap).map(key => coordMap[key]));
        n++;
    }
    return newValue;
}

export default nextBiggerValue;
