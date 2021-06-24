import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';

function render(place, name, width, height) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    
    place.appendChild(renderer.domElement);

    // MODEL

    var loader = new OBJLoader();
    var model = null;

    loader.load('/models/'+name+'/'+name+'.obj', function(object)
    { 
        model=object;
        scene.add(model);
    });
    

    // LIGHT
    
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1,1,1);
    scene.add(light);

    //const controls = new THREE.OrbitControls(camera, renderer.domElement);
    function animate() {
        requestAnimationFrame(animate);

        if (model) {
            model.rotation.y -= 0.01;}

        renderer.render(scene, camera);
    }
    animate();
}

export default render;