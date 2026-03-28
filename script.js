// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.6 ======================

// 1. IMPORTAÇÕES E TRATAMENTO DE ERROS DE MÓDULO
import { updateProfile, getUserType } from './js/profile-engine.js';

// Tenta carregar o orquestrador de IA de forma assíncrona para não travar o site se o arquivo faltar
async function initAI() {
    try {
        const { processAI } = await import('./js/ai-orchestrator.js');
        processAI("system_init", (res) => console.log("AI Status:", res));
    } catch (e) {
        console.warn("Módulo de IA não encontrado ou erro de nome (ai-hf.js). O sistema continuará em modo offline.");
    }
}
initAI();

// ====================== LOADER (À PROVA DE FALHAS) ======================
const loaderText = document.getElementById("loader-text");
const sequence = [
    "INITIALIZING SYSTEM...",
    "Mapping Cognitive Layers...",
    "Synchronizing Intelligence...",
    "Access Protocol Ready"
];
let step = 0;

function runLoader() {
    if (loaderText && step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 600);
    } else {
        const loader = document.getElementById("loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 800);
        }
    }
}
window.addEventListener("DOMContentLoaded", runLoader);

// ====================== CURSOR E PERFORMANCE MOBILE ======================
const isMobile = window.innerWidth < 768;
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

if (!isMobile && dot && ring) {
    document.addEventListener("mousemove", (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ====================== THREE.JS - PARTICLES (OTIMIZADO) ======================
const canvas = document.getElementById("neural-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 9;

// Configuração dinâmica de partículas baseado no dispositivo
const particleCount = isMobile ? 1200 : 3200;

const coreGeometry = new THREE.SphereGeometry(1.3, 32, 32);
const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending
});
const singularityCore = new THREE.Mesh(coreGeometry, coreMaterial);
scene.add(singularityCore);

const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
    velocities[i] = (Math.random() - 0.5) * 0.01;
    velocities[i + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i + 2] = (Math.random() - 0.5) * 0.01;
}

const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const particleMaterial = new THREE.PointsMaterial({
    size: isMobile ? 0.08 : 0.06,
    color: 0x00c4ff,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    depthTest: false
});

const cognitiveParticles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(cognitiveParticles);

// ====================== ANIMAÇÃO E INTERAÇÃO ======================
let mouseX = 0, mouseY = 0;
if (!isMobile) {
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });
}

function animateThree() {
    requestAnimationFrame(animateThree);
    const time = Date.now() * 0.001;

    singularityCore.rotation.y = time * 0.1;
    singularityCore.scale.setScalar(1 + Math.sin(time * 1.5) * 0.1);

    const positionsAttr = cognitiveParticles.geometry.attributes.position;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positionsAttr.array[i] += velocities[i] + (mouseX * 0.005);
        positionsAttr.array[i + 1] += velocities[i + 1] + (mouseY * 0.005);

        // Mantém as partículas dentro do campo visual
        if (Math.abs(positionsAttr.array[i]) > 15) positionsAttr.array[i] *= -0.9;
        if (Math.abs(positionsAttr.array[i + 1]) > 15) positionsAttr.array[i + 1] *= -0.9;
    }
    positionsAttr.needsUpdate = true;
    cognitiveParticles.rotation.y = time * 0.02;

    renderer.render(scene, camera);
}
animateThree();

// Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ====================== LÓGICA DE NEGÓCIO (PERFIL) ======================
updateProfile();

function updateDynamicCopy() {
    const el = document.querySelector('.hero-highlight');
    if (!el) return;
    const type = getUserType();
    const messages = {
        "decisor": "Você busca eficiência e clareza imediata.",
        "analitico": "A estrutura de dados confirma a necessidade de mudança.",
        "morno": "A percepção estratégica é o primeiro passo para o controle.",
        "frio": "Sistemas complexos exigem arquiteturas superiores."
    };
    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = messages[type] || messages["frio"];
        el.style.opacity = "1";
    }, 500);
}
setInterval(updateDynamicCopy, 5000);

// CTAs
document.querySelectorAll('.cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = encodeURIComponent(`Iniciando protocolo estratégico. Perfil: ${getUserType()}`);
        window.open(`https://wa.me/5512981216006?text=${msg}`, '_blank');
    });
});

console.log("%c🧠 Jannuzzelli System Online", "color:#00f0ff; font-weight:bold;");