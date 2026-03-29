// ====================== JANNUNZELLI COGNITIVE SYSTEM v0.9 - NANO-PARTÍCULAS AVANÇADAS ======================

// Importações
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
window.addEventListener("load", runLoader);

// ====================== CURSOR ======================
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
if (dot && ring) {
    document.addEventListener("mousemove", (e) => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ====================== THREE.JS - NANO-PARTÍCULAS AVANÇADAS ======================
const canvas = document.getElementById("neural-canvas");
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 10;

    // Nano-partículas
    const particleCount = window.innerWidth < 768 ? 1200 : 3200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 22;
        positions[i + 1] = (Math.random() - 0.5) * 22;
        positions[i + 2] = (Math.random() - 0.5) * 18;

        colors[i] = 0.3 + Math.random() * 0.7;
        colors[i + 1] = 0.8 + Math.random() * 0.2;
        colors[i + 2] = 1.0;

        sizes[i / 3] = Math.random() * 0.085 + 0.035;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.07,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthTest: false
    });

    const cognitiveParticles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(cognitiveParticles);

    // Mouse + Gyro/Touch interaction
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Suporte a movimento do smartphone
    if ('DeviceOrientationEvent' in window) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta && e.gamma) {
                mouseX = e.gamma / 45;
                mouseY = e.beta / 45;
            }
        });
    }

    function animateThree() {
        requestAnimationFrame(animateThree);
        const time = Date.now() * 0.001;

        // Movimento suave das partículas
        const positionsAttr = cognitiveParticles.geometry.attributes.position;
        for (let i = 0; i < particleCount * 3; i += 3) {
            positionsAttr.array[i + 1] += Math.sin(time + i) * 0.003; // movimento ondulado
        }
        positionsAttr.needsUpdate = true;

        // Rotação + reação ao mouse
        cognitiveParticles.rotation.y = time * 0.025 + mouseX * 0.4;
        cognitiveParticles.rotation.x = time * 0.015 + mouseY * 0.35;

        // Pulsação suave
        cognitiveParticles.scale.setScalar(1 + Math.sin(time * 2.5) * 0.05);

        renderer.render(scene, camera);
    }
    animateThree();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ====================== ANIMAÇÕES 2D ======================
// Scan Line
function createScanLine() {
    const scan = document.createElement('div');
    scan.className = 'scan-line';
    scan.style.top = `${Math.random() * 80 + 10}vh`;
    document.body.appendChild(scan);
    setTimeout(() => scan.remove(), 1800);
}
setInterval(() => { if (Math.random() > 0.35) createScanLine(); }, 2200);

// ====================== PERFIL PSICOLÓGICO + COPY DINÂMICO ======================
updateProfile();

function updateDynamicCopy() {
    const el = document.querySelector('.hero-highlight');
    if (!el) return;
    const type = getUserType();
    const messages = {
        "decisor": "Você já sabe o que precisa fazer.",
        "analitico": "Tudo já foi analisado. Falta apenas sua decisão.",
        "morno": "Você está perto de ver o que poucos enxergam.",
        "frio": "Poucos percebem o que realmente importa agora."
    };
    el.style.transition = "opacity 0.9s";
    el.style.opacity = "0";
    setTimeout(() => {
        el.textContent = messages[type] || messages["frio"];
        el.style.opacity = "1";
    }, 700);
}
setInterval(updateDynamicCopy, 5500);

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
console.log("%c🧠 Cognitive System v0.9 - Nano-partículas aprimoradas", "color:#00f0ff; font-size:12px");
revealOnScroll();