
export function draw(){

    let c = document.getElementById("canvas");
    let ctx = c.getContext("2d");

    const side = 6;
    const size = 100;
    const delta = size/2;

    const rad = 60 * Math.PI / 180;
    const rad30 = 30 * Math.PI / 180;

    const mx = Math.cos(rad30) * size;
    const my = Math.sin(rad30) * size;

    const hypot1 = Math.hypot(Math.sqrt(size/2), Math.sqrt(size/2));
    const hypot2 = Math.hypot( Math.sqrt(size/2), Math.sqrt(hypot1/2) );

    let poly = [];

    let xa = Math.cos(0) * (size/2) + delta;
    let ya = Math.sin(0) * (size/2) + delta;

    poly.push([ xa, ya ]);

    for( let i = 1 ; i <= side ; i++ ){
        let nRad = rad * i;
        let xa = Math.cos(nRad) * (size/2) + delta;
        let ya = Math.sin(nRad) * (size/2) + delta;
        poly.push([ xa, ya ]);
    }

    let poly2 = poly.map( p => [ p[0] + mx - Math.round(hypot2) + 2, p[1] + my - Math.round(hypot2) + 2 ] );

    let drawPoly = `M ${poly.join(' L')} `;
    ctx.stroke( new Path2D(drawPoly) );

    let newPoly = `M ${poly2.join(' L')} `;
    ctx.stroke( new Path2D(newPoly) );

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