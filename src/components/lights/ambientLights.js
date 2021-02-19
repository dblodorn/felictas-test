import state from './../../state'
import { AmbientLight } from "three";

function createAmbientLights() {
  console.log(state.lights)
  const light = new AmbientLight(state.lights.ambientColor, state.lights.ambientIntensity);
  light.position.set(30, 10, 30);
  return light;
}

export { createAmbientLights };
