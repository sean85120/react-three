import { useEffect } from 'react'
import './App.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

// import GLTFLoader
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default function BackGround() {
    useEffect(() => {

        // adding background 
        const bgGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load('/src/assets/the-legend-of-zelda-tears-of-the-kingdom-wallpapers.jpg');

        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapS = THREE.RepeatWrapping;

        // const repeatX = 2;
        // const repeatY = 2;
        // texture.repeat.set(repeatX, repeatY);

        const bgMaterial = new THREE.MeshBasicMaterial({ map: texture });

        var textureMesh = new THREE.Mesh(bgGeometry, bgMaterial)

        textureMesh.position.z = -100

        scene.add(textureMesh)

        // adding ground
        const groundGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)

        var groundTextureLoader = new THREE.TextureLoader();
        var groundTexture = groundTextureLoader.load('/src/assets/ground_grass.png');

        const groundMaterial = new THREE.MeshBasicMaterial({ map: groundTexture })
        const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial)
        groundMesh.rotation.x = -Math.PI / 2
        groundMesh.position.y = -10

        scene.add(groundMesh)

        // adding wall -x
        const wallGeometry1 = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
        const wallMaterial1 = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const wall1 = new THREE.Mesh(wallGeometry1, wallMaterial1)
        wall1.rotation.y = Math.PI / 2
        wall1.position.x = -150
        scene.add(wall1)

        // adding wall x
        const wallGeometry2 = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight)
        const wallMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff })
        const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial2)
        wall2.rotation.y = -Math.PI / 2
        wall2.position.x = 150
        scene.add(wall2)

    }
    )
}