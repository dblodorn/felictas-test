import state from './../../state'
import { DirectionalLight } from "three";

function createDirectionalLights() {
  const light = new DirectionalLight(state.lights.directColor, state.lights.directIntensity);
  light.position.set(0.5, 0, 0.866);
  return light;
}

export { createDirectionalLights };
