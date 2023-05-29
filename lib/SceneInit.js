import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
    constructor(canvasId) {
        // core components initialize Three.js app

        this.scene = undefined;
        this.camera = undefined;
        this.renderer = undefined;

        // camera
        this.fov = 50;
        this.nearPlane = undefined;
        this.farPlane = undefined;
        this.canvasId = canvasId;

        // NOTE: Additional components.
        this.clock = undefined;
        this.stats = undefined;
        this.controls = undefined;

        // lights
        this.spotLight = undefined;
        this.ambientLight = undefined;
    }

    initialize() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            this.fov,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );

        this.camera.position.z = 96;

        // specify a canvas
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        this.stats = Stats();
        document.body.appendChild(this.stats.dom);

        // ambient light which is for the whole scene
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.ambientLight.castShadow = true;
        this.scene.add(this.ambientLight);

        // spot light which is illuminating the chart directly
        this.spotLight = new THREE.SpotLight(0xffffff, 1);
        this.spotLight.castShadow = true;
        this.spotLight.position.set(0, 64, 32);
        this.scene.add(this.spotLight);

        // if window resizes
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // // Load space background.
        // this.loader = new THREE.TextureLoader();
        // this.scene.background = this.loader.load('./pics/space.jpeg');

        // NOTE: Declare uniforms to pass into glsl shaders.
        this.uniforms = {
            u_time: { type: 'f', value: 1.0 },
            colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
            colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
        };
    }

    animate() {
        // NOTE: Window is implied.
        // requestAnimationFrame(this.animate.bind(this));
        window.requestAnimationFrame(this.animate.bind(this));
        this.render();
        this.stats.update();
        this.controls.update();
    }

    render() {
        // NOTE: Update uniform data on each render.
        this.uniforms.u_time.value += this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}