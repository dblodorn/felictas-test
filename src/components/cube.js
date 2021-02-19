import {
  BoxBufferGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial
} from "three";

function createCube(x, y, z, speed) {
  // create a geometry
  const geometry = new BoxBufferGeometry(2, 2, 2);
  // create a default (white) Basic material
  const material = new MeshStandardMaterial({ color: "purple" });
  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);

  const rotateSpeed = speed || 0.01;

  cube.position.set(x || 0, y || 0, z || 0);
  cube.rotation.set(-1.75, -0.01, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  cube.tick = () => {
    // increase the cube's rotation each frame
    cube.rotation.z += radiansPerSecond * rotateSpeed;
    cube.rotation.x += radiansPerSecond * rotateSpeed;
    cube.rotation.y += radiansPerSecond * rotateSpeed;
  };

  return cube;
}

export { createCube };
