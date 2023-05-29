import { useEffect } from 'react'
import './App.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

// import GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader()
    scene.background = textureLoader.load('/src/assets/the-legend-of-zelda-tears-of-the-kingdom-wallpapers.jpg')


    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      500
    );

    camera.position.z = 96;

    const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer(
      {
        canvas,
        antialias: true,
      }
    );

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    // spot light
    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    // object
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial({ 'wireframe': true });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = -10
    scene.add(boxMesh);

    // adding geometry to scene
    const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 10, 16, 16)
    const cylinderMaterial = new THREE.MeshNormalMaterial({ 'wireframe': true });
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.x = 10
    scene.add(cylinderMesh);

    // // adding background 

    // const bgGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

    // var textureLoader = new THREE.TextureLoader();
    // var texture = textureLoader.load('/src/assets/the-legend-of-zelda-tears-of-the-kingdom-wallpapers.jpg');

    // const bgMaterial = new THREE.MeshBasicMaterial({ map: texture });

    // var textureMesh = new THREE.Mesh(bgGeometry, bgMaterial)

    // textureMesh.position.z = -100

    // scene.add(textureMesh)

    // adding ground
    const groundGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)

    var groundTextureLoader = new THREE.TextureLoader();
    var groundTexture = groundTextureLoader.load('/src/assets/ground_grass.png');

    const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture })
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.position.y = -10



    // adding walls
    const wallGeometry1 = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
    const wallMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial1)
    wall1.rotation.y = Math.PI / 2
    wall1.position.x = -150


    // adding walls
    const wallGeometry2 = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
    const wallMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial2)
    wall2.rotation.y = -Math.PI / 2
    wall2.position.x = 150


    scene.add(groundMesh)
    // scene.add(wall1)
    // scene.add(wall2)

    // add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.minDistance = 20;
    controls.maxDistance = 100;
    controls.enableDamping = true;

    // add fps stats
    const stats = Stats();
    document.body.appendChild(stats.dom);

    // load gltf model
    const modelLoader = new GLTFLoader();
    modelLoader.load('/src/assets/ocarina_of_time_link.glb', function (gltf) {
      gltf.scene.position.set(10, -10, 10)
      scene.add(gltf.scene);
    }, undefined, function (error) {
      console.log(error);
    });

    const axesHelper = new THREE.AxesHelper(window.innerWidth, window.innerHeight);
    scene.add(axesHelper);

    // animate function
    const animate = () => {
      boxMesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.01;

      // gltf.scene.rotation.x += 0.01;

      cylinderMesh.rotation.x += 0.01;
      cylinderMesh.rotation.y += 0.01;

      // stats.update();
      // controls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id='myThreeJsCanvas' />
    </div>
  )
}

export default App
