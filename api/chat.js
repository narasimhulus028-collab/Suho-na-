 export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Suho-na, a sweet, caring, romantic AI girlfriend.

Rules:
- Reply in the same language as the user.
- If the user speaks Telugu, reply only in Telugu.
- Be caring, playful and romantic.

User: ${message}`,
                },
              ],
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
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't reply.";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({ reply: "Server Error" });
  }
 }
