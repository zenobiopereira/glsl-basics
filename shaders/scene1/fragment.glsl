// vec3 vec = vec3(1.0, 1.0, 1.0);
// Swizzling means, handle multiple values at once. (Doesn't need to be in the same order)
// E.g; vec.xy = vec2(0.3, 0.5) ==> vec3(0.3, 0.5, 1.0)
// E.g; vec.zxy = vec3(0.3, 0.5, 0.1) ==> vec3(0.5, 0.1, 0.3)
// E.g; vec4(vec.xxx, 0.3) ==> vec4(1.0, 1.0, 1.0, 0.3)

// vec3 vec = vec3(1.0, 1.0, 1.0);
// Matrix operations, apply the given operation to the given "coordinates".
// Works for all (?) arithmetical operations.
// E.g; vec -= vec2(1.0) ==> vec3(0.0, 0.0, 1.0)
// E.g; vec += vec2(0.2, 0.5)

// Some basic functions;
// (equal); Return a bvec3 (boolean vec3) in which the values are the result of comparison of 2 given vectors a.x != b.x and so on...
// min
// max
// abs
// mod
// sign
// cos
// atan
// tan
// sqrt
// dot : vec1.x * vec2.x + vec1.y * vec2.y.
// cross
// champ
// mix (lerp)
// length : Give back the calculated size of a vector.
// smoothstep : Same as step but keeps values in-between given bounds.
// step : Create a bridge between two values where any value bigger turns into the max bound of this function.
// fract : Give back the fractionary part of a number.

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
    
    //vec3 line = vec3(step(1.0 - abs(vUv.y - 0.5), 0.98));
    gl_FragColor = vec4(vec3(.5), 1.0);
}
