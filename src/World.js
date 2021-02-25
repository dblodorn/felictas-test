
import { Interaction } from 'three.interaction';
import {
  Group,
  Object3D
} from 'three'


import state from './state'

import { loadModels } from "./components/models/models.js";

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
    const modelA = await loadModels(
      "https://media.dmbk.io/fr-models/fr-slices/Felicitas_Slice1_r2b.gltf",
      0,
      0,
      0
    );
    const sliceA = modelA.model

    const modelB = await loadModels(
      "https://media.dmbk.io/fr-models/fr-slices/Felicitas_Slice2_r2b.gltf",
      0,
      0,
      0
    );
    const sliceB = modelB.model
    
    const modelC = await loadModels(
      "https://media.dmbk.io/fr-models/fr-slices/Felicitas_Slice3_r2b.gltf",
      0,
      0,
      0
    );
    const sliceC = modelC.model

    const modelD = await loadModels(
      "https://media.dmbk.io/fr-models/fr-slices/Felicitas_Slice4_r2b.gltf",
      0,
      0,
      0
    );
    const sliceD = modelD.model

    const modelE = await loadModels(
      "https://media.dmbk.io/fr-models/fr-slices/Felicitas_Slice5_r2b.gltf",
      0,
      0,
      0
    );
    const sliceE = modelE.model

    const modelF = await loadModels(
      "https://media.dmbk.io/fr-models/fr-slices/Felicitas_Slice6_r2b.gltf",
      0,
      0,
      0,
    );
    const sliceF = modelF.model
  
    const ball = new Object3D();
    console.log(ball.children)
    
    ball.add(sliceA)
    ball.add(sliceB)
    ball.add(sliceC)
    ball.add(sliceD)
    ball.add(sliceE)
    ball.add(sliceF)

    scene.add(ball);


    sliceA.on('click', function(e) { 
      // state.clicks += 1
      console.log('SLICE A')
    });
    sliceB.on('click', function(e) { 
      // state.clicks += 1
      console.log('SLICE B')
    });
    sliceC.on('click', function(e) { 
      // state.clicks += 1
      console.log('SLICE C')
    });
    
    // Position Camera to GROUP Size

    // const size = ball.size
    // console.log(size)
    /*
    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();
    */
    // const center = ball.center
    /*
    camera.position.copy(center);
    camera.position.x += size / 2.0;
    camera.position.y += size / 2.0;
    camera.position.z += size / 2.0;
    camera.lookAt(center);
    */

    // environment = await createEnvironment(renderer);
    // scene.environment = environment
    // scene.background = environment
  }
}

export { World };
