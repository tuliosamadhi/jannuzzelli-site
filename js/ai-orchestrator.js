// ====================== JANNUNZELLI AI ORCHESTRATOR v0.8 ======================
// Foco: Respostas instantâneas client-side para evitar erros CORS e Latência

import { fakeAIResponse } from './ai-core.js';

export async function processAI(input, onUpdate) {
    // 1. Log de Auditoria do Sistema
    console.log(`[SYS-AUDIT] Processing Cognitive Input: "${input}"`);

    // 2. Resposta Instantânea da IA Simulada (Roda Localmente)
    // Isso garante que NUNCA tenhamos erro CORS ou trava visual na UI.
    const instantResponse = fakeAIResponse(input);

    // Pequeno delay para simular o "pensamento" (UX melhor)
    await new Promise(res => setTimeout(res, 500));

    // Entrega a resposta instantânea
    onUpdate(instantResponse);

    // 3. Estratégia de Fallback Seguro (Em vez de chamar HF diretamente)
    // Se o input for muito complexo e o ai-core.js não cobrir:
    if (instantResponse === "Processando padrões... identificando variáveis ocultas...") {
        console.warn("[SYS-WARN] Deep analysis requires remote connection. Fallback activated.");

        // Simula uma resposta de erro elegante que parece parte do sistema
        setTimeout(() => {
            onUpdate("ERRO_CONEXAO_NEURAL: Variável cognitiva de alta complexidade detectada. Análise profunda requer acesso estratégico avançado (Metodologia ARAM). Contate o Arquiteto.");
        }, 2000);
    }
}