const dimentionAtLayer = n => n * 2 + 1;

const numberOfSquaresAtLayer = n => {
    if (n === 0) return 1;
    return dimentionAtLayer(n - 1) * 4 + 4;
}

// Note: Array(n).fill().map((e,i) => i + 1) creates an array from 0 to n. [0, 1, 2, 3 ... n]. 
// Here 0 is special case, map and reduce will not be called, hence we need to add 1 for the no. of squares at layer 0

const totalSquaresWithinLayer = n => Array(n).fill().map((e,i) => i + 1).reduce((acc, current) => acc + numberOfSquaresAtLayer(current), 0) + 1;
const findLayerForNumber = n => {
    if (n === 1) return 0;
    let layer = 0;
    for (var i = 0; totalSquaresWithinLayer(i) < n; i++) {
        layer = i;
    }
    return layer + 1;
}

const closestPointsOnLayer = n => {
    if (n === 0) return 1;
    const sumTillInnerLayer = totalSquaresWithinLayer(n - 1);
    const dimentionOfCurrentLayer = dimentionAtLayer(n);
    const firstPoint = sumTillInnerLayer + (dimentionOfCurrentLayer + 1) / 2 - 1;
    return [1, 2, 3, 4].map(num => firstPoint + num * numberOfSquaresAtLayer(n) / 4);
}

function solvePartOne(target) {
    const layerOfTarget = findLayerForNumber(target);
    const stepsOnLayer = Math.min(...closestPointsOnLayer(layerOfTarget).map(n => Math.abs(n - target)));
    const totalSteps = stepsOnLayer + layerOfTarget;
    console.log(`Dimention at layer where ${target} is present is of size ${dimentionAtLayer(layerOfTarget)}, at layer ${layerOfTarget}`);
    console.log(`At layer ${layerOfTarget}, closest points perpendicular to starting location are: ${closestPointsOnLayer(layerOfTarget)}`);
    console.log(`Data need to move along the current layer ${stepsOnLayer} steps, then move directly to starting point ${layerOfTarget} steps.`);
    console.log(`In total, data need to move ${totalSteps} steps.`);
}

solvePartOne(325489);