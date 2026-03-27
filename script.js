// ====================== OTIMIZAÇÕES GLOBAIS ======================
let profile = { time: 0, scrollDepth: 0, interactions: 0, intensity: 0 };
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// ====================== LOADER ======================
const loaderText = document.getElementById("loader-text");
const sequence = ["INITIALIZING SYSTEM...", "Mapping Cognitive Layers...", "Synchronizing Intelligence...", "Access Protocol Ready"];
let step = 0;

function runLoader() {
    if (step < sequence.length) {
        loaderText.textContent = sequence[step++];
        setTimeout(runLoader, 750);
    } else {
        setTimeout(() => {
            document.getElementById("loader").style.opacity = "0";
            setTimeout(() => { document.getElementById("loader").style.display = "none"; }, 800);
        }, 600);
    }
}
window.addEventListener("load", runLoader);

// ====================== CURSOR (apenas desktop) ======================
if (!isMobile) {
    const dot = document.querySelector(".cursor-dot");
    const ring = document.querySelector(".cursor-ring");
    document.addEventListener("mousemove", e => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
}

// ====================== REVEAL + PARALLAX ======================
const reveals = document.querySelectorAll(".section, .cta-final");
function revealOnScroll() {
    const trigger = window.innerHeight * 0.8;
    reveals.forEach(el => {
        if (el.getBoundingClientRect().top < trigger) el.classList.add("active");
    });
}
window.addEventListener("scroll", revealOnScroll);

// Parallax backgrounds
window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    document.querySelector(".bg-monogram").style.transform = `translateY(${scroll * 0.15}px)`;
    document.querySelector(".bg-energy").style.transform = `translateY(${scroll * 0.08}px)`;
});

// ====================== MAGNETIC CTA ======================
document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("mousemove", e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        btn.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
    });
    btn.addEventListener("mouseleave", () => btn.style.transform = "translate(0,0)");
});

// ====================== NEURAL CANVAS (Three.js otimizado) ======================
const canvas = document.getElementById("neural-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 6;

const particleCount = isMobile ? 600 : 1400; // otimizado para mobile
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 12;

const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    size: 0.035,
    color: 0x00c4ff,
    transparent: true,
    opacity: 0.75
});

const particles = new THREE.Points(geometry, material);
scene.add(particles);

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    particles.rotation.y += 0.0006;
    particles.rotation.x += 0.0003;
    renderer.render(scene, camera);
}
animateCanvas();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ====================== ENGAGEMENT + INTENSIDADE ======================
let engagementScore = 0;

window.addEventListener("scroll", () => {
    const depth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    profile.scrollDepth = depth;
    if (depth > 0.3) engagementScore += 1;
    calculateIntensity();
});

setInterval(() => { profile.time += 1; calculateIntensity(); }, 1200);
document.addEventListener("mousemove", () => { profile.interactions += 0.08; });

function calculateIntensity() {
    profile.intensity = profile.time * 0.4 + profile.scrollDepth * 12 + profile.interactions;
    if (profile.intensity > 45) document.body.classList.add("high-intent");
}

// ====================== MENSAGENS DO SISTEMA ======================
const messages = ["System observing...", "Pattern detected...", "Cognitive alignment increasing..."];
function spawnMessage() {
    if (profile.intensity < 25) return;
    const msg = document.createElement("div");
    msg.className = "system-msg";
    msg.textContent = messages[Math.floor(Math.random() * messages.length)];
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4200);
}
setInterval(spawnMessage, 6500);

console.log("%cCognitive System initialized", "color:#00c4ff; font-size:10px;");