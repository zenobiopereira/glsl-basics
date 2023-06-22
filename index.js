import { initRenderer, useRenderer } from './render/init.js'

import scene1 from './render/scene1.js'
// import scene2 from './render/test.js'
import scene4 from './render/scene4.js'

function renderScenes(scenes) {
    return function render(time) {
        time *= 0.001;

        for (let scene of scenes) {
            // get the viewport relative position of this element.
            const { elem, ctx, renderFn } = scene;
            const renderer = useRenderer();
            const rect = elem.getBoundingClientRect();
            const { width, height } = rect;
            const rendererCanvas = renderer.domElement;

            // make sure the renderer's canvas is big enough.
            if (rendererCanvas.width < width || rendererCanvas.height < height) {
                renderer.setSize(width, height, false);
            }

            // make sure the canvas for this area is the same size as the area.
            // Lack of defined width/height on the elem, can cause weird behavior.
            if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
                ctx.canvas.width = width;
                ctx.canvas.height = height;
            }

            renderer.setScissor(0, 0, width, height);
            renderer.setViewport(0, 0, width, height);

            renderFn(time, rect);

            // copy the rendered scene to this element's canvas
            ctx.globalCompositeOperation = 'copy';
            ctx.drawImage(
                rendererCanvas,
                0, rendererCanvas.height - height, width, height,  // src rect
                0, 0, width, height);                              // dst rect
        }

        requestAnimationFrame(render);
    }
}

(async () => {
    await initRenderer();

    const render = renderScenes([
        scene1(),
        scene4(),
    ]);

    requestAnimationFrame(render);
})()

