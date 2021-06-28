import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { OBJLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';

function loader(scene, name, x = 0, z = 0) {

    var mesh = null;

    var mtlLoader = new MTLLoader();
    mtlLoader.load('/models/' + name + '/' + name + '.mtl', function (materials) {

        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/models/' + name + '/' + name + '.obj', function (object) {
            var box = new THREE.Box3().setFromObject(object);
            
            mesh = object;
            mesh.position.set(x, -box.min.y, z);
            mesh.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;

            });

            scene.add(mesh);

        });

    });

}

function processPosition(x, y) {
    if (x < 5 && y < 5) {
        x = x - 5;
        y = 5 - y;
    }
    else if (x > 4 && y < 5) {
        x = x - 4;
        y = 5 - y;
    }
    else if (x < 5 && y > 4) {
        x = x - 5;
        y = 4 - y;
    }
    else {
        x = x - 4;
        y = 4 - y;
    }
    return [x*6,y*6];
}

function chessPositions(scene, name, x, y) {
    const [w,h]=processPosition(x,y);

    loader(scene, name, w, h);

}

function renderChessBoard(place, width, height, arrObj) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 25, 65);


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;


    place.appendChild(renderer.domElement);

    var mesh = null;

    var mtlLoader = new MTLLoader();
    mtlLoader.load('/models/' + chessboard + '/' + chessboard + '.mtl', function (materials) {

        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/models/' + chessboard + '/' + chessboard + '.obj', function (object) {
            
            mesh = object;
            mesh.position.set(0, 0, 0);
            mesh.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;

            });

            scene.add(mesh);

        });

    });
    arrObj.forEach(element => {
        processPosition(scene, element.name, element.x, element.y)
    });
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

function render(place, name, width, height) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 25, 65);


    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;


    place.appendChild(renderer.domElement);

    //PLANE
    // var meshFloor = new THREE.Mesh(
    //     new THREE.PlaneGeometry(50, 50, 10, 10),

    //     new THREE.MeshPhongMaterial({ color: 0x404040 })

    // );


    // meshFloor.rotation.x -= 1.1;

    // meshFloor.receiveShadow = true;
    // meshFloor.position.y = -5;
    // scene.add(meshFloor);

    // MODEL

    // var mesh = null;

    // var mtlLoader = new MTLLoader();
    // mtlLoader.load('/models/' + name + '/' + name + '.mtl', function (materials) {

    //     materials.preload();

    //     var objLoader = new OBJLoader();
    //     objLoader.setMaterials(materials);
    //     objLoader.load('/models/' + name + '/' + name + '.obj', function (object) {

    //         mesh = object;
    //         mesh.position.set(0, 0, 0);
    //         mesh.traverse(function (child) {
    //             child.castShadow = true;
    //             child.receiveShadow = true;

    //         });

    //         scene.add(mesh);

    //     });

    // });
    //chessboard
    // var mesh = null;

    // var mtlLoader = new MTLLoader();
    // mtlLoader.load('/models/' + 'chessboard' + '/' + 'chessboard' + '.mtl', function (materials) {

    //     materials.preload();

    //     var objLoader = new OBJLoader();
    //     objLoader.setMaterials(materials);
    //     objLoader.load('/models/' + 'chessboard' + '/' + 'chessboard' + '.obj', function (object) {
    //         var box = new THREE.Box3().setFromObject(object);
    //         console.log(box);
    //         mesh = object;
    //         mesh.position.set(0,0, 0);
    //         mesh.traverse(function (child) {
    //             child.castShadow = true;
    //             child.receiveShadow = true;

    //         });

    //         scene.add(mesh);

    //     });

    // });
    loader(scene, 'black-king');
    loader(scene, 'white-king');

    // LIGHT
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var light = new THREE.SpotLight(0xffffff, 1.5);

    light.position.set(4, 8, 2);
    light.angle = 3;
    light.penumbra = 0.8;
    light.castShadow = true;

    scene.add(light);

    // var light2 = new THREE.SpotLight(0xffffff, 0.5);

    // light2.position.set(-4, 8, 2);
    // light2.angle=0.4;
    // light2.penumbra=0.8;
    // light2.castShadow = true;

    // scene.add(light2);
    //scene.add(new THREE.cameraHelper(SpotLight.shadow.camera));

    //control
    const controls = new OrbitControls(camera, renderer.domElement);

    //BACKGROUD
    scene.background = new THREE.Color('skyblue');
    function animate() {
        requestAnimationFrame(animate);

        //     if (mesh) {
        //         mesh.rotation.y -= 0.01;
        //     }

        renderer.render(scene, camera);
    }
    animate();
}
export { render, renderChessBoard };