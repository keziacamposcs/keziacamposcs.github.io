import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xfefefe); // Define a cor do fundo como #fefefe
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const urls = ['imagem1.jpg', 'imagem2.jpg', 'imagem3.jpg'];
const imageGroup = new THREE.Group(); // Cria um grupo para as imagens
scene.add(imageGroup);

urls.forEach((url, index) => {
    loader.load(url, function(texture) {
        const geometry = new THREE.PlaneGeometry(5, 5);
        const material = new THREE.MeshBasicMaterial({map: texture});
        const mesh = new THREE.Mesh(geometry, material);

        // posição das imagens em um círculo em torno do ponto (0, 0, 0)
        mesh.position.x = Math.sin(index * 2 * Math.PI / urls.length) * 10;
        mesh.position.z = Math.cos(index * 2 * Math.PI / urls.length) * 10;
        mesh.lookAt(0, 0, 0); // Faz as imagens olharem para o centro

        imageGroup.add(mesh); // Adiciona a malha ao grupo
    });
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.update();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

camera.position.z = 10;
const container = document.getElementById('container');
container.appendChild(renderer.domElement);
