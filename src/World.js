import { loadModels } from "./components/models/models.js";

import { createCamera } from "./components/camera.js";
import { createCube } from "./components/cube.js";
import { createScene } from "./components/scene.js";
import { createPointLights } from "./components/pointLights.js";
import { createAmbientLights } from "./components/ambientLights.js";

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
    this.state = {
      bgColor1: "#ffffff",
      bgColor2: "#353535"
    };

    camera = createCamera();
    scene = createScene();
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);

    const cube = createCube(0.1, -1.25, -1);
    const cubeTwo = createCube(2, 3.5, 0, 0);
    loop.updatables.push(cube);
    loop.updatables.push(cubeTwo);

    const lightPointA = createPointLights();
    const lightAmbientA = createAmbientLights();
    /*
    this.vignette = createBackground({
      aspect: camera.aspect,
      grainScale: 0.001, // mattdesl/three-vignette-background#1
      colors: [this.state.bgColor1, this.state.bgColor2]
    });
    this.vignette.name = "Vignette";
    this.vignette.renderOrder = -1;
    */
    scene.add(lightPointA, lightAmbientA, cube);

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
      "https://media.dmbk.io/fr-models/Segments-Materials-r1b.gltf"
    );
    scene.add(model);
  }
}

export { World };
