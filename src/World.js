
import { InteractionManager } from "three.interactive";
import { Box3, Vector3 } from 'three'
import gsap from 'gsap';

import state from './state'
import createBall from "./components/models/createBall";
import createCube from "./components/createCube"

import { createCamera } from "./components/camera";
import { createScene } from "./components/scene";
import { createVignette } from "./components/vignette"

import { createPointLights } from "./components/lights/pointLights";
import { createAmbientLights } from "./components/lights/ambientLights";
import { createDirectionalLights } from "./components/lights/directionalLights";
import { createHemisphereLights } from "./components/lights/hemisphereLights";

import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { Loop } from "./systems/Loop";

let camera;
let renderer;
let scene;
let loop;
let background;
let interactionManager;
class World {
  constructor(container) {
    camera = createCamera(container);
    scene = createScene();
    renderer = createRenderer(container);
    background = createVignette(container);
    loop = new Loop(camera, scene, renderer);
    interactionManager = new InteractionManager(
      renderer,
      camera,
      renderer.domElement
    );

    container.append(renderer.domElement);
  
    const pointLight = createPointLights();
    const ambientLight = createAmbientLights();
    const directionalLight = createDirectionalLights();
    const hemisphereLight = createHemisphereLights();

    loop.updatables.push(background);

    camera.add( ambientLight, directionalLight, pointLight );
    

    // CUBES
    const cubes = {
      cube1: createCube({x: 0, y: 10, z: 10.01, color: 'blue', speed: 0.01, name: 'Scene 1'}),
      cube2: createCube({x: 16, y: -30, z: -6, color: 'purple', speed: 0.005, name: 'Scene 2'}),
      cube3: createCube({x: 32, y: -40, z: 3, color: 'yellow', speed: 0.02, name: 'Scene 3'}),
      cube4: createCube({x: 48, y: 5, z: 1, color: 'green', speed: 0.015, name: 'Scene 4'}),
      cube5: createCube({x: 64, y: 2, z: -2, color: 'red', speed: 0.009, name: 'Scene 5'}),
      cube6: createCube({x: 80, y: 0, z: 0.01, color: 'orange', speed: 0.003, name: 'Scene 6'}),
    }

    loop.updatables.push(cubes.cube1)
    loop.updatables.push(cubes.cube2)
    loop.updatables.push(cubes.cube3)
    loop.updatables.push(cubes.cube4)
    loop.updatables.push(cubes.cube5)
    loop.updatables.push(cubes.cube6)

    for (const [name, object] of Object.entries(cubes)) {
      object.addEventListener("click", (event) => {
        event.stopPropagation();
        console.log(`${name} cube was clicked`);
      });
      interactionManager.add(object);
      scene.add(object);
    }
    
    scene.add(camera, background, hemisphereLight )

    // PREV NEXT
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const one = document.getElementById('one');
    const two = document.getElementById('two');
    const three = document.getElementById('three');
    const four = document.getElementById('four');
    const five = document.getElementById('five');
    const six = document.getElementById('six');

    const motionHandler = (object, speed) => {
      console.log(object)
      state.clicks = object.name
      gsap.to(camera.position, speed || 2, {
        x: object.position.x,
        y: object.position.y,
        z: 5 + object.position.z,
        ease: 'expo.out',
      })
    }

    const cameraHandler = () => {
      console.log('camera')
      if (state.currentSlide === 1) {
        motionHandler(cubes.cube1, 7)
      } else if (state.currentSlide === 2) {
        motionHandler(cubes.cube2, 6)
      } else if (state.currentSlide === 3) {
        motionHandler(cubes.cube3, 4)
      } else if (state.currentSlide === 4) {
        motionHandler(cubes.cube4, 5)
      } else if (state.currentSlide === 5) {
        motionHandler(cubes.cube5)
      } else if (state.currentSlide === 6) {
        motionHandler(cubes.cube6)
      }
    }

    const nextHandler = () => {
      state.clicks = state.clicks + 1
      if (state.currentSlide < state.slideCount) {
        state.currentSlide = state.currentSlide + 1
        cameraHandler()
      }
    }

    const prevHandler = () => {
      state.clicks = state.clicks + 1
      if (state.currentSlide > 1) {
        state.currentSlide = state.currentSlide - 1
        cameraHandler()
      }
    }

    setTimeout(() => {
      motionHandler(cubes.cube1, 5)
    }, 2000)

    next.addEventListener('click', nextHandler)
    prev.addEventListener('click', prevHandler)

    one.addEventListener('click', () => motionHandler(cubes.cube1, 3))
    two.addEventListener('click', () => motionHandler(cubes.cube2, 3))
    three.addEventListener('click', () => motionHandler(cubes.cube3, 3))
    four.addEventListener('click', () => motionHandler(cubes.cube4, 3))
    five.addEventListener('click', () => motionHandler(cubes.cube5, 3))
    six.addEventListener('click', () => motionHandler(cubes.cube6, 3)) 

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
    // const ball = await createBall()
    // loop.updatables.push(ball)
    // scene.add(ball)

    // POSITION CAMERA
    /*
    const box = new Box3().setFromObject(ball);
    const size = box.getSize(new Vector3()).length();
    const center = box.getCenter();

    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();

    camera.position.copy(center);
    camera.position.x += size / 2.0;
    camera.position.y += size / 4.0;
    camera.position.z += size;
    camera.lookAt(center);
    */


  }
}

export { World }
