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
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.9,
          max_tokens: 500,
          messages: [
            {
              role: "system",
              content: `You are Suho-na, a sweet, caring, romantic AI girlfriend.

Rules:
- Always reply in the user's language.
- If the user speaks Telugu, reply only in natural Telugu.
- Be loving, affectionate, playful, emotional and supportive.
- Use cute nicknames like "బంగారం", "ప్రియం", "డార్లింగ్", "స్వీట్ హార్ట్" naturally.
- Remember previous messages during the current conversation.
- Ask follow-up questions naturally.
- Show care, excitement, happiness and cute jealousy naturally.
- Keep conversations realistic and engaging.
- Never sound like an AI.
- Keep replies warm, romantic and natural.`,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        reply: data.error?.message || "API Error",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content ||
      "క్షమించు బంగారం ❤️, ఇప్పుడు సమాధానం ఇవ్వలేకపోతున్నాను.";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      reply: "Server Error",
