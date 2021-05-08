class Scene{
        
    // modify constructor to have parameters for initializeGL
    constructor(canvasId = "master"
            , vertexShaderId = "vertex-shader"
            , fragmentShaderId = "fragment-shader"){
        // parameters are initialized to indicate default values

        this.items = []
        
        this.camera = undefined

        // other related fields
        this.matrices = {}
        this.matrices['view'] = mat4.create()
        this.matrices['projection'] = mat4.create()


        this.initializeGL(canvasId, vertexShaderId,fragmentShaderId)
        this.initializePointers()
    }

    initializeGL(canvasId, vertexShaderId, fragmentShaderId) {
        
        this.canvas = document.getElementById(canvasId)
        // this.canvas.width = document.documentElement.clientWidth
        // this.canvas.height = document.documentElement.clientHeight

        this.gl = initWebGL(this.canvas, true);

        this.program = createProgram(this.gl, vertexShaderId, fragmentShaderId)

        this.gl.useProgram(this.program)

        // add other GL related initialization below

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)

        this.gl.enable(this.gl.DEPTH_TEST)

    }

    initializePointers(variables = [
        "a_position",
        "u_model",
        "u_proj",
        "u_view",
        "u_color",
    ]){
    
	    // remember the global `pointers` map?
	    this.pointers = {};

	    // keep a copy of var names in case we need it later
	    this.shaderVariables = variables.slice() // clone

	    this.shaderVariables.forEach(variable => {
	        switch (variable[0]) {
	            case "a": // assume attributes are prefixed with "a_"
	                this.pointers[variable] = this.gl.getAttribLocation(this.program, variable)
	                // it is assumed the attributes are coming from an array.
	                this.gl.enableVertexAttribArray(this.pointers[variable])
	                break
	            case "u": // assume uniforms are prefixed with "u_"
	                this.pointers[variable] = this.gl.getUniformLocation(this.program, variable)
	                break;
	        }
	    })
	}

	setCamera(cam) {
    	this.camera = cam
	}

	clear() {
	    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
	}


	addItem(geometry) {
	    this.items.push(geometry)
	}

	draw() {

	    this.items.forEach(item => {

	        this.drawItem(item)

	    })
	}

	drawItem(item) {
	    // step 1: set shader variables

	    // 1.a: uniform matrices from the camera to the scene
	    this.gl.uniformMatrix4fv(
	        this.pointers['u_view'],
	        false,
	        this.camera.viewMatrix
	    )

	    this.gl.uniformMatrix4fv(
	        this.pointers['u_proj'],
	        false,
	        this.camera.projMatrix
	    )

	    // 1.b: uniform matrices unique to the item
	    this.gl.uniformMatrix4fv(
	        this.pointers['u_model'],
	        false,
	        item.modelMatrix
	    )
	    
	    // 1.c: vertex attributes of the item

	    // 1.c.1: check if vertex buffer is created
	    this.checkItemBuffer(item, "vertices", this.gl.ARRAY_BUFFER, Float32Array)
	    // 1.c.2: check if index buffer is created
	    this.checkItemBuffer(item, "indices", this.gl.ELEMENT_ARRAY_BUFFER, Uint16Array)

	    // 1.d: vectors e.g. color
	    this.gl.uniform3fv(this.pointers['u_color'], item.color)

	    // 1.e: activate buffers of item
	    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, item.buffer["vertices"])
	    this.gl.vertexAttribPointer(this.pointers["a_position"], 3, this.gl.FLOAT, false, 0, 0)
	    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, item.buffer["indices"])

	    // step 2: call draw
	    this.gl.drawElements(this.gl.TRIANGLES, item.indices.length, this.gl.UNSIGNED_SHORT, 0)
	}

	checkItemBuffer(item, name, bindpoint, datatype) {
	    if(!item.buffer[name]) {
	        item.buffer[name] = this.gl.createBuffer()
	        this.gl.bindBuffer(bindpoint, item.buffer[name])
	        this.gl.bufferData(
	            bindpoint,
	            new datatype(item[name].flat()),
	            this.gl.STATIC_DRAW
	        )

	        // unbind after
	        this.gl.bindBuffer(bindpoint, null)
	    }
	}

}