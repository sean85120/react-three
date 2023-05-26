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

    scene.background = new THREE.CubeTextureLoader()
      .setPath('texture/cubeMaps/')
      .load('/src/assets/the-legend-of-zelda-tears-of-the-kingdom-wallpapers.jpg');

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    camera.position.z = 96;

    // const canvas = document.getElementById('myThreeJsCanvas');
    const renderer = new THREE.WebGLRenderer(
      //   {
      //   canvas,
      //   antialias: true,
      // }
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
    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // scene.add(boxMesh);

    // add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // add fps stats
    const stats = Stats();
    document.body.appendChild(stats.dom);

    // // load a resource
    // const texture = loader.load('/src/assets/the-legend-of-zelda-tears-of-the-kingdom-wallpapers.jpg');

    // load gltf model
    const loader = new GLTFLoader();
    loader.load('/src/assets/ocarina_of_time_link.glb', function (gltf) {
      scene.add(gltf.scene);
    }, undefined, function (error) {
      console.log(error);
    });

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // animate function
    const animate = () => {
      // boxMesh.rotation.x += 0.01;
      // boxMesh.rotation.y += 0.01;

      stats.update();
      controls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      {/* <canvas id='myThreeJsCanvas' /> */}
    </div>
  )
}

export default App
