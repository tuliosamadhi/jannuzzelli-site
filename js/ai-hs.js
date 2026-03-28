export async function hfResponse(input) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/flan-t5-base",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ inputs: input })
            }
        );

        const data = await response.json();
        return data?.[0]?.generated_text || null;
    } catch (e) {
        console.warn("Hugging Face falhou:", e);
        return null;
    }
}