"use strict";
/*
	author: ceposerio@up.edu.ph
	description: a sample main webgl function for CMSC161

*/

// glMatrix shortcuts
let {glMatrix : glm, mat4, vec3} = glMatrix; // @note: vec3 is added
// see Assigning to new variable names after destructuring in
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// use objects glm and mat4 as is
function main() {
	let scene = new Scene()
    let camera = new Camera()
	var objectsToDraw = []
	var objects = []

	function random(min, max) {
	  if (max === undefined) {
	    max = min;
	    min = 0;
	  }
	  return Math.random() * (max - min) + min;
	}

    scene.setCamera(camera)
    for(var i = 0; i < 10; i++){
    	let cube = new Cube(random(0.5,1))
    	cube.setColor([random(0,1),random(0,1),random(0,1)])

    	objects.push(cube)
    }

    for(var j = 0; j < 10; j++){
    	scene.addItem(objects[j])
    }
    
    camera.move(10,10,10)

    scene.clear()
    scene.draw()

    // this function is declared inside `main()``
    function animate(){
        // manipulate objects in the scene
        const angleOfRotation = glm.toRadian(1) // rotate 1 degree per animation frame

        // since this function is inside main, cube and other objects in main are accessible
        for(var i = 0; i < 10; i++){
        	objects[i].rotateY(angleOfRotation)
        }

        // no need to update angleOfRotation, since rotateY will update the cube's modelMatrix

        // redraw
        scene.clear()
        scene.draw()

        // recursive call
        requestAnimFrame(animate)
    }

    // call to start animation
    animate()

}
