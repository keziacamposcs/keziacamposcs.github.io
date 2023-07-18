import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setClearColor(0xf6f6f6);

container.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const urls = ['imagem1.png', 'imagem2.jpg', 'imagem3.jpg'];
const imageGroup = new THREE.Group();
scene.add(imageGroup);

urls.forEach((url, index) => {
    loader.load(url, function(texture) {
        texture.encoding = THREE.sRGBEncoding; // Add this line
        texture.minFilter = THREE.LinearFilter;

        const geometry = new THREE.PlaneGeometry(20, 20);
        const material = new THREE.MeshBasicMaterial({map: texture});
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.x = Math.sin(index * 2 * Math.PI / urls.length) * 10;
        mesh.position.z = Math.cos(index * 2 * Math.PI / urls.length) * 10;
        mesh.lookAt(0, 0, 0);

        imageGroup.add(mesh);
    });
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

let userHasInteracted = false;
let rotationAngle = 0;

function animate() {
    requestAnimationFrame(animate);

    if (!userHasInteracted) {
        rotationAngle += 0.01;
        camera.position.x = Math.sin(rotationAngle) * 10;
        camera.position.z = Math.cos(rotationAngle) * 10;
        camera.lookAt(scene.position);
    }

    controls.update();
    renderer.render(scene, camera);
}

renderer.domElement.addEventListener('mouseover', () => {
    userHasInteracted = true;
});

renderer.domElement.addEventListener('mouseout', () => {
    userHasInteracted = false;
});

window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

camera.position.z = 10;
animate();
