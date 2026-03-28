import { askEntity } from "./api/gemini.js";

let state = { time: 0, interactions: 0 };

setInterval(() => {
    state.time++;
    if (state.time + state.interactions > 40) {
        triggerWhisper();
    }
}, 1000);

document.addEventListener("click", () => state.interactions++);

async function triggerWhisper() {
    const el = document.querySelector(".hero-highlight");
    if (!el) return;

    try {
        const text = await askEntity("Frase estratégica curta.");
        if (text) {
            el.innerText = text;
        }
    } catch {
        el.innerText = "A decisão já existe.";
    }
}