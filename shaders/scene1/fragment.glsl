uniform float uRadius;

varying vec3 vPosition; // Value provided by Three.js
varying vec3 vNormal; // Value provided by Three.js
varying vec2 vUv; // Value provided by Three.js

void main() {
    // Line:
    // vec4(vUv, 0.0, 1.0); // Will have a gradient from [0,0] -> black to [1,1] -> Yellow
    // vec4(vec3(vUv.y), 1.0); // Gradient from bottom black [0,0] to top white [1,1].
    // vec4(vec3(abs(vUv.y - 0.5)), 1.0); // Gradient from bottom black [0,0] to top white [1,1].
    // vec4(vec3(vUv.y - 0.5), 1.0); // Whole coordinates will have 0.5 reduced, bottom [-.5, -.5], top [.5, .5]
    // vec4(vec3(abs(vUv.y - 0.5)), 1.0); // Transforming negative coordinates in positive.
    // vec4(vec3(step(1.0 - abs(vUv.y - 0.5), 0.99)), 1.0); // Making a step interval which will only be 0 when the vUv it's mostly in the middle. E.g; 1.0 - 0 -> 1 > .99 ? 0 : 1;
    
    vec3 line = vec3(step(1.0 - abs(vUv.y - 0.5), 0.98));
    gl_FragColor = vec4(line, 1.0);
}
