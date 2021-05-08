class Cube extends Geometry {
	constructor(size){
        // call super if created a new constructor
        super() // super is the parent's constructor

        this.size = size

        // customizations/additions for cube
        this.scale(this.size, this.size, this.size)
        /* "unit" cube is uniformly scaled to apply size */
    }

    // override generateUniqueVertices
    generateUniqueVertices() {
        this.vertices.push(
            [-1.0, -1.0,  1.0], // 0
            [-1.0,  1.0,  1.0], // 1
            [ 1.0,  1.0,  1.0], // 2
            [ 1.0, -1.0,  1.0], // 3
            [-1.0, -1.0, -1.0], // 4
            [-1.0,  1.0, -1.0], // 5
            [ 1.0,  1.0, -1.0], // 6
            [ 1.0, -1.0, -1.0], // 7
        )
    }

    // override generateIndices
    generateIndices() {
        let self = this

        // you can create functions inside method
        function quad(a,b,c,d) {
            let triangleIndices = [a,b,c,a,c,d]
            self.indices.push(...triangleIndices)
        }

        quad(1,0,3,2); // front
        quad(2,3,7,6); // right
        quad(3,0,4,7); // bottom
        quad(6,5,1,2); // top
        quad(4,5,6,7); // back
        quad(5,4,0,1); // left
    }
}