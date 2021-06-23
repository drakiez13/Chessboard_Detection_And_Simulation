import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';

function render(place, name) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(600, 600);
    
    place.appendChild(renderer.domElement);

    // MODEL

    var loader = new OBJLoader();

    loader.load('/models/'+name+'/'+name+'.obj', function(object)
        { 
            scene.add(object);
        });
    

    // LIGHT
    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);

    
    function animate() {
        requestAnimationFrame(animate);
        
        renderer.render(scene, camera);
    }
    animate();
}

export default render;