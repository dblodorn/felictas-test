import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { setupModel } from "./setupModel.js";

async function loadModels(modelAsset) {
  const loader = new GLTFLoader();
  // loader.crossOrigin = true;
  const modelData = await loader.loadAsync(modelAsset);

  const model = setupModel(modelData);
  model.position.set(0, 0, -50);
  return { model };
}

export { loadModels };
