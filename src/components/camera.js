import { PerspectiveCamera } from "three";

function createCamera(container) {
  const camera = new PerspectiveCamera(
    60,
    container.innerWidth / container.innerHeight,
    0.01,
    2000
  );
  camera.position.set(0, 300, 300);

  return camera;
}

export { createCamera };
