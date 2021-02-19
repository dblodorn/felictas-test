import { PerspectiveCamera } from "three";

function createCamera() {
  const camera = new PerspectiveCamera(
    60, // fov = Field Of View
    window.innerWidth / window.innerHeight, // aspect ratio (dummy value)
    0.01, // near clipping plane
    1000 // far clipping plane
  );
  camera.position.set(0, 0, 20);

  return camera;
}

export { createCamera };
