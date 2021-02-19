import { WebGLRenderer, sRGBEncoding } from "three";

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true });
  // turn on the physically correct lighting model
  renderer.physicallyCorrectLights = true;
  renderer.outputEncoding = sRGBEncoding;
  renderer.setClearColor(0xcccccc);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  return renderer;
}

export { createRenderer };
