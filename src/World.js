
import { Interaction } from 'three.interaction';
import {
  Group,
  Object3D,
  Box3,
  Vector3
} from 'three'


import state from './state'

import { loadModels } from "./components/models/models.js";

import loadSlices from "./components/models/slices.js";

import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createVignette } from "./components/vignette"
import { createEnvironment } from "./components/createEnvironment"

import { createPointLights } from "./components/lights/pointLights.js";
import { createAmbientLights } from "./components/lights/ambientLights.js";
import { createDirectionalLights } from "./components/lights/directionalLights.js";
import { createHemisphereLights } from "./components/lights/hemisphereLights.js";

import { createRenderer } from "./systems/renderer.js";
import { Resizer } from "./systems/Resizer.js";
import { Loop } from "./systems/Loop.js";

let camera;
let renderer;
let scene;
let loop;
let interaction;
let background;
let environment;
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
    const hemisphereLight = createHemisphereLights();

    loop.updatables.push(background);

    camera.add( ambientLight, directionalLight, pointLight );
    scene.add( camera, background, hemisphereLight )
    
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
    const {
      slice1,
      slice2,
      slice3,
      slice4,
      slice5,
      slice6
    } = await loadSlices();
    console.log('loaded')

    const ball = new Object3D();

    slice1.position.z = -50

    slice3.position.z = 25
    slice3.position.x = -30

    ball.add(slice1)
    ball.add(slice2)
    ball.add(slice3)
    ball.add(slice4)
    ball.add(slice5)
    ball.add(slice6)

    const box = new Box3().setFromObject(ball);
    const size = box.getSize(new Vector3()).length();
    const center = box.getCenter();
    console.log(center)
    ball.translateZ(0)
    ball.translateY((size / 4) * -1)
    scene.add(ball);

    // INTERACTION
    slice1.on('click', function(e) { state.clicks = "Slice1" });
    slice2.on('click', function(e) { state.clicks = "Slice2" });
    slice3.on('click', function(e) { state.clicks = "Slice3" });
    slice4.on('click', function(e) { state.clicks = "Slice4" });
    slice5.on('click', function(e) { state.clicks = "Slice5" });
    slice6.on('click', function(e) { state.clicks = "Slice6" });
    
    // Position Camera to GROUP Size


    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();

    camera.position.copy(center);
    camera.position.x += size / 2.0;
    camera.position.y += size / 2.0;
    camera.position.z += size / 2.0;
    camera.lookAt(center);

    // environment = await createEnvironment(renderer);
    // scene.environment = environment
    // scene.background = environment
  }
}

export { World };
