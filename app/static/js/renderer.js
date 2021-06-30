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


            mesh = object;
            //temp=mesh.clone();
            var box = new THREE.Box3().setFromObject(object);
            mesh.position.set(x, -box.min.y, z);
            mesh.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;

            });

            scene.add(mesh);

        });

    });
    return mesh;

}

function processPositions(x, y) {

    y = 9 - y;
    if (x < 5 && y < 5) {
        x = x - 4.5;
        y = 4.5 - y;
    }
    else if (x > 4 && y < 5) {
        x = x - 4.5;
        y = 4.5 - y;
    }
    else if (x < 5 && y > 4) {
        x = x - 4.5;
        y = 4.5 - y;
    }
    else {
        x = x - 4.5;
        y = 4.5 - y;
    }
    return [x * 6, y * 6];
}

function chessPositions(scene, name, x, y) {
    const [w, h] = processPositions(x, y);

    loader(scene, name, w, h);

}

function renderChessBoard(place, width, height, arrObj) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 25, 65);


    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;


    place.appendChild(renderer.domElement);

    var mesh = null;

    var mtlLoader = new MTLLoader();
    mtlLoader.load('/models/' + 'chessboard' + '/' + 'chessboard' + '.mtl', function (materials) {

        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/models/' + 'chessboard' + '/' + 'chessboard' + '.obj', function (object) {

            mesh = object;
            mesh.position.set(0, 0, 0);
            mesh.traverse(function (child) {
                child.castShadow = false;
                child.receiveShadow = true;

            });

            scene.add(mesh);

        });

    });

    arrObj.forEach(element => {
        let x=element.x;
        let y=element.y;
        y = 9 - y;
        if (x < 5 && y < 5) {
            x = x - 4.5;
            y = 4.5 -y;
        }
        else if (x > 4 && y < 5) {
            x = x - 4.5;
            y = 4.5 - y;
        }
        else if (x < 5 && y > 4) {
            x = x - 4.5;
            y = 4.5 - y;
        }
        else {
            x = x - 4.5;
            y = 4.5 - y;
        }
        x = x * 6;
        y = y * 6;

        let mesh2 = null;
        let box = null;
        let mtlLoader2 = new MTLLoader();
        mtlLoader2.load('/models/' + element.name + '/' + element.name + '.mtl', function (materials) {

            materials.preload();

            let objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('/models/' + element.name + '/' + element.name + '.obj', function (object) {
                box = new THREE.Box3().setFromObject(object);

                

            });

            // scene.add(mesh1);
        });

        // });

        let mesh1 = null;

        let mtlLoader1 = new MTLLoader();
        mtlLoader1.load('/models/' + element.name + '/' + element.name + '.mtl', function (materials) {

            materials.preload();

            let objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('/models/' + element.name + '/' + element.name + '.obj', function (object) {


                mesh1 = object;
                mesh1.position.set(x, -box.min.y, y);
                // mesh1.position.set(element.x, 2.2, element.y);
                mesh1.traverse(function (child) {
                    child.castShadow = true;
                    child.receiveShadow = true;

                });

                scene.add(mesh1);
            });

        });

    });
    // LIGHT

    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);


    let light = new THREE.SpotLight(0xffffff, 0.8);

    light.position.set(10, 5, 10);
    light.angle = 3;
    light.penumbra = 0.8;




    light.position.set(100, 100, 0);

    light.castShadow = true;
   
    light.shadow.mapSize.width = 4096; // default
    light.shadow.mapSize.height = 2048; // default
    
    scene.add(light);
    

    const controls = new OrbitControls(camera, renderer.domElement);

    scene.background = new THREE.Color('skyblue');

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
}

function render(place, name, width, height) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(0, 10, 20);


    const renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    //BasicShadowMap
    //VSMShadowMap
    // PCFShadowMap
    // PCFSoftShadowMap


    place.appendChild(renderer.domElement);

    //PLANE
    var meshFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50, 10, 10),

        new THREE.MeshPhongMaterial({ color: 0x404040 })

    );


    meshFloor.rotation.x -= Math.PI / 2;

    meshFloor.receiveShadow = true;
    scene.add(meshFloor);

    var mesh = null;
    var box = null;
    var mtlLoader = new MTLLoader();
    mtlLoader.load('/models/' + name + '/' + name + '.mtl', function (materials) {

        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/models/' + name + '/' + name + '.obj', function (object) {
            box = new THREE.Box3().setFromObject(object);


            // mesh = object;
            // mesh.traverse(function (child) {
            //     child.castShadow = true;
            //     child.receiveShadow = true;

            // });

            //scene.add(mesh);
        });

    });
    var mesh = null;

    var mtlLoader = new MTLLoader();
    mtlLoader.load('/models/' + name + '/' + name + '.mtl', function (materials) {

        materials.preload();

        var objLoader = new OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('/models/' + name + '/' + name + '.obj', function (object) {


            mesh = object;
            mesh.position.set(0, -box.min.y, 0);
            mesh.traverse(function (child) {
                child.castShadow = true;
                child.receiveShadow = true;

            });

            scene.add(mesh);
        });

    });

    // meshFloor.position.set(0, -box.min.y, 0);



    // LIGHT
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    var light = new THREE.SpotLight(0xffffff, 1.2);

    light.position.set(10, 20, 10);
    light.angle = 4;
    light.penumbra = 0.8;
    light.castShadow = true;

    scene.add(light);

    //control
    // const controls = new OrbitControls(camera, renderer.domElement);

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
export { render, renderChessBoard };