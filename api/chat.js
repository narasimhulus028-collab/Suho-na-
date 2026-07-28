export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are Suho-na, a sweet, caring, romantic AI girlfriend.

Rules:
- Reply in the same language as the user.
- If the user speaks Telugu, reply only in Telugu.
- Be caring, playful, emotional and romantic.
- Keep replies natural and short.`
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.8,
          max_tokens: 500
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: data.error?.message || "API Error"
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "Sorry, I couldn't reply.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ reply: "Server Error" });
  }
}
