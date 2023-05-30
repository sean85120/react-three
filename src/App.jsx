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
    // scene.fog = new THREE.Fog(0xffffff, 10, 1500);

    // const textureLoader = new THREE.TextureLoader()
    // scene.background = textureLoader.load('/src/assets/the-legend-of-zelda-tears-of-the-kingdom-wallpapers.jpg')


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
    renderer.shadowMap.enable = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    ambientLight.castShadow = true;
    // scene.add(ambientLight);

    // spot light
    const SpotLight = new THREE.SpotLight(0xffffff, 1);
    SpotLight.castShadow = true;
    SpotLight.position.set(0, 20, 10);
    SpotLight.lookAt(0, 0, 0)

    // SpotLight.shadow.mapSize.width = 1024;
    // SpotLight.shadow.mapSize.height = 1024;
    scene.add(SpotLight);


    // shadow camera

    const shadowCamera = SpotLight.shadow.camera

    shadowCamera.updateProjectionMatrix()
    const shadowHelper = new THREE.CameraHelper(shadowCamera)
    scene.add(shadowHelper)


    // light helper
    const lightHelper = new THREE.SpotLightHelper(SpotLight)
    scene.add(lightHelper)


    // adding box geometry to scene
    const boxGeometry = new THREE.BoxGeometry(10, 10, 10, 16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    // boxMesh.position.x = -10;
    // boxMesh.position.y = 10;
    boxMesh.castShadow = true;
    boxMesh.recieveShadow = true;


    // adding geometry to scene
    const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 10, 16, 16)
    const cylinderMaterial = new THREE.MeshNormalMaterial({ 'wireframe': true });
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.x = 10
    cylinderMesh.position.y = 10;
    cylinderMesh.castShadow = true;
    cylinderMesh.recieveShadow = true;


    scene.add(boxMesh);
    // scene.add(cylinderMesh);

    // adding background 

    const bgGeometry = new THREE.PlaneGeometry(300, 100);

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('/src/assets/anchor_station.jpeg');

    const bgMaterial = new THREE.MeshToonMaterial({ map: texture });

    var textureMesh = new THREE.Mesh(bgGeometry, bgMaterial)

    textureMesh.position.y = 40

    textureMesh.position.z = -100

    textureMesh.recieveShadow = true;

    scene.add(textureMesh)

    // adding ground
    const groundGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)

    var groundTextureLoader = new THREE.TextureLoader();
    var groundTexture = groundTextureLoader.load('/src/assets/ground_grass.png');

    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(100, 100);

    const groundMaterial = new THREE.MeshToonMaterial({ color: 0x999999 })
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.position.y = -10

    groundMesh.recieveShadow = true;

    // wall texture

    var wallTextureLoader = new THREE.TextureLoader()
    var wallTexture = wallTextureLoader.load('/src/assets/walls_news_anchor.jpeg')

    // add ceiling

    const ceilingGeometry = new THREE.PlaneGeometry(300, 300)
    const ceilingMaterial = new THREE.MeshToonMaterial({ map: wallTexture, side: THREE.DoubleSide })

    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial)

    ceiling.rotation.x = Math.PI / 2
    ceiling.position.y = 90
    ceiling.position.z = 0

    // adding walls
    const wallGeometry1 = new THREE.PlaneGeometry(300, 100)
    const wallMaterial1 = new THREE.MeshToonMaterial({ map: wallTexture })
    const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial1)
    wall1.rotation.y = Math.PI / 2
    wall1.position.y = 40
    wall1.position.x = -150

    const wallGeometry2 = new THREE.PlaneGeometry(300, 100)
    const wallMaterial2 = new THREE.MeshToonMaterial({ map: wallTexture })
    const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial2)
    wall2.rotation.y = -Math.PI / 2
    wall2.position.y = 40
    wall2.position.x = 150

    // adding backwall
    const backWallGeometry = new THREE.PlaneGeometry(300, 100)
    const backWallMaterial = new THREE.MeshToonMaterial({ map: wallTexture, side: THREE.DoubleSide })

    const backwall = new THREE.Mesh(backWallGeometry, backWallMaterial)

    // backwall.rotation.x = -Math.PI / 2    

    backwall.position.y = 40
    backwall.position.z = 150

    scene.add(groundMesh)
    scene.add(wall1)
    scene.add(wall2)
    scene.add(ceiling)
    scene.add(backwall)

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
      gltf.scene.recieveShadow = true;
      // scene.add(gltf.scene);
    }, undefined, function (error) {
      console.log(error);
    });

    const axesHelper = new THREE.AxesHelper(window.innerWidth, window.innerHeight);
    scene.add(axesHelper);

    // animate function
    const animate = () => {
      // boxMesh.rotation.x += 0.01;
      // boxMesh.rotation.y += 0.01;

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
