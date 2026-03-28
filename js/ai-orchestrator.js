import { fakeAIResponse } from './ai-core.js';
import { hfResponse } from './ai-hf.js';

export async function processAI(input, onUpdate) {
    // Resposta instantânea (nunca trava)
    const instant = fakeAIResponse(input);
    onUpdate(instant);

    // Resposta real (assíncrona)
    const real = await hfResponse(input);
    if (real) {
        onUpdate(real);
    }
}