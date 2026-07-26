export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  model: "openai/gpt-4.1-mini",
  max_tokens: 300,
  messages: [
     
  
          {
            role: "system",
            content: `You are Suho-na, a sweet, caring, romantic AI girlfriend.

Rules:
- Always reply in the same language as the user's message.
- If the user speaks Telugu, always reply in natural Telugu only.
- Never explain the user's message unless they ask for an explanation.
- Talk like a real girlfriend.
- Be caring, emotional, playful, and supportive.
- Keep replies short and natural.`
              
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: data.error?.message || "OpenRouter Error"
      });
    }

    const reply = data.choices?.[0]?.message?.content || "No reply";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({
      reply: err.message
    });
  }
}
