import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvasGL"),
  antialias: true,
  pixelRatio: 1,
  alpha: true,
  //clearColor: "gray",
});

renderer.setClearColor("gray");

renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
//scene.background = new THREE.Color("gray");

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const xLine = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 100),
  new THREE.MeshBasicMaterial({ color: "red" })
);
xLine.position.set(-50, 0, 0);
xLine.rotateY = 18;
scene.add(xLine);
xLine.lookAt(50, 0, 0);

const arrowLine = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 10),
  new THREE.MeshStandardMaterial({ color: "blue" })
);

arrowLine.rotateX(20);

scene.add(arrowLine);

//const arrowCone = new THREE.Mesh(
//  new THREE.ConeGeometry(5, 10, 150),
//  new THREE.MeshBasicMaterial({ color: "red" })
//);

//arrowCone.position.y = 10;

//scene.add(arrowCone);

//const loader = new GLTFLoader();

//loader.load(
//  "/src/face.glb",
//  function (gltf) {
//    scene.add(gltf.scene);
//    //gltf.scene.scale(10, 10, 10);
//  },
//  undefined,
//  function (error) {
//    console.error(error);
//  }
//);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 100);
scene.add(light);

//const light1 = new THREE.AmbientLight(0xffffff, 1);
//light1.position.set(5, 5, 100);
//scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  //arrowLine.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
//create a blue LineBasicMaterial
//const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

//const points = [];
//points.push(new THREE.Vector3(-10, 0, 0));
//points.push(new THREE.Vector3(0, 10, 0));
//points.push(new THREE.Vector3(10, 0, 0));
//points.push(new THREE.Vector3(10, 10, 0));

//const geometry = new THREE.BufferGeometry().setFromPoints(points);
//const line = new THREE.Line(geometry, material);

//scene.add(line);

//renderer.render(scene, camera);
