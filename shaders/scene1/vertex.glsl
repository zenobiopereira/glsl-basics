varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vPosition = position;
    vUv = uv;

    vec4 modelViewPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
    gl_Position = projectedPosition;
}
