import state from './state'

import { loadModels } from "./components/models/models.js";

import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";

import { createPointLights } from "./components/lights/pointLights.js";
import { createAmbientLights } from "./components/lights/ambientLights.js";
import { createDirectionalLights } from "./components/lights/directionalLights.js";

import { createBackground } from "./lib/three-vignette.js";

import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

let camera;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    console.log(state)
    
    camera = createCamera();
    scene = createScene();
    renderer = createRenderer(container);
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const pointLight = createPointLights();
    const ambientLight = createAmbientLights();
    const directionalLight = createDirectionalLights();
    /*
    this.vignette = createBackground({
      aspect: camera.aspect,
      grainScale: 0.001, // mattdesl/three-vignette-background#1
      colors: [this.state.bgColor1, this.state.bgColor2]
    });
    this.vignette.name = "Vignette";
    this.vignette.renderOrder = -1;
    */
    camera.add( ambientLight, directionalLight, pointLight );
    scene.add( camera )
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
    const { model } = await loadModels(
      "https://media.dmbk.io/fr-models/Segments-Materials-r1b-1.gltf"
    );
    loop.updatables.push(model);
    scene.add(model);
  }
}

export { World };
