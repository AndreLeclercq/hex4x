export function grid(){

    console.log('Draw Grid Start');

    // VARIABLE(S)
    let map = document.getElementById('map');
    let xGrid = '5';

    // DRAW ROW GRID
    for( let i = 0 ; i < xGrid ; i++ ){
        let hex = createHex(80,'none',2.5,'#000');
        map.appendChild(hex);
    }

}

function createHex(size, fill, strokeSize, strokeColor) {

    // VARIABLE(S)
    let xmlns = 'http://www.w3.org/2000/svg';

    // CREATE SVG
    let svgElement = document.createElementNS(xmlns, 'svg');
    svgElement.setAttributeNS(null,'width', (size + strokeSize) + 'px' );
    svgElement.setAttributeNS(null,'height', (size + strokeSize) + 'px' );

    // DEFINE COORDS
    const rad = 60 * Math.PI / 180;
    let points = [];

    let coordinatesX = (rad) => Math.cos(rad) * (size/2) + (size/2) + (strokeSize/2);
    let coordinatesY = (rad) => Math.sin(rad) * (size/2) + (size/2) + (strokeSize/2);

    points.push([ coordinatesX(0), coordinatesY(0) ]);
    for( let i = 1 ; i <= 6 ; i++ ){
        points.push([ coordinatesX(rad * i), coordinatesY(rad * i) ]);
    }

    // CREATE POLY
    let poly = document.createElementNS(xmlns, "polygon");
    poly.setAttributeNS(null, 'fill', fill);
    poly.setAttributeNS(null, 'stroke', strokeColor);
    poly.setAttributeNS(null, 'stroke-width', strokeSize + 'px');
    poly.setAttributeNS(null, 'points', points.join(' '));
    svgElement.appendChild(poly);

    // RETURN SVG
    return svgElement;

}