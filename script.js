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

function aiReply(message) {
  let reply = "❤️ Nenu Suho-na. Ninnu vini santosham ga undi.";

  const m = message.toLowerCase();

  if (m.includes("hi") || m.includes("hello")) {
    reply = "🥰 Hi! Ela unnava?";
  } else if (m.includes("love")) {
    reply = "❤️ Nenu eppudu neetho matladadaniki ready.";
  } else if (m.includes("name")) {
    reply = "🌹 Na peru Suho-na.";
  } else if (m.includes("telugu")) {
    reply = "😊 Nenu Telugu lo kuda matladagalanu.";
  }

  setTimeout(() => {
    addMessage(reply, "ai");
    memory.push({ role: "ai", text: reply });
    saveMemory();
  }, 800);
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
