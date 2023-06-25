# How to Run

```sh
# Using Python
$> python3 -m http.server

# Using Node
$> npx http.server
```

# Links
- [Three.js multiple scenes.](https://threejs.org/manual/#en/multiple-scenes)
- [GLSL basics.](https://www.youtube.com/watch?v=oKbCaj1J6EI)
- [Book of Shaders.](https://thebookofshaders.com)

---
## Types of Shaders

### Vertex:
    - Vertex shaders communicate to the GPU where the triangles should be positioned.
    - Runs for each single vertex of a given triangle.

### Fragment:
    - Fragment shaders communicate to the GPU how to actually fill those triangles with color.
    - Runs for every single pixel within the triangle.

## Specificties:

### Variables:
- _attribute_: 
    - Data received from JS.
    - **Vertex specific**.
    - The Geometry generates it.
- _uniform_:
    - Value that is the same for all vertices.
    - Can be created on JS side.
    - Possible to use on Fragments. (material uniforms).
- _normals_:
    - Orientations (coordinates) of an object at certain point. 
    - **vec3**
- _UV_: 
    - Coordinates in 2D space to map textures onto objects.
    - **vec2**
- _varying_:
    - Send information from **vextex shader** to **fragment shader**.
    - **vec3**
- _flat varying_: 
    - flat disables interpolation of values.

#### Variables created by environment (at least of Three.js).
- _uniform mat4 viewMatrix_:
    - Transform (position, scale, rotation) of the camera.
- _uniform mat4 modelMatrix_: 
    - Transform (position, scale, rotation) of the model.
- _uniform mat4 projectionMatrix_:
    - Project the object onto the screen taking into account aspect ratio & perspective.
- _MVP_:
    - **MVP** - Model View Projection (Order matters)
    ```glsl
    // 1. MVP
    // Order matters
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0 )`;

    // 2. MVP
    vec4 modelViewPosition = modelViewMatrix * vec4( position, 1.0 );
    vec4 projectedPosition = projectionMatrix * modelViewPosition;
    gl_Position = projectedPosition;
    ```

### Swizzling:
- Swizzling roughtly means; iterations within multiple entries in a vector at once.

```glsl
// It does not need to be on the same order.
vec.xy = vec2(0.3, 0.5) // Implies in: x = 0.3, y = 0.5, z = 1.0
vec.zxy = vec3(0.3, 0.5, 0.1) // Implies in: x = 0.3, y = 0.1, z = 0.5
vec4(vec.xxx, 0.3) // Implies in: x = vec.x, y = vec.x, z = vec.x, w = 0.3

// It can be done with operations
// Works for all arithmetical operations.
vec3(1.0, 2.0, 4.0) *= vec(0.5) // Implies in: x = 0.5, y = 1.0, z = 2.0
vec3(1.0) -= vec2(1.0) // Implies in: x = .0, y = .0, z = 1.0
vec3(1.0) += vec2(0.2, 0.5) // Implies in: x = 1.2, y = 1.5, z = 1.0
```

### Commonly Used Functions:
- [equal:](https://thebookofshaders.com/glossary/?search=equal)
    - Boolean vector in which each element i is computed as x[i] == y[i].
- [min:](https://thebookofshaders.com/glossary/?search=min)
    - Return the lesser of two values.
- [max:](https://thebookofshaders.com/glossary/?search=max)
    - Return the maximum of two values.
- [abs:](https://thebookofshaders.com/glossary/?search=abs)
    - Return the absolute of a given value.
- [mod:](https://thebookofshaders.com/glossary/?search=mod)
    - Compute value of one parameter modulo another
- [sign:](https://thebookofshaders.com/glossary/?search=sign)
    - Returns -1.0 if x is less than 0.0, 0.0 if x is equal to 0.0, and +1.0 if x is greater than 0.0.
- [cos:](https://thebookofshaders.com/glossary/?search=cos)
    - Cossign of a given parameter.
- [atan:](https://thebookofshaders.com/glossary/?search=atan)
    - Return the arc-tangent of the parameters.
- [tan:](https://thebookofshaders.com/glossary/?search=tan)
    - Return the tangent of the parameters.
- [sqrt:](https://thebookofshaders.com/glossary/?search=sqrt)
    - Return the square root of the parameter.
- [dot:](https://thebookofshaders.com/glossary/?search=dot)
    - Addition of the product of vectors coordinates. E.g; `vec1.x * vec2.x + vec1.y * vec2.y`.
- [cross:](https://thebookofshaders.com/glossary/?search=cross)
    - Calculate the cross product of two vectors.
- [champ:](https://thebookofshaders.com/glossary/?search=champ)
    - Constrain a value to lie between two further values.
- [mix AKA lerp:](https://thebookofshaders.com/glossary/?search=mix)
    - Constrain a value to lie between two further values.
- [length:](https://thebookofshaders.com/glossary/?search=length)
    -  Give back the calculated size of a vector.
- [smoothstep:](https://thebookofshaders.com/glossary/?search=smoothstep)
    -  Same as step but keeps values in-between given bounds.
- [step:](https://thebookofshaders.com/glossary/?search=step)
    -  Create a bridge between two values where any value bigger than a threshold turns into 1, otherwise 0.
- [fract:](https://thebookofshaders.com/glossary/?search=fract)
    -  Give back the fractionary part of a number.
