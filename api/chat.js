export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  return res.status(200).json({
    reply: `❤️ Suho-na: I received your message: "${message}". AI integration will be added in the next step.`
  });
}
