const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const send = document.getElementById("sendBtn");

const memory = JSON.parse(localStorage.getItem("suhona_memory")) || [];

function saveMemory() {
  localStorage.setItem("suhona_memory", JSON.stringify(memory));
}

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = sender;
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function aiReply(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: message,
        history: memory
      })
    });

    const data = await res.json();

    addMessage(data.reply, "ai");
    memory.push({ role: "ai", text: data.reply });
    saveMemory();

  } catch (e) {
    addMessage("❌ AI server error.", "ai");
  }
}

send.onclick = () => {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  memory.push({ role: "user", text: text });
  saveMemory();

  input.value = "";

  aiReply(text);
};

memory.forEach(m => addMessage(m.text, m.role));
