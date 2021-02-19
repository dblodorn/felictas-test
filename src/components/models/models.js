import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { setupModel } from "./setupModel.js";

async function loadModels(modelAsset, rotateSpeed) {
  const loader = new GLTFLoader();
  console.log(modelAsset)
  loader.crossOrigin = true;
  const modelData = await loader.loadAsync(modelAsset);

  const model = setupModel(modelData);
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  
  const radiansPerSecond = MathUtils.degToRad(30);
  const speed = rotateSpeed || .001

  model.tick = () => {
    // increase the model's rotation each frame
    model.rotation.z += radiansPerSecond * speed;
    model.rotation.x += radiansPerSecond * speed;
    model.rotation.y += radiansPerSecond * speed;
  };
  
  return { model };
}

export { loadModels };
