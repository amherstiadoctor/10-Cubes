class Geometry{

    constructor() {

        // vertex attributes
        this.indices = [] 
        this.vertices = []
        this.buffer = []

        // uniform attributes
        this.color = vec3.create() // assume available in scope
        this.color[0] = 1.0000 // red default
        this.modelMatrix = mat4.create()

        this.setGeometry()
    }
    generateUniqueVertices() {
	    this.vertices.push(
	        [0.0,   0.15,   -0.5],
	        [-0.15, -0.15, -0.5],
	        [0.15,  -0.15, -0.5]
	    )
	}

	generateIndices() {
    	this.indices.push(0, 1, 2)
	}

	setGeometry() {
	    this.generateUniqueVertices()
	    this.generateIndices()
	}
	setColor(color) {
	    // to preserve data type (vec3) of color,
	    // assign each element
	    this.color[0] = color[0]
	    this.color[1] = color[1]
	    this.color[2] = color[2]

	}

	setBuffer(type, value){
	    this.buffer[type] = value
	}

	// basic transformations derived from GL Matrix Library
	scale(x,y,z) {
	    mat4.scale(this.modelMatrix, this.modelMatrix, [x,y,z])
	}

	translate(x,y,z) {
	    mat4.translate(this.modelMatrix, this.modelMatrix, [x,y,z])
	}

	rotate(rad, axis) { // axis is a vec3
	    mat4.rotate(this.modelMatrix, this.modelMatrix, rad, axis)
	}

	rotateX(rad) {
	    mat4.rotateX(this.modelMatrix, this.modelMatrix, rad)
	}

	rotateY(rad) {
	    mat4.rotateY(this.modelMatrix, this.modelMatrix, rad)
	}

	rotateZ(rad) {
	    mat4.rotateZ(this.modelMatrix, this.modelMatrix, rad)
	}
}