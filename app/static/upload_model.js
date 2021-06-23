
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 1;
camera.position.x = 100;
camera.position.y = 100;

window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight; renderer.setSize(width, height);
    camera.aspect = width / height; camera.updateProjectionMatrix();
});

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);




var loader = new THREE.GLTFLoader();

loader.load('/models/talio_otter/scene.gltf', function (object) {
    scene.add(object.scene);
    object.scene.position.x = -40;
    object.scene.position.y = -40;
    object.scene.position.z = -10;
});




var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 50, 10);
scene.add(light);

const light1 = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light1);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
scene.background = new THREE.Color('skyblue');
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();