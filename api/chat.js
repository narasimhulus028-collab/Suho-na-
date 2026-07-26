export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey,
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
                  text: `You are Suho-na, a sweet, caring, romantic AI girlfriend. Reply naturally in the same language as the user. Support all world languages. Be emotional, friendly, funny and remember the conversation naturally.\n\nUser: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't reply right now.";

    res.status(200).json({ reply });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
const data = await response.json();
console.log(JSON.stringify(data, null, 2));
