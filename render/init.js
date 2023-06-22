import * as THREE from "three"
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"

let renderer, gui

export function makeScene(elem) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x181818 );

    const ctx = document.createElement("canvas").getContext("2d");
    elem.appendChild(ctx.canvas);

    // DEBUG
    // ctx.canvas.id = `${elem.id}`;

    const { width, height } = elem.getBoundingClientRect();

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    const fov = 75;
    const renderAspectRatio = width / height
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, renderAspectRatio, near, far);
    camera.position.set(0, 0, 2);

    scene.add(camera);

    const target = new THREE.WebGLRenderTarget(width, height, {
        samples: 8,
    })

    const composer = new EffectComposer(renderer, target)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)
    composer.setSize(width, height)

    // CONTROLS
    const controls = new TrackballControls(camera, elem)
    controls.noZoom = true
    controls.noPan = true

    return { scene, camera, ctx, controls, composer };
}

export const initRenderer = async () => {
    const canvas = document.createElement("canvas")
    renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });
    renderer.setScissorTest(true);

    // SHADOW
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // GUI
    gui = new GUI();
}

export const useRenderer = () => renderer
export const useGui = () => gui
