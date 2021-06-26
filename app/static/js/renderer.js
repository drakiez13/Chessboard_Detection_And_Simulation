import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';
function render(place, name, width, height) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 15;


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;


    place.appendChild(renderer.domElement);

    //PLANE
    var meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 18, 10, 10),

        new THREE.MeshPhongMaterial({ color: 0x404040 })

    );


    meshFloor.rotation.x -= 1.1;

    meshFloor.receiveShadow = true;
    meshFloor.position.y = -5;
    scene.add(meshFloor);

    // MODEL

    var mesh = null;

    var mtlLoader = new MTLLoader();
    mtlLoader.load('/models/' + name + '/' + name + '.mtl', function (materials) {

        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/models/' + name + '/' + name + '.obj', function (object) {

            mesh = object;
            mesh.position.set(0,0,1);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            scene.add(mesh);

        });

    });


    // LIGHT
    var ambientLight = new THREE.AmbientLight(0xffffff,0.5 );
    scene.add(ambientLight);

    var light = new THREE.SpotLight(0xffffff, 1.5);
    
    light.position.set(4, 8, 2);
    light.angle=0.4;
    light.penumbra=0.8;
    light.castShadow = true;

    scene.add(light);

    var light2 = new THREE.SpotLight(0xffffff, 0.5);
    
    light2.position.set(-4, 8, 2);
    light2.angle=0.4;
    light2.penumbra=0.8;
    light2.castShadow = true;

    scene.add(light2);

    //BACKGROUD
    scene.background = new THREE.Color('skyblue');
    function animate() {
        requestAnimationFrame(animate);

        if (mesh) {
            mesh.rotation.y -= 0.01;
        }

        renderer.render(scene, camera);
    }
    animate();
}

export default render;