const canvas = document.createElement("canvas");
canvas.id = "neural-bg";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = "-1";
canvas.style.opacity = "0.6";

resize();
window.addEventListener("resize", resize);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// MAIS NÓS + MAIS VIDA
const nodes = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8
}));

let mouse = { x: null, y: null };

window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function draw() {
    ctx.fillStyle = "rgba(5,5,5,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(n => {

        // leve atração ao mouse (efeito IA viva)
        if (mouse.x) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            n.x += dx * 0.0005;
            n.y += dy * 0.0005;
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,215,0,0.9)";
        ctx.fill();
    });

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i; j < nodes.length; j++) {

            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 160) {

                const intensity = 1 - dist / 160;

                ctx.strokeStyle = `rgba(255,215,0,${intensity})`;
                ctx.lineWidth = 0.5;

                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();