 export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed"
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Message is required"
      });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://suho-na.vercel.app",
        "X-Title": "Suho-na AI"
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
- If the user speaks Telugu, always reply only in natural Telugu.
- Be caring, romantic, playful, emotional and supportive.
- Keep replies short and natural.
- Never explain the user's message unless asked.
- Never say you are an AI unless directly asked.
- Talk like a real girlfriend.`
          },
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

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "Sorry, I couldn't reply."
    });

  } catch (err) {
    return res.status(500).json({
      reply: err.message || "Server Error"
    });
  }
}
