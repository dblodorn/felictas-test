import { AmbientLight } from "three";

function createAmbientLights() {
  const light = new AmbientLight(0x20202a, 20, 100);
  light.position.set(30, 10, 30);
  return light;
}

export { createAmbientLights };
