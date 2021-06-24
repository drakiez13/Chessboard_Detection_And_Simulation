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


    meshFloor.rotation.x -= 1.2;

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
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);

        });

    });


    // LIGHT

    var ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    var light = new THREE.SpotLight(0xffffff, 1, 18);
    light.position.set(3, 6, -3);
    light.castShadow = true;



    scene.add(light);

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