
export function draw(){

    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");

    const side = 6;
    const size = 80;
    const delta = size/2;

    const gridX = 18;
    const gridY = 10;

    let txt = `Voici une grille de ${gridX} de large sur ${gridY} de haut composé d'hexagones faisant ${size} de diamètre`;
    document.getElementById('content').textContent = txt;

    const rad = 60 * Math.PI / 180;
    const rad30 = 30 * Math.PI / 180;

    let moveX = Math.cos(rad30) * size;
    let moveY = Math.sin(rad30) * size;

    const hypot1 = Math.hypot( Math.sqrt(size/2), Math.sqrt(size/2 ) );
    const hypot2 = Math.hypot( Math.sqrt(size/2), Math.sqrt(hypot1/2 ) );

    let polyFirst = [];
    let polyOdd = [];
    let polyEven = [];
    let drawPolyEven;
    let drawPolyOdd;

    // Calculate the X & Y
    let coordinatesX = (rad) => Math.cos(rad) * (size/2) - (delta/2);
    let coordinatesY = (rad,line) => Math.sin(rad) * (size/2) + (size - hypot2 ) * line;


    // Y LOOP
    for( let t = 0 ; t < gridY ; t++ ){

        // Calcul First line Polygon (invisible)
        polyFirst = [];
        polyFirst.push([ coordinatesX(0), coordinatesY(0,t+1) ]);
        for( let u = 1 ; u <= side ; u++ ){
            polyFirst.push([ coordinatesX(rad * u), coordinatesY(rad * u,t+1) ]);
        }

        // X LOOP
        for( let i = 0 ; i < gridX ; i++ ){
            if( i % 2 === 0){
                // Draw EVEN polygon
                if( i === 0 ){
                    polyEven = polyFirst.map( p => [ p[0] + moveX - Math.round(hypot2) + 2, p[1] + moveY - Math.round(hypot2) + 2 ] );
                } else {
                    polyEven = polyOdd.map( p => [ p[0] + moveX - Math.round(hypot2) + 2, p[1] + moveY - Math.round(hypot2) + 2 ] );
                }
                drawPolyEven = `M ${polyEven.join(' L')} `;
                ctx.stroke( new Path2D(drawPolyEven) );
            } else {
                // Draw ODD polygon
                polyOdd = polyEven.map( p => [ p[0] + moveX - Math.round(hypot2) + 2, p[1] - moveY + Math.round(hypot2) - 2 ] );
                drawPolyOdd = `M ${polyOdd.join(' L')} `;
                ctx.stroke( new Path2D(drawPolyOdd) );
            }
        }
    }

}


export function draw2(){
    let radius = parseFloat(prompt('Quel rayon ?', 300))
    let nbEdge = parseInt(prompt('Combien de coté ?', 6))

    let polarTranslate = (p, angle, radius) => [
        p[0] + (radius * Math.cos(angle)),
        p[1] + (radius * Math.sin(angle))
    ]

    let center = [radius+50, radius+50]
    let angle = (2 * Math.PI) / nbEdge

    let path = new Path2D()
    let vertex = polarTranslate(center, 0, radius)
    path.moveTo(vertex[0], vertex[1])
    for (let i = 1; i <= nbEdge; i++) {
        vertex = polarTranslate(center, i * angle, radius)
        path.lineTo(vertex[0], vertex[1])
    }

    const canvas = document.getElementById('canvas')
    canvas.setAttribute('width', (radius*2)+100)
    canvas.setAttribute('height', (radius*2)+100)
    canvas.getContext('2d').stroke(path)
}