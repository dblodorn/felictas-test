
import { Interaction } from 'three.interaction';

import state from './state'

import { loadModels } from "./components/models/models.js";

import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createVignette } from "./components/vignette"


import { createPointLights } from "./components/lights/pointLights.js";
import { createAmbientLights } from "./components/lights/ambientLights.js";
import { createDirectionalLights } from "./components/lights/directionalLights.js";

import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

let camera;
let renderer;
let scene;
let loop;
let interaction;
let background;
class World {
  constructor(container) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    background = createVignette(container);
    loop = new Loop(camera, scene, renderer);
    
    interaction = new Interaction(renderer, scene, camera);
    container.append(renderer.domElement);
  
    const pointLight = createPointLights();
    const ambientLight = createAmbientLights();
    const directionalLight = createDirectionalLights();

    loop.updatables.push(background);

    camera.add( ambientLight, directionalLight, pointLight );
    scene.add( camera, background )
    const resizer = new Resizer(container, camera, renderer);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

  async init() {
    const modelA = await loadModels(
      "https://media.dmbk.io/fr-models/Segments-Materials-r2e.gltf"
    );
    const model = modelA.model
    
    // Position Camera to Model Size
    const size = modelA.size
    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();

    const center = modelA.center
    camera.position.copy(center);
    camera.position.x += size / 2.0;
    camera.position.y += size / 2.0;
    camera.position.z += size / 2.0;
    camera.lookAt(center);

    loop.updatables.push(model);
    scene.add(model);
    model.on('click', function(ev) { 
      state.clicks += 1 
      console.log(state.clicks)
    });
  }
}

export { World };
