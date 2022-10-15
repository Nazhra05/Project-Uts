import * as THREE from "three";
import { OrbitControls } from "controls";
import { GLTFLoader } from "loader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const kotak = document.querySelector(".kotak");
kotak.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enabled = false;

camera.position.z = 80;
camera.position.x = 80;
camera.position.y = -25;

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 2, 100);
pointLight.position.set(50, 0, 50);
scene.add(pointLight);

const loader = new GLTFLoader();
let robot;

loader.load("Assets/robot/scene.gltf", function (gltf) {
  robot = gltf.scene;
  robot.scale.set(0.1, 0.1, 0.1);
  scene.add(robot);
});

function animate() {
  requestAnimationFrame(animate);
  if (robot) {
    addEventListener("mousemove", function (data) {
      let x = data.clientX / 100;
      let y = data.clientY / 1000;
      robot.rotation.y = x;
      // robot.rotation.x = y;
    });
  }

  renderer.render(scene, camera);
}
animate();
