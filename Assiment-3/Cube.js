/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Cube(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Cube-vertex-shader";
    fragmentShader ||= "Cube-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
    let positions = [
        0.0, 0.0, 0.0, // Vertex 0
        1.0, 0.0, 0.0,  // Vertex 1
        1.0, 1.0, 0.0, // Vertex 2
        0.0, 1.0, 0.0, // Vertex 3
        0.0, 0.0, 1.0, //vertex4
        1.0, 0.0, 1.0, //vertex5
        1.0, 1.0, 1.0, //vertex 6
        0.0, 1.0, 1.0, //vertex 7
    ];

    let indices = [
        6, 7, 4, //front
        4, 5, 6, //front
        5, 1, 2, //right
        2, 6, 5,  //right
        1, 0, 2, //back
        2, 0, 3, //back
        4, 7, 3, //left
        3, 0, 4, //left
        2, 3, 7, //top
        7, 6, 2,  //top
        4, 0, 1, //bottom
        1, 5, 4 //bottom




    ];

    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
        "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();

    };
};