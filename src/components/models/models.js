import {
  MathUtils,
  Box3,
  Vector3
} from "three";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { setupModel } from "./setupModel.js";
import state from './../../state';

function traverseMaterials (object, callback) {
  object.traverse((node) => {
    if (!node.isMesh) return;
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach(callback);
  });
}

async function loadModels(modelAsset, rotateSpeed) {
  const loader = new GLTFLoader();
  console.log(modelAsset)
  loader.crossOrigin = true;
  const modelData = await loader.loadAsync(modelAsset);
  
  console.log(state, 'loaded')
  setTimeout(() => {
    state.threeContainer.classList.add('loaded')
  }, 10)
  const model = setupModel(modelData).scene;
  
  const box = new Box3().setFromObject(model);
  const size = box.getSize(new Vector3()).length();
  const center = box.getCenter(new Vector3());
  
  model.position.x += ((model.position.x - center.x));
  model.position.y += ((model.position.y - center.y));
  model.position.z += ((model.position.z - center.z));
  
  const radiansPerSecond = MathUtils.degToRad(30);
  const speed = rotateSpeed || .001

  model.tick = () => {
    model.rotation.z += radiansPerSecond * speed;
    model.rotation.x += radiansPerSecond * speed;
    model.rotation.y += radiansPerSecond * speed;
  };
  
  return { 
    model,
    size,
    center
  };
}

export { loadModels };
