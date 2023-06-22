import * as THREE from 'three'
import { useGui, makeScene, useRenderer } from './init.js'
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js'
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js'

import shaders from 'shaders'

export default function scene() {
    const gui = useGui();
    const { shadersS1 } = shaders;
    const elem = document.getElementById('scene1');
    const sceneProps = makeScene(elem);
    const { scene, composer, camera, controls } = sceneProps

    const { width, height } = elem.getBoundingClientRect();

    // SETTINGS
    const MOTION_BLUR_AMOUNT = 0.725

    // LIGHTING
    const dirLight = new THREE.DirectionalLight('#ffffff', 0.75)
    dirLight.position.set(5, 5, 5)

    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
    scene.add(dirLight, ambientLight)

    // MESHES
    const geometry = new THREE.IcosahedronGeometry(1, 5)
    const material = new THREE.ShaderMaterial({
        vertexShader: shadersS1.vertex,
        fragmentShader: shadersS1.fragment,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // GUI
    const cameraFolder = gui.addFolder(`[ ${elem.id.toUpperCase()} ] - Camera`)
    cameraFolder.add(camera.position, 'z', 0, 10)
    cameraFolder.open()

    // POSTPROCESSING
    const renderTargetParameters = {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        stencilBuffer: false,
    }

    // SAVE PASS
    const savePass = new SavePass(
        new THREE.WebGLRenderTarget(width, height, renderTargetParameters)
    );

    // BLEND PASS
    const blendPass = new ShaderPass(BlendShader, 'tDiffuse1');
    blendPass.uniforms['tDiffuse2'].value = savePass.renderTarget.texture;
    blendPass.uniforms['mixRatio'].value = MOTION_BLUR_AMOUNT;

    // OUTPUT PASS
    const outputPass = new ShaderPass(CopyShader);
    outputPass.renderToScreen = true;

    // PASSES TO COMPOSER
    [blendPass, savePass, outputPass].forEach(pass => composer.addPass(pass));

    return {
        elem,
        mesh,
        ...sceneProps,
        renderFn: (time) => {
            const renderer = useRenderer();

            mesh.rotation.y = time * .5;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            controls.handleResize();
            controls.update();
            renderer.render(scene, camera);
        }
    }
}
