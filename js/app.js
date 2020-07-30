// VARIABLE(S)
const map = document.getElementById('map');
const xGrid = '8';  // How many hexagon by row
const yGrid = '8';  // Hom many hexagon by column

// CREATE SVG ELEMENT (GRID)
let hex = createGrid(110,'none',2,'#000', xGrid, yGrid);

// APPEND SVG ELEMENT TO DOM
map.appendChild(hex);


/*
 * ==============================================
 *   CREATE GRID FUNCTION
 * ==============================================
 *
 *  hexSize      = Hexagon Size (px)
 *  fill         = SVG Attribute to color the hexagon
 *  strokeSize   = Border width of the hexagon
 *  xGrid        = number of hexagons to the X axe
 *  yGrid        = number of hexagons to the Y axe
 *
 */

function createGrid(hexSize, fill, strokeSize, strokeColor, xGrid, yGrid) {

    // VARIABLE(S)
    let xmlns = 'http://www.w3.org/2000/svg';

    // CREATE SVG
    let svgElement = document.createElementNS(xmlns, 'svg');
    svgElement.setAttribute('width', ( hexSize + strokeSize ) * ( xGrid - 1 ) + 'px' );
    svgElement.setAttribute('height', ( hexSize + strokeSize ) * yGrid + 'px' );

    // DEFINE FIRST COORDS
    const radian = 60 * Math.PI / 180;
    let points = [];

    let coordinatesX = (rad) => Math.cos(rad) * (hexSize / 2) + (hexSize / 2) + (strokeSize / 2);
    let coordinatesY = (rad) => Math.sin(rad) * (hexSize / 2) + (hexSize / 2) + (strokeSize / 2);

    points.push([ coordinatesX(0), coordinatesY(0) ]);

    //DRAW COL GRID
    for( let p = 0 ; p < yGrid ; p++){

        // DRAW ROW GRID
        for( let i = 0 ; i < xGrid ; i++ ){

            // VARIABLE(S)
            points = [];
            let gapY = i % 2 === 0 ? ( hexSize * .44 ) + ( ( hexSize * .86 ) * p ) :  ( hexSize * .86 ) * p;
            let gapX = ( hexSize * .75 ) * i;

            // DEFINE POINTS ARRAY
            for( let t = 0 ; t < 6 ; t++ ){
                points.push([ coordinatesX(radian * t ) + gapX, coordinatesY(radian * t ) + gapY ]);
            }

            // CREATE POLY
            let poly = document.createElementNS(xmlns, "polygon");
            poly.setAttribute('id', p + '-' + i);
            poly.setAttribute('fill', fill);
            poly.setAttribute('stroke', strokeColor);
            poly.setAttribute('stroke-width', strokeSize + 'px');
            poly.setAttribute('points', points.join(' '));

            // ADD POLY TO SVG ELEMENT
            svgElement.appendChild(poly);

        }

    }

    // RETURN SVG ELEMENT
    return svgElement;

}
