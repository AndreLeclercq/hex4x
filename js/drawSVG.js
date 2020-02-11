export function grid(){

    console.log('Draw Grid Start');

    // VARIABLE(S)
    let map = document.getElementById('map');
    let xGrid = '5';


    let hex = createGrid(80,'none',2.5,'#000', xGrid);
    map.appendChild(hex);

}

function createGrid(hexSize, fill, strokeSize, strokeColor, xGrid) {

    // VARIABLE(S)
    let xmlns = 'http://www.w3.org/2000/svg';

    // CREATE SVG
    let svgElement = document.createElementNS(xmlns, 'svg');
    svgElement.setAttribute('width', (hexSize + strokeSize) + 'px' );
    svgElement.setAttribute('height', (hexSize + strokeSize) + 'px' );

    // DRAW ROW GRID
    for( let i = 0 ; i < xGrid ; i++ ){

        // DEFINE COORDS
        const rad = 60 * Math.PI / 180;
        let points = [];

        let coordinatesX = (rad) => Math.cos(rad) * (hexSize/2) + (hexSize/2) + (strokeSize/2);
        let coordinatesY = (rad) => Math.sin(rad) * (hexSize/2) + (hexSize/2) + (strokeSize/2);

        points.push([ coordinatesX(0), coordinatesY(0) ]);

        for( let i = 1 ; i <= 6 ; i++ ){
            points.push([ coordinatesX(rad * i), coordinatesY(rad * i) ]);
        }

        // CREATE POLY
        let poly = document.createElementNS(xmlns, "polygon");
        poly.setAttribute('fill', fill);
        poly.setAttribute('stroke', strokeColor);
        poly.setAttribute('stroke-width', strokeSize + 'px');
        poly.setAttribute('points', points.join(' '));
        svgElement.appendChild(poly);

    }



    // RETURN SVG
    return svgElement;

}