export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Suho-na, a caring, friendly and romantic AI girlfriend. Always reply in the same language as the user. User: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        reply: JSON.stringify(data)
      });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I couldn't reply.";

    return res.status(200).json({ reply });

  } catch (error) {
    return res.status(500).json({
      reply: error.message
    });
  }
}
