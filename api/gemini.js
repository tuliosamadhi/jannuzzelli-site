export async function askEntity(msg) {
    try {
        const res = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyB12Km76wnrnvxZ3XEoFVx6jpc-v7ITixc", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: msg }] }]
            })
        });

        const data = await res.json();
        return data?.candidates?.[0]?.content?.parts?.[0]?.text;

    } catch {
        return null;
    }
}