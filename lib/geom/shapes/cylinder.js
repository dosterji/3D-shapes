/**
 * Generates TriangleMesh vertex data for a cone of a given side length,
 * centered at the origin.
 * 
 * @param {Number} rad the radius of the cone
 * @param {Number} n the number of points to use to draw the circle. 
 *                      does not include center of either circle.
 * @param {Number} length the length of the cone
 */
var generateCylinderData = function(rad = 0.5, n = 30, length = 1.0) {

    var v = [];

    var angle_inc = (2*Math.PI)/n;
    let angle = 0;

    for(let i=0; i<n; i++) {
        z = rad*Math.cos(angle);    //find the y-coord
        x = rad*Math.sin(angle);    //find the x-coord
        y = 0;
        v.push(x, y, z);
        v.push(x, length, z);
        angle += angle_inc;         //increment the angle
    }
    v.push(0, 0, 0);                //push the bottom
    v.push(0, length, 0);           //push the top

    var norm = [];
    norm.push(0, 0, 0);
    norm.push(0, 0, 0);
    for(let i=0; i<2*n; i++) {
        norm.push(0, 0, 0);
    }

    var el = [];
    for(let i=0; i<2*n; i+=2) {
        let coord2 = i+1;
        if(coord2==0) 
            coord2=1;
        el.push(2*n, (coord2+1)%(2*n), i);      //coords for base1
        el.push(i+1, (coord2+2)%(2*n) , 2*n+1);      //coords for base2
        //for side
        el.push(coord2, i, (coord2+1)%(2*n));
        el.push((coord2+1)%(2*n), (coord2+2)%(2*n), i+1);
    }

    return {
        index: el,
        normal: norm,
        position: v,
    };
};