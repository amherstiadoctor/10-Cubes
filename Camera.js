class Camera{

    constructor (){
        // camera defaults
        this.position = [0,0,1] // center
        this.lookAtPoint = [0,0,-1] // negative z axis
        this.upVector = [0,1,0] // positive y axis

        // projection defaults        
        this.fieldOfView = Math.PI/4; // 45 deg in radians
        this.aspectRatio = 1; 
        this.near = 1
        this.far = 1000;

        this.updateView()
        this.updateProjection()
    }

    updateView() {
        this.viewMatrix = mat4.create()
        mat4.lookAt(
            this.viewMatrix,
            this.position,
            this.lookAtPoint,
            this.upVector
        )
    }

    updateProjection() {

        this.projMatrix = mat4.create()
        
        // @todo: customize if needed
        mat4.perspective(
            this.projMatrix, 
            this.fieldOfView, 
            this.aspectRatio, 
            this.near, 
            this.far
        );
    }

    // modifier methods for projection
    setFOV(fov) {
        this.fieldOfView = fov
        updateProjection()
    }

    setAspectRatio(ar) {
        this.aspectRatio = ar
        updateProjection()
    }

    setNearPlane(n) {
        this.near = n
    }

    setFarPlane(f) {
        this.far = f
    }

    // modifier methods for view
    // @challenge: use matrix ops e.g. translate, rotate to implement ff:
    lookAt(x,y,z) { // set look at point
        this.lookAtPoint = [x,y,z]
        this.updateView() // apply changes
    }

    tilt(x,y,z) { // set up vector
        this.upVector = [x,y,z]
        this.updateView()
    }

    move(x,y,z) { // set position
        this.position = [x,y,z]
        this.updateView()
    }
}