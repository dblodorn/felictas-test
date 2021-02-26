import {
  Object3D,
  Box3,
  Vector3
} from 'three'

import loadSlices from "./../models/loadSlices.js";

export default async function() {
  
  const {
    slice1,
    slice2,
    slice3,
    slice4,
    slice5,
    slice6
  } = await loadSlices();
  console.log('loaded')

  const ball = new Object3D();

  ball.add(slice1)
  ball.add(slice2)
  ball.add(slice3)
  ball.add(slice4)
  ball.add(slice5)
  ball.add(slice6)

  const box = new Box3().setFromObject(ball);
  const size = box.getSize(new Vector3()).length();
  // const center = box.getCenter();
  ball.translateZ(0)
  ball.translateY((size / 4) * -1)
  
  /*
  slice1.position.z = -50
  slice3.position.z = 25
  slice3.position.x = -30
  */

  /*console.log(ball.children[0])

  // INTERACTION
  slice1.on('click', function(e) { state.clicks = "Slice1" });
  slice2.on('click', function(e) { state.clicks = "Slice2" });
  slice3.on('click', function(e) { state.clicks = "Slice3" });
  slice4.on('click', function(e) { state.clicks = "Slice4" });
  slice5.on('click', function(e) { state.clicks = "Slice5" });
  slice6.on('click', function(e) { state.clicks = "Slice6" });
  
  // Position Camera to GROUP Size
  camera.near = size / 100;
  camera.far = size * 100;
  camera.updateProjectionMatrix();

  camera.position.copy(center);
  camera.position.x += size / 2.0;
  camera.position.y += size / 2.0;
  camera.position.z += size / 2.0;
  camera.lookAt(center);
  */

  return ball;
}