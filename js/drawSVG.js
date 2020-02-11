export function grid(){

    console.log('Draw Grid Start');

    // VARIABLE(S)
    let map = document.getElementById('map');
    let xGrid = '5';
    let yGrid = '2';


    let hex = createGrid(120,'none',2.5,'#000', xGrid, yGrid);
    map.appendChild(hex);

}

function createGrid(hexSize, fill, strokeSize, strokeColor, xGrid, yGrid) {

    // VARIABLE(S)
    let xmlns = 'http://www.w3.org/2000/svg';

    // CREATE SVG
    let svgElement = document.createElementNS(xmlns, 'svg');
    svgElement.setAttribute('width', ( hexSize + strokeSize ) * xGrid + 'px' );
    svgElement.setAttribute('height', ( hexSize + strokeSize ) * yGrid + 'px' );

    // DEFINE FIRST COORDS
    const radian = 60 * Math.PI / 180;
    let points = [];

    let coordinatesX = (rad) => Math.cos(rad) * (hexSize / 2) + (hexSize / 2) + (strokeSize / 2);
    let coordinatesY = (rad) => Math.sin(rad) * (hexSize / 2) + (hexSize / 2) + (strokeSize / 2);

    points.push([ coordinatesX(0), coordinatesY(0) ]);
    console.log(points);

    //DRAW COL GRID
    for( let p = 0 ; p < yGrid ; p++){


        // DRAW ROW GRID
        for( let i = 0 ; i < xGrid ; i++ ){

            // Variables
            points = [];
            let gapY = i % 2 === 0 ? ( hexSize * .45 ) + ( hexSize * p ) :  hexSize * p;
            let gapX = ( hexSize * .75 ) * i;

            for( let t = 0 ; t < 6 ; t++ ){
                points.push([ coordinatesX(radian * t ) + gapX, coordinatesY(radian * t ) + gapY ]);
            }

            // CREATE POLY
            let poly = document.createElementNS(xmlns, "polygon");
            poly.setAttribute('id', i + '-' + p);
            poly.setAttribute('fill', fill);
            poly.setAttribute('stroke', strokeColor);
            poly.setAttribute('stroke-width', strokeSize + 'px');
            poly.setAttribute('points', points.join(' '));
            svgElement.appendChild(poly);

        }

    }

    // RETURN SVG
    return svgElement;

}