import { useEffect } from 'react';

import * as THREE from 'three';
import SceneInit from './lib/SceneInit';

import { GUI } from 'dat.gui';
import { mapLinear } from 'three/src/math/MathUtils';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();

    // initailizer gui
    const gui = new GUI();

    // main group 
    const mainGroup = new THREE.Group();
    mainGroup.position.y = 0.5;
    test.scene.add(mainGroup);

    // ground
    const groundGeometry = new THREE.BoxGeometry(8, 0.5, 8);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0xfafafa });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    // groundMesh.receiveShadow = true;
    groundMesh.position.y = -2;
    mainGroup.add(groundMesh);

    // set up boxes
    const bg1 = new THREE.BoxGeometry(1, 1, 1);
    const bm1 = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const boxMesh1 = new THREE.Mesh(bg1, bm1);
    boxMesh1.castShadow = true;
    boxMesh1.recieveShadow = true;
    boxMesh1.position.x = -2;
    mainGroup.add(boxMesh1);

    const bg2 = new THREE.BoxGeometry(1, 1, 1);
    const bm2 = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const boxMesh2 = new THREE.Mesh(bg2, bm2);
    boxMesh2.castShadow = true;
    boxMesh2.position.x = 0;
    mainGroup.add(boxMesh2);

    const bg3 = new THREE.BoxGeometry(1, 1, 1);
    const bm3 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const boxMesh3 = new THREE.Mesh(bg3, bm3);
    boxMesh3.castShadow = true;
    boxMesh3.position.x = 2;
    mainGroup.add(boxMesh3);

    // set up ambient light
    const al = new THREE.AmbientLight(0xffffff, 0.5);
    test.scene.add(al);

    // set up al gui
    const alFolder = gui.addFolder('ambient light');
    const alSettings = { color: al.color.getHex() };
    alFolder.add(al, 'visible');
    alFolder.add(al, 'intensity', 0, 1, 0.1);
    alFolder
      .addColor(alSettings, 'color')
      .onChange((value) => al.color.set(value));
    alFolder.open();

    // set up directional light and helper
    const dl = new THREE.DirectionalLight(0xff0000, 0.5);
    dl.position.set(0, 2, 2);
    dl.castShadow = true;
    const dlHelper = new THREE.DirectionalLightHelper(dl, 3);
    mainGroup.add(dl);
    // mainGroup.add(dlHelper);

    // set up directional light gui
    const dlSettings = {
      visible: true,
      color: dl.color.getHex(),
    };
    const dlFolder = gui.addFolder('directional light');
    dlFolder.add(dlSettings, 'visible').onChange((value) => {
      dl.visible = value;
      dlHelper.visible = value;
    });
    dlFolder.add(dl, 'intensity', 0, 1, 0.25);
    dlFolder.add(dl.position, 'y', 1, 4, 0.5);
    dlFolder.add(dl, 'castShadow');
    // dlFolder
    //   .addColor(dlSettings, 'color')
    //   .onChange((value) => dl.color.set(value));
    dlFolder.open();

    // // set up spot light + helper
    // const sl = new THREE.SpotLight(0x00ff00, 1, 8, Math.PI / 8, 0);
    // sl.position.set(0, 2, 2);
    // const slHelper = new THREE.SpotLightHelper(sl);
    // mainGroup.add(sl, slHelper);

    return () => {
      gui.destroy();
    };
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
