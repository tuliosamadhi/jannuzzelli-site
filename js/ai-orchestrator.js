// ====================== JANNUNZELLI AI ORCHESTRATOR v0.8 ======================
import { fakeAIResponse } from './ai-core.js';

export async function processAI(input, onUpdate) {
    // 1. Log de Auditoria no Console (Estilo Matrix)
    console.log(`%c[SYS-AUDIT] Input: "${input}"`, "color: #00f0ff");

    // 2. Simula o tempo de processamento para dar "peso" à resposta
    await new Promise(res => setTimeout(res, 800));

    // 3. Obtém a resposta da nossa base local
    const response = fakeAIResponse(input);

    // 4. Devolve para a interface
    onUpdate(response);
}