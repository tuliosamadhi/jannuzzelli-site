// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.6 - THREE.JS AVANÇADO ======================

window.addEventListener("error", (e) => {
    console.error("Erro global capturado:", e.message);
});

import { processAI } from './js/ai-orchestrator.js';
processAI("teste", (res) => {
    console.log("AI:", res);
});

// Import modular
import { updateProfile, getUserType } from './js/profile-engine.js';

// ====================== LOADER ======================
const loaderText = document.getElementById("loader-text");
const sequence = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Calibrating Strategic Perception...",
    "Access Protocol Ready"
];
let step = 0;

function runLoader() {
    if (step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 750);
    } else {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.transition = "opacity 1s ease";
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 1000);
        }
    }
}
window.addEventListener("DOMContentLoaded", runLoader);

// ====================== CURSOR ======================
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
if (dot && ring) {
    document.addEventListener("mousemove", (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ====================== THREE.JS AVANÇADO - PARTICLES UPGRADE ======================
const canvas = document.getElementById("neural-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 9;

// ====================== SINGULARITY CORE ORB ======================
const coreGeometry = new THREE.SphereGeometry(1.3, 64, 64);
const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending
});
const singularityCore = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(singularityCore);

// ====================== COGNITIVE PARTICLES FIELD (MELHORADO) ======================
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 1200 : 3200;
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);
const sizes = new Float32Array(particleCount);
const velocities = new Float32Array(particleCount * 3); // nova: velocidade

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;

    // Velocidade inicial suave
    velocities[i] = (Math.random() - 0.5) * 0.008;
    velocities[i + 1] = (Math.random() - 0.5) * 0.008;
    velocities[i + 2] = (Math.random() - 0.5) * 0.008;

    colors[i] = 0.2 + Math.random() * 0.6;
    colors[i + 1] = 0.7 + Math.random() * 0.3;
    colors[i + 2] = 1.0;

    sizes[i / 3] = Math.random() * 0.09 + 0.025;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

const particleMaterial = new THREE.PointsMaterial({
    size: 0.065,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthTest: false
});

const cognitiveParticles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(cognitiveParticles);

// ====================== ANIMAÇÃO AVANÇADA ======================
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animateThree() {
    requestAnimationFrame(animateThree);
    const time = Date.now() * 0.001;

    // Singularity Core
    singularityCore.rotation.y = time * 0.1;
    singularityCore.scale.setScalar(1 + Math.sin(time * 1.8) * 0.12);

    // Particles - Movimento orgânico + reação ao mouse
    const positionsAttr = cognitiveParticles.geometry.attributes.position;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positionsAttr.array[i] += velocities[i];
        positionsAttr.array[i + 1] += velocities[i + 1];
        positionsAttr.array[i + 2] += velocities[i + 2];

        // Suave atração ao mouse
        positionsAttr.array[i] += mouseX * 0.008;
        positionsAttr.array[i + 1] += mouseY * 0.008;

        // Limite de espaço
        if (Math.abs(positionsAttr.array[i]) > 12) velocities[i] *= -0.8;
        if (Math.abs(positionsAttr.array[i + 1]) > 12) velocities[i + 1] *= -0.8;
        if (Math.abs(positionsAttr.array[i + 2]) > 12) velocities[i + 2] *= -0.8;
    }
    positionsAttr.needsUpdate = true;

    // Rotação suave do campo
    cognitiveParticles.rotation.y = time * 0.035;
    cognitiveParticles.rotation.x = time * 0.015 + mouseY * 0.4;

    // Pulsação global
    cognitiveParticles.scale.setScalar(1 + Math.sin(time * 2.5) * 0.04);

    renderer.render(scene, camera);
}
animateThree();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ====================== PERFIL PSICOLÓGICO ======================
updateProfile(); // inicia o tracking

// ====================== COPY DINÂMICO ======================
function updateDynamicCopy() {
    const el = document.querySelector('.hero-highlight');
    if (!el) return;
    const type = getUserType();
    let message = "Poucos percebem o que realmente importa agora.";
    if (type === "decisor") message = "Você já sabe o que precisa fazer.";
    else if (type === "analitico") message = "Tudo já foi analisado. Falta apenas sua decisão.";
    else if (type === "morno") message = "Você está perto de ver o que poucos enxergam.";

    el.style.transition = "opacity 0.9s";
    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = message;
        el.style.opacity = "1";
    }, 700);
}
setInterval(updateDynamicCopy, 4500);

// ====================== WHATSAPP INTELIGENTE ======================
function handleCTA(e) {
    e.preventDefault();
    const type = getUserType();
    let msg = "Quero entender melhor o que você faz.";
    if (type === "decisor") msg = "Quero começar agora. Me mostra o caminho direto.";
    else if (type === "analitico") msg = "Analisei seu método. Quero entender como aplicar no meu caso.";
    const url = `https://wa.me/5512981216006?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', handleCTA);
});

// ====================== INIT ======================
console.log("%c🧠 Cognitive System v0.6 - Three.js Avançado Integrado", "color:#00f0ff; font-size:12px");
