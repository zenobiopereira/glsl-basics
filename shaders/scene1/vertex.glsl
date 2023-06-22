// attribute; a given data received from JS, Vertex specific. The Geometry generates it. (geomery.attributes).
// uniform; A value that is the same for all vertices, can be created on JS side, also possible to use on Fragments. (material uniforms).
// normals vec3; For each vertex orientations (coordinates) of an object at certain point.
// UV vec2; Coordinates in 2D space to map textures onto objects.
// varying vec3 vPosition; Send information from vextex shader to fragment shader.
// E.g; vPosition = position;
// flat varying vec3 vPosition; flat disables interpolation of values.

// uniform mat4 viewMatrix; // Transform (position, scale, rotation) of the camera.
// uniform mat4 modelMatrix; // Transform (position, scale, rotation) of the model.
// uniform mat4 projectionMatrix; Project the object onto the screen taking into account aspect ratio & perspective.


varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vPosition = position;
    vUv = uv;

    // MVP - Model View Projection (Order matters)
    // projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 ); Order matters.
    vec4 modelViewPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
    gl_Position = projectedPosition;
}
