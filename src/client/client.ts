import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(10));

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // render();
}

// stats panel: show number of frames that were loaded per seconds
const stats = new Stats();
document.body.appendChild(stats.dom);

// dat gui panel:
const gui = new GUI();
const cubeFolder = gui.addFolder("Cube"); // group in cubeFolder --> collapse
cubeFolder.add(cube, "visible");
cubeFolder.open();
const rotationFolder = cubeFolder.addFolder("Rotation");
rotationFolder.add(cube.rotation, "x", 0, Math.PI * 2);
rotationFolder.add(cube.rotation, "y", 0, Math.PI * 2);
rotationFolder.add(cube.rotation, "z", 0, Math.PI * 2);
rotationFolder.open();

const positionFolder = cubeFolder.addFolder("Position");
positionFolder.add(cube.position, "x", -10, 10, 0.1);
positionFolder.add(cube.position, "y", -10, 10, 0.1);
positionFolder.add(cube.position, "z", -10, 10, 0.1);
positionFolder.open();

const scaleFolder = cubeFolder.addFolder("Scale");
scaleFolder.add(cube.scale, "x", 0, 1);
scaleFolder.add(cube.scale, "y", 0, 1);
scaleFolder.add(cube.scale, "z", 0, 1);
scaleFolder.open();

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();

  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
// render();
