import * as THREE from 'three'
import { makeScene, useGui, useRenderer } from './init.js'


export default function scene() {
    const elem = document.getElementById('scene4');
    const sceneProps = makeScene(elem);
    const gui = useGui();
    const renderer = useRenderer();
    const { scene, camera, controls } = sceneProps;
    const { width, height } = elem.getBoundingClientRect();;


    // MESH
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 'red' });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // CAMERA POSITIONING
    camera.position.z = 2;
    camera.position.set(0, 1, 2);

    // LIGHT
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // GUI
    const cameraFolder = gui.addFolder(`[ ${elem.id.toUpperCase()} ] - Camera`)
    cameraFolder.add(camera.position, 'z', 0, 10)
    cameraFolder.open()

    return {
        elem,
        mesh,
        ...sceneProps,
        renderFn: (time) => {
            mesh.rotation.y = time * .1;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            controls.handleResize();
            controls.update();
            renderer.render(scene, camera);
        }
    }
}
