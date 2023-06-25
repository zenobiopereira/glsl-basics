const SCENE_1 = [
    './shaders/scene1/vertex.glsl',
    './shaders/scene1/fragment.glsl',
];

async function loadAsText(url) {
    return fetch(url).then(response => response.text());
}

async function loadShaders() {
    const [vertex, fragment] = await Promise.all(SCENE_1.map(loadAsText));
    return { shadersS1: { vertex, fragment } };
}

export default await loadShaders();
